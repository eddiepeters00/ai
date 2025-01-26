import "dotenv/config";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model: anthropic("claude-3-5-haiku-20241022"),
    prompt,
  });

  return text;
};

const answer = await answerMyQuestion(
  "What is the most polluted city on the planet?"
);

console.log(answer);
