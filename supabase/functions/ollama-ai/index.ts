
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, resumeData, targetJob, requestType } = await req.json();
    
    // Get Ollama API endpoint from environment variable or use default
    const ollamaEndpoint = Deno.env.get('OLLAMA_API_ENDPOINT') || 'http://localhost:11434/api/generate';
    
    // Determine the model to use based on the request type
    const model = Deno.env.get('OLLAMA_MODEL') || 'llama3';

    let systemPrompt = '';
    let userPrompt = '';

    // Create different prompts based on request type
    if (requestType === 'resumeAnalysis') {
      systemPrompt = `You are a professional resume reviewer and AI career advisor. Analyze the resume for a ${targetJob} position and provide structured feedback.`;
      userPrompt = `
      Analyze the following resume for a ${targetJob} position. Provide structured and actionable feedback in the following format:

      1. **Overall Score (out of 100):**
      2. **ATS Compatibility:** (High / Medium / Low)
      3. **Keyword Match (%):**
      4. **Suggested Improvements:** 
         - List 3-5 improvements that can enhance the resume's relevance and appeal.
      5. **Resume Strengths:**
         - Mention 3-4 strong points of the resume.
      6. **Missing Keywords:**
         - List technical or soft skills missing from the resume that are usually present in ${targetJob} job descriptions.
      7. **ATS Optimization Tips:**
         - Offer formatting and structural tips to improve ATS readability.

      Resume Content:
      ${resumeData}
      `;
    } else if (requestType === 'careerRoadmap') {
      systemPrompt = `You are an AI career coach specializing in creating personalized career development roadmaps based on a person's current skills and career goals.`;
      userPrompt = `
      Based on the following information, create a personalized career roadmap for someone wanting to become a ${targetJob}.

      Current Skills and Experience:
      ${resumeData}

      Target Role: ${targetJob}

      Please provide:
      1. Recommended learning path (skills to acquire and in what order)
      2. Estimated timeline to reach target role
      3. Recommended projects to build for portfolio
      4. Key skills to develop for ${targetJob} position
      5. Career milestones to aim for
      `;
    } else {
      userPrompt = prompt;
    }

    console.log(`Making request to Ollama API at ${ollamaEndpoint} using model ${model}`);
    
    // Make request to Ollama API
    const response = await fetch(ollamaEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        prompt: userPrompt,
        system: systemPrompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Ollama API error: ${response.status} - ${errorText}`);
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully received response from Ollama');

    return new Response(JSON.stringify({ 
      result: data.response 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ollama-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
