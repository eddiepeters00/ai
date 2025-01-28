import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { z } from "zod";

const model = anthropic("claude-3-5-haiku-latest");

const getWeatherTool = tool({
  description: "Get the current weather in the specidied city",
  parameters: z.object({
    city: z.string().describe("The city to get the weather for"),
  }),
  //Could make it async and hook up to a weather API and get the real weather
  execute: async ({ city }) => {
    return `The weather in ${city} is 25* C and sunny`;
  },
});

const askAQuestion = async (prompt: string) => {
  const { textStream, steps } = await streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool,
    },
    maxSteps: 5, //Iterates the tool calls and results
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
};

await askAQuestion("What is the weather like in Stockholm?");
