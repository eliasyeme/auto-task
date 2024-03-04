import { OpenAI } from '@langchain/openai'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { RunnableSequence } from '@langchain/core/runnables'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { z } from 'zod'

export const generateTodoList = async (goal: string) => {
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      data: z
        .array(z.string())
        .describe('short actionable ordered todo items.'),
    }),
  )

  const openaiModel = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })

  const googleModel = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    maxOutputTokens: 2048,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      'Generate todo list from users goal as best as possible.\n{format_instructions}\n{question}',
    ),
    // openaiModel,
    googleModel,
    parser,
  ])

  const response = await chain.invoke({
    question: goal,
    format_instructions: parser.getFormatInstructions(),
  })

  return response
}
