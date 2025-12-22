
// FIX: Import 'Type' for defining JSON response schema.
import { GoogleGenAI, Type } from "@google/genai";

function getApiKey(): string | null {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem('javaJourneyUser') : null;
    if (raw) {
      const u = JSON.parse(raw);
      if (u && typeof u.aiKey === 'string' && u.aiKey.trim()) return u.aiKey.trim();
    }
  } catch (e) { void e; }
  const envKey = process.env.AI_API_KEY;
  return envKey && envKey.trim() ? envKey.trim() : null;
}

function getAI(): GoogleGenAI | null {
  const key = getApiKey();
  return key ? new GoogleGenAI({ apiKey: key }) : null;
}

export async function runJavaCode(code: string, inputs?: string): Promise<string> {
  const ai = getAI();
  if (!ai) {
    return "AI features are not configured. Please set AI_API_KEY to enable code execution.";
  }
  const inputContext = inputs ? `
The user has provided the following input to be supplied to System.in (Standard Input):
\`\`\`
${inputs}
\`\`\`
Ensure the Java code reads this input using Scanner or similar methods if applicable.
` : '';

  const prompt = `
You are an expert Java code interpreter.
Execute the following Java code and return ONLY the standard output.
If there is a compilation or runtime error, return the exact error message.
Do not add any explanation, commentary, or markdown formatting. Just the raw output or error.

${inputContext}

Java Code:
\`\`\`java
${code}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: "flash-model",
      contents: prompt,
    });
    const text = response.text;
    
    // FIX: Check strictly for undefined/null. Empty string is valid output (e.g. code ran but printed nothing).
    if (text === undefined || text === null) {
      return "Error: No output received from the code execution model. The model might have blocked the response.";
    }
    return text.trim();
  } catch (error) {
    console.error("Error executing code via AI API:", error);
    if (error instanceof Error) {
      return `API Error: ${error.message}`;
    }
    return "An unknown error occurred while contacting the API.";
  }
}

export async function explainJavaCode(code: string): Promise<string> {
  const ai = getAI();
  if (!ai) {
    return "AI features are not configured. Please set AI_API_KEY to enable explanations.";
  }
  const prompt = `
You are an expert Java programming tutor for beginners.
Explain the following Java code snippet.
Break it down line-by-line or concept-by-concept.
Keep the language simple, clear, and encouraging.
Use markdown for formatting, especially for code elements.

### Code to Explain:
\`\`\`java
${code}
\`\`\`
`;
  try {
    const response = await ai.models.generateContent({
      model: "flash-model", // Fast for quick explanations
      contents: prompt,
    });
    return response.text?.trim() || "Sorry, I could not generate an explanation at this time.";
  } catch (apiError) {
    console.error("Error explaining code via AI API:", apiError);
    return "Sorry, I encountered an error trying to generate an explanation. Please try again.";
  }
}

// FIX: Add and export validateJavaPracticeSolution function to resolve import error.
export async function validateJavaPracticeSolution(problem: string, code: string, output: string): Promise<{ isCorrect: boolean; feedback: string }> {
  const ai = getAI();
  if (!ai) {
    return {
      isCorrect: false,
      feedback: "AI features are not configured. Please set AI_API_KEY to enable solution validation."
    };
  }
  const prompt = `
You are an automated judge for a Java programming course.
You will be given a problem description, the student's Java code, and the output produced by their code.

Your task is to determine if the student's code correctly solves the problem based on its output.

- If the code and output correctly solve the problem, provide positive feedback.
- If the output is incorrect or doesn't fully solve the problem, provide a brief, encouraging hint about what might be wrong.

**Problem:**
${problem}

**Student's Code:**
\`\`\`java
${code}
\`\`\`

**Code's Output:**
\`\`\`
${output}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: "flash-model",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: {
              type: Type.BOOLEAN,
              description: "Is the student's solution correct based on the problem and output?",
            },
            feedback: {
              type: Type.STRING,
              description: "Friendly feedback for the student about their solution's correctness. If incorrect, provide a hint."
            }
          },
          required: ['isCorrect', 'feedback']
        }
      }
    });

    const jsonText = response.text?.trim();
    if (!jsonText) {
        return {
            isCorrect: false,
            feedback: "System error: The validation model did not return a response."
        };
    }
    return JSON.parse(jsonText);

  } catch (apiError) {
    console.error("Error validating practice solution via AI API:", apiError);
    return {
      isCorrect: false,
      feedback: "Sorry, I encountered an error trying to validate your solution. Please try running the code again."
    };
  }
}

export async function getJavaCodeFeedback(problem: string, code: string): Promise<string> {
  const ai = getAI();
  if (!ai) {
    return "AI features are not configured. Please set AI_API_KEY to enable feedback.";
  }
  const prompt = `
You are a senior Java developer acting as a friendly and constructive code reviewer for a beginner.
The student was given the following problem:
**Problem:** ${problem}

Here is their solution:
**Student's Code:**
\`\`\`java
${code}
\`\`\`

Please provide feedback on their solution. Your feedback should:
1.  Start by acknowledging what they did well.
2.  Provide suggestions for improvement regarding code style, readability, efficiency, or Java best practices.
3.  Explain *why* your suggestions are better.
4.  Maintain an encouraging and supportive tone.
Respond in markdown format.
`;
  try {
    const response = await ai.models.generateContent({
      model: "pro-model", // Pro for in-depth code analysis
      contents: prompt,
    });
    return response.text?.trim() || "Sorry, I could not generate feedback at this time.";
  } catch (apiError) {
    console.error("Error getting code feedback via AI API:", apiError);
    return "Sorry, I encountered an error trying to generate feedback. Please try again.";
  }
}

export async function analyzeJavaCodeError(code: string, error: string): Promise<string> {
  const ai = getAI();
  if (!ai) {
    return "AI features are not configured. Please set AI_API_KEY to enable error analysis.";
  }
  const prompt = `
You are a friendly and helpful Java programming tutor.
A student has written the following Java code and received an error.
Your task is to:
1.  Explain the error in simple, encouraging, and easy-to-understand terms.
2.  Identify the specific line or part of the code that is causing the problem.
3.  Provide a clear hint or a corrected code snippet to help the student learn and fix the issue.
Avoid just giving the answer directly; focus on explaining the 'why'.
Respond in markdown format.

### Student's Code:
\`\`\`java
${code}
\`\`\`

### Error Message:
\`\`\`
${error}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: "flash-model",
      contents: prompt,
    });
    return response.text?.trim() || "Sorry, I could not analyze the error at this time.";
  } catch (apiError) {
    console.error("Error analyzing code via AI API:", apiError);
    return "Sorry, I encountered an error trying to analyze the code. Please try again.";
  }
}

export async function askDevAssistant(prompt: string) {
    const ai = getAI();
    if (!ai) {
        throw new Error("AI features are not configured. Please set AI_API_KEY to enable assistant.");
    }
    const response = await ai.models.generateContentStream({
        model: 'flash-lite-model',
        contents: prompt
    });
    return response;
}
