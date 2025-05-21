import {OpenAI} from "openai";
import {config} from "../../config";

interface FieldsInput {
    title: string;
    keywords: string;
    description: string;
}

interface FieldsInclude {
    title: boolean;
    keywords: boolean;
    description: boolean;
}

const openai = new OpenAI({ apiKey: config.openai.apiKey });

export class OpenaiAgent {
    createPrompt = (pageUrl: string, pageContent: string, fields: FieldsInput, include: FieldsInclude) => {
        const safeContent = pageContent.replace(/<[^>]*>/g, '').slice(0, 5000);

        return `You are an expert SEO assistant. A web page was fetched from the following URL: ${pageUrl}
                
                Below is its HTML content:
                ---
                ${safeContent} <!-- Truncate to avoid token overflow -->
                ---
                
                Existing metadata:
                - Title: "${fields.title}"
                - Keywords: "${fields.keywords}"
                - Description: "${fields.description}"
                
                Instructions:
                Please suggest improved ${[
             include.title ? 'title' : '',
             include.keywords ? 'keywords' : '',
             include.description ? 'description' : '',
         ]
             .filter(Boolean)
             .join(', ')} based on the page content and existing metadata.
                
                Respond in strict JSON:
                {
                  "title": "Improved title",
                  "keywords": ["list", "of", "keywords"],
                  "description": "Improved description"
                }`;
    }
    getAugmentedPageData = async (prompt: string, include: FieldsInclude) => {
        try {
            const completion = await openai.chat.completions.create({
                model: config.openai.model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
            });

            const raw = completion.choices[0].message.content || '{}';
            const suggestions = this.extractSuggestion(raw);

            if (!suggestions) {
                return ''; // Or better: return null or throw
            }

            // Step 4: Filter by include flags
            const result = {
                ...(include.title && { title: suggestions.title }),
                ...(include.keywords && { keywords: suggestions.keywords.join(',') }),
                ...(include.description && { description: suggestions.description }),
            };

            return result;
        } catch (err) {
            console.error('OpenAI error:', err);
            return ''
        }
    }

    private extractSuggestion(raw: string): FieldsInput | null {
        try {
            // Remove markdown code block fences if present
            const cleaned = raw
                .replace(/^```json\s*/i, '')
                .replace(/^```/, '')
                .replace(/```$/, '')
                .trim();

            return JSON.parse(cleaned);
        } catch (err) {
            console.error('Failed to parse OpenAI response:', raw);
            return null;
        }
    }

}