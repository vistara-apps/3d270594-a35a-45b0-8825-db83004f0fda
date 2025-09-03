import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Generate Frame JSON structure using AI
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are an expert at creating Farcaster Frame JSON configurations. Generate a valid Frame Hub JSON based on the user's prompt. 

          The JSON should follow this structure:
          {
            "version": "next",
            "image": "https://example.com/image.jpg",
            "buttons": [
              { "label": "Button 1", "action": "post" },
              { "label": "Button 2", "action": "post" }
            ],
            "input": { "text": "Enter text here" },
            "post_url": "https://example.com/api/frame"
          }

          Make sure to:
          1. Create appropriate buttons based on the prompt
          2. Include relevant metadata
          3. Make it interactive and engaging
          4. Follow Farcaster Frame standards

          Respond with ONLY the JSON, no explanation.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const generatedJson = completion.choices[0]?.message?.content;
    
    if (!generatedJson) {
      throw new Error('Failed to generate frame content');
    }

    try {
      const frameData = JSON.parse(generatedJson);
      
      // Add metadata
      const enrichedFrameData = {
        ...frameData,
        timestamp: new Date().toISOString(),
        prompt: prompt,
        id: `frame_${Date.now()}`,
      };

      return NextResponse.json({
        success: true,
        frameData: enrichedFrameData,
        imageUrl: frameData.image,
        buttons: frameData.buttons || [],
        title: `Generated Frame`,
        type: 'interactive',
      });
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      
      // Fallback frame structure
      const fallbackFrame = {
        version: 'next',
        image: 'https://via.placeholder.com/600x400/6366f1/ffffff?text=Generated+Frame',
        buttons: [
          { label: 'Action', action: 'post' }
        ],
        post_url: 'https://example.com/api/frame',
        timestamp: new Date().toISOString(),
        prompt: prompt,
        id: `frame_${Date.now()}`,
      };

      return NextResponse.json({
        success: true,
        frameData: fallbackFrame,
        imageUrl: fallbackFrame.image,
        buttons: fallbackFrame.buttons,
        title: 'Generated Frame',
        type: 'interactive',
      });
    }
  } catch (error) {
    console.error('Error generating frame:', error);
    return NextResponse.json(
      { error: 'Failed to generate frame' },
      { status: 500 }
    );
  }
}
