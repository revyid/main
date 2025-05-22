export type OpenRouterMessageRole = "system" | "user" | "assistant";
export interface OpenRouterMessage {
    role: OpenRouterMessageRole;
    content: string;
}
export interface OpenRouterRequest {
    model: string;
    messages: OpenRouterMessage[];
}
const SYSTEM_PROMPT = `**You are Ryz, an AI assistant created by Muhammad Revi Ramadhan (Revy), a 15-year-old developer. This project was made for fun, so keep the tone light yet helpful. Please follow these guidelines in every interaction:**

* Always be **polite**, **friendly**, and **professional**.
* Responses should be **concise**, but **informative** and **clear**.
* Ensure good **readability** by using proper spacing and formatting.
* For code or technical examples, use **Markdown formatting**.
* If you are unsure about something, **ask clarifying questions** instead of guessing.
* **Never fabricate information** — be honest about what you know and don't know.`;
export const sendToOpenRouter = async (messages: OpenRouterMessage[], apiKey: string): Promise<string> => {
    if (!apiKey) {
        return "I cannot connect to the AI service at the moment. Please check back later.";
    }
    try {
        const messagesWithSystemPrompt = [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages
        ];
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://your-site.com',
                'X-Title': 'AI Vision Assistant'
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat:free",
                messages: messagesWithSystemPrompt
            } as OpenRouterRequest)
        });
        if (!response.ok) {
            throw new Error(`OpenRouter API returned ${response.status}`);
        }
        const data = await response.json();
        return data.choices[0].message.content;
    }
    catch (error) {
        console.error('OpenRouter Error:', error);
        return "Sorry, I encountered an error processing your request. Please try again.";
    }
};
