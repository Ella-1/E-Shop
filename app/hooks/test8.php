<?php

namespace src\Classes;

use Orhanerday\OpenAi\OpenAi;

class AccountPlanner {

    private $api_key;
    private $request_count;

    public function __construct() {
        // Set your OpenAI API key here
        $this->api_key = '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';

        // Initialize request count
        $this->request_count = 0;

        // Filter ajax add action Callback
        add_action('wp_ajax_account_filter_by_ajax', array($this, 'account_filter_by_ajax')); //Filter new : ajax
        add_action('wp_ajax_nopriv_account_filter_by_ajax', array($this, 'account_filter_by_ajax')); //Filter new : ajax

        add_action('wp_enqueue_scripts', [$this, 'account_script_enqueuer']);
    }

    public function account_script_enqueuer() {
        // Register theme stylesheet.
        $theme_version = "1.0.0";
        $version_string = is_string($theme_version) ? $theme_version : false;

        wp_register_style(
            'accountplanner-style',
            get_template_directory_uri() . '/style.css',
            array(),
            $version_string
        );

        // Enqueue theme stylesheet.
        wp_enqueue_style('accountplanner-style');

        wp_enqueue_script('main-script', get_template_directory_uri() . '/main.js', array('jquery'), time(), true);

        wp_localize_script(
            'main-script',
            'account_data',
            array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                // 'paged' => $this->paged,
            )
        );

        wp_enqueue_script('main-script');
    }

    public function account_filter_by_ajax()
    {
        if (isset($_POST['external_company']) && ($_POST['external_company'] !== "")) {

            $internal_company = $_POST['internal_company'];
            $external_company = $_POST['external_company'];

            // Check if the request count exceeds the limit
            if ($this->request_count >= 3) {
                wp_send_json(['error' => 'Rate limit exceeded.']);
                return;
            }

            // Increment the request count
            ++$this->request_count;

            try {
                // Initialize OpenAI
                $open_ai = new OpenAi($this->api_key);

                // Send messages to the chat model
                $question_1 = "You are a sales planning executive with 15 years of experience; provide Corporate-level challenges 
                    that {$external_company} is facing in activating their goals, priorities, and initiatives. You know the intricacies of 
                    these fields. I want you to reason step-by-step to Identify and itemize the most critical challenges faced 
                    by {$external_company} showing their value gaps, summarize and itemize them concisely in 100 words.";
                $question_2 = "IDENTIFY IndustryInsights in terms of trends, benchmarks, best practices, and competitive analysis that 
                    relate to {$external_company} issues/challenges. Give the Industry standards to which {$external_company} belongs with respect 
                    to its challenges in another 100 words.";
                $question_3 = "Based on the CHALLENGES, and IndustryInsights gotten, what are the 
                    capabilities that {$internal_company} has that can improve {$external_company} ability to tackle its challenges in order to achieve 
                    its goals in another 100 words? ITEMIZE the answer. Furthermore, what will be the IMPACT of {$internal_company} capabilities when utilized by {$external_company} on {$external_company} ability to tackle its challenges in order to achieve 
                    its goals in another 100 words? ITEMIZE the answer.";

                // Send messages to the chat model
                $first_response = $this->chatgpt_send_message($open_ai, $question_1);
                $second_response = $this->chatgpt_send_message($open_ai, $question_2);
                $third_response = $this->chatgpt_send_message($open_ai, $question_3);

                // Prepare the result
                $result = [
                    "Question1" => $first_response,
                    "Question2" => $second_response,
                    "Question3" => $third_response,
                ];

                wp_send_json($result);
            } catch (\Exception | \Orhanerday\OpenAi\Exceptions\OpenAiException | \GuzzleHttp\Exception\GuzzleException | \Throwable | \Error | \ErrorException | \RuntimeException | \InvalidArgumentException | \LogicException | \BadMethodCallException | \DomainException | \LengthException | \OutOfRangeException | \OutOfBoundsException | \OverflowException | \RangeException | \UnderflowException | \UnexpectedValueException $e) {
                // Log the error for debugging
                error_log('An error occurred while making the API request: ' . $e->getMessage());
                wp_send_json(['error' => 'An error occurred while making the API request.']);
            }
        }
    }



// function that sends message to chatgpt
public function chatgpt_send_message(OpenAi $open_ai, string $question)
{
    try {
        // Send message to the chat model
        $response = $open_ai->chat([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    "role" => "system",
                    "content" => "You are a helpful assistant."
                ],
                [
                    "role" => "user",
                    "content" => $question
                ],
            ],
            'temperature' => 1,
            'max_tokens' => 200,
            'frequency_penalty' => 50,
            'presence_penalty' => 0,
        ]);

        $decoded_response = json_decode($response, true);

        // Check for errors in the API response
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \RuntimeException('Error decoding JSON response.');
        }

        if (isset($decoded_response['error'])) {
            throw new \RuntimeException('OpenAI API error: ' . $decoded_response['error']['message']);
        }

        // Check if choices array is present
        if (!isset($decoded_response['choices']) || empty($decoded_response['choices'])) {
            throw new \RuntimeException('Invalid response format: Missing or empty choices array.');
        }

        // Extract the content of the last message in the choices (it contains the model's reply)
        $lastMessage = end($decoded_response['choices']);
        return $lastMessage['message']['content'];
    } catch (\Exception $e) {
        // Log or print the error message and stack trace
        error_log('Error in chatgpt_send_message: ' . $e->getMessage() . ' Trace: ' . $e->getTraceAsString());

        return '';
    }
}




    /**
     * @return self
     */
    public static function get_instance()
    {
        static $instance = null;

        if (is_null($instance)) {
            $instance = new self();
        }

        return $instance;
    }
}

AccountPlanner::get_instance();

