import { generateObject } from "ai";
import { z } from "zod";
import path from "path";
import { readFileSync } from "fs";
import { anthropic } from "@ai-sdk/anthropic";

const schema = z.object({
  name: z.string().describe("The name of the company or person."),
  mainContent: z
    .string()
    .describe(
      "The most important information from the main content of the file."
    ),
  email: z.string().describe("The email of the person or company."),
  phoneNumber: z.number().describe("The phone number of the person or company"),
});

export const extractDataFromPdf = async (pdfPath: string) => {
  const { object } = await generateObject({
    model: anthropic("claude-3-5-sonnet-latest"),
    system:
      "You will recieve a pdf. " + "Please extract the data from the pdf.",
    schema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(pdfPath),
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  });

  return object;
};

const result = await extractDataFromPdf(
  path.join(import.meta.dirname, "./testPDF.pdf")
);

console.dir(result, { depth: null });
