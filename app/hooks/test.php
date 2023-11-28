public function account_filter_by_ajax(){
        if (isset($_POST['external_company']) && ($_POST['external_company'] !=="")) {
         
            $internal_company = $_POST['internal_company'];
            $external_company = $_POST['external_company'];

            $prompt_1 ="You are a sales planning executive with 15 years of experience; provide Corporate-level challenges 
            that {prompt} is facing in activating their goals, priorities, and initiatives. You know the intricacies of 
            these fields. I want you to reason step-by-step to Identify and itemize the most critical challenges faced 
            by {prompt} showing their value gaps, summarize and itemize them concisely in 100 words. " ;
            $prompt_2 = "
            IDENTIFY IndustryInsights in terms of trends, benchmarks, best practices, and competitive analysis that 
            relate to {prompt} issues/challenges. Give the Industry standards to which {prompt} belongs with respect 
            to its challenges in another  100 words. ";
            $prompt_3 = "Based on the CHALLENGES, and IndustryInsights gotten. what are the 
            capabilities that {prompt2} has that can improve {prompt} ability to tackle its challenges in other to achieve 
            its goals in another 100 words? ITEMIZE the answer. Furthermore, what will be the IMPACT of {prompt2} capabilities when utilized by {prompt} on {prompt} ability to tackle its challenges in other to achieve 
            its goals in another 100 words? ITEMIZE the answer. " ;
          

            $prompt_4 = "Based on the Challenges, Insights, Capabilities. What will be the IMPACT of {prompt2} capabilities when utilized by {prompt} on {prompt} ability to tackle its challenges in other to achieve its goals in 100 words. ITEMIZE the answer in HTML format list items and all open list must be closed";
           
            $prompt_5 = "Lastly, A 'Value Hypothesis' captures the essence of the value a company, {prompt2}(a vendor) can provide to another company, {prompt}(client). Think like a value 
            engineer, then translate your understanding of the market trends, CHALLENGES, INDUSTRY INSIGHTS, CAPABILITIES, IMPACT, 
            and {prompt} goals, priorities, and business issues into an exciting new perspective leading to value. 
            Considering the previous elements and other sources mentioned, a value hypothesis summarizes a perspective 
            for where value might be realized for {prompt} by engaging with {prompt2}. Extensively give a value hypothesis.
            ";

            $question_1 = str_replace("{prompt}", $external_company, $prompt_1);
            $question_2 = str_replace("{prompt}", $external_company, $prompt_2);
            $question_3 = str_replace("{prompt}", $external_company, $prompt_3);
             $question_3 = str_replace("{prompt2}", $internal_company, $question_3);

             $question_4 = str_replace("{prompt}", $external_company, $prompt_4);
             $question_4 = str_replace("{prompt2}", $internal_company, $question_4);
 

             $question_5 = str_replace("{prompt}", $external_company, $prompt_5);
             $question_5 = str_replace("{prompt2}", $internal_company, $question_5);

            $api_key = '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'; // Replace with your actual API key
             

             $first_response = AccountPlanner::chatgpt_send_message($api_key, $question_1,"");
            $second_response = AccountPlanner::chatgpt_send_message($api_key, $question_2,"");
             $third_response = AccountPlanner::chatgpt_send_message($api_key, $question_3,"");
            $fourth_response = AccountPlanner::chatgpt_send_message($api_key, $question_4,"");
            $fifth_response = AccountPlanner::chatgpt_send_message($api_key, $question_5,"");
            
           $result =  [
                "Question1" => $first_response,
                "Question2" => $second_response,
                "Question3" => $third_response,
                "Question4" => $fourth_response,
                "Question5" => $fifth_response

            ] ;
            wp_send_json( $result );
        }
       
    }




    public function chatgpt_send_message($api_key, $question, $last_message) {
        $open_ai_key = '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';

        $open_ai = new OpenAi($open_ai_key);
        
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
        
        
       
        // decode response
        $d = json_decode($chat);
        // Get Content
        return $d->choices[0]->message->content;
       
    }
