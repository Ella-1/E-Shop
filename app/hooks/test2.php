<?php

namespace src\Classes;

use Orhanerday\OpenAi\OpenAi;

class AccountPlanner {


    public function __construct(){

         // Filter ajax add action Callback
         add_action('wp_ajax_account_filter_by_ajax', array($this,'account_filter_by_ajax'));//Filter new : ajax
         add_action('wp_ajax_nopriv_account_filter_by_ajax', array($this,'account_filter_by_ajax'));//Filter new : ajax

        add_action('wp_enqueue_scripts', [$this, 'account_script_enqueuer']);

    }

    public function account_script_enqueuer()
    { 

        // Register theme stylesheet.
		$theme_version = "1.0.0";

		$version_string = is_string( $theme_version ) ? $theme_version : false;
		wp_register_style(
			'accountplanner-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);
        // Enqueue theme stylesheet.
		wp_enqueue_style( 'accountplanner-style' ); 

        wp_enqueue_script( 'main-script', get_template_directory_uri() . '/main.js', array('jquery'), time(), true );

        wp_localize_script('main-script', 'account_data',
            array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                // 'paged' => $this->paged,
                )
        );
        wp_enqueue_script('main-script');
      
    }
	
// 	start

public function account_filter_by_ajax() {
    if (isset($_POST['external_company']) && ($_POST['external_company'] !== "")) {
        $internal_company = $_POST['internal_company'];
        $external_company = $_POST['external_company'];

        $prompts = [
            str_replace("{prompt}", $external_company, $prompt_1),
            str_replace("{prompt}", $external_company, $prompt_2),
            str_replace(["{prompt}", "{prompt2}"], [$external_company, $internal_company], $prompt_3),
            str_replace(["{prompt}", "{prompt2}"], [$external_company, $internal_company], $prompt_4),
            str_replace(["{prompt}", "{prompt2}"], [$external_company, $internal_company], $prompt_5),
        ];

        $api_key = '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'; // Replace with your actual API key

        $mh = curl_multi_init();
        $handles = [];

        foreach ($prompts as $index => $prompt) {
            $url = "https://api.openai.com/v1/chat/completions";
            $data = [
                'model' => 'gpt-3.5-turbo', // Add the model parameter
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a helpful assistant.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ]
            ];

            $handles[$index] = curl_init();
            curl_setopt_array($handles[$index], [
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json',
                    'Authorization: Bearer ' . $api_key,
                ],
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => json_encode($data),
            ]);

            curl_multi_add_handle($mh, $handles[$index]);
        }

        $active = null;
        do {
            curl_multi_exec($mh, $active);
        } while ($active);

        $responses = [];
        foreach ($handles as $index => $handle) {
            $responses["Question" . ($index + 1)] = curl_multi_getcontent($handle);
            curl_multi_remove_handle($mh, $handle);
        }

        curl_multi_close($mh);

        wp_send_json($responses);
    }
}

// stop

   



    // Function to send a message to the ChatGPT API
    // start
   public function chatgpt_send_message($api_key, $question, $last_message) {
        $open_ai_key = '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';

        $open_ai = new OpenAi($open_ai_key);

        // Retry settings
        $max_retries = 3;
        $retry_delay = 20; // in seconds

        for ($retry_count = 0; $retry_count < $max_retries; $retry_count++) {
            $chat = $open_ai->chat([
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
                'temperature' => 0.2,
                'max_tokens' => 300,
                'frequency_penalty' => 0,
                'presence_penalty' => 0,
            ]);

            // Decode response
            $d = json_decode($chat);

            // Check if there is no error
            if (!isset($d->error)) {
                return $d->choices[0]->message->content;
            }

            // Check for rate limit error
            if ($d->error->code === 'rate_limit_exceeded') {
                // Wait before retrying
                sleep($retry_delay);
            } else {
                // Other error, break out of the loop
                break;
            }
        }

        // Return an error message if max retries exceeded
        return "Error: Maximum retries exceeded.";
    }
  
// end
   /**
     * @return self
     */
    public static function get_instance() {
        static $instance = null;

        if (is_null($instance)) {
            $instance = new self();
        }

        return $instance;
    }

}

 

AccountPlanner::get_instance();