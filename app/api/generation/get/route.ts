import { NextResponse } from "next/server"
import { fp } from "@tscircuit/footprinter"
import OpenAI from "openai"
import { getPrompt } from "../../../../lib/get-prompt"

export const GET = async (req) => {
  const url = new URL(req.url)

  const text = url.searchParams.get("text")
  if (!process.env.OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY", { status: 500 })
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: getPrompt(text!),
      },
    ],
  })

  const footprint = completion.choices[0]?.message?.content!
  console.log(footprint)

  let soup
  try {
    soup = fp.string(footprint).soup()
  } catch (e) {
    console.log(`Invalid footprint: ${footprint}`)
    return NextResponse.json({
      text_input: text,
      soup: [],
    })
  }

  return NextResponse.json(
    {
      text_input: text,
      soup,
    },
    {
      // add a caching header
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=3000",
      },
    }
  )
}
