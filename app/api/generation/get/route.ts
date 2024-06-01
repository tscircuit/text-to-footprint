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

  if (!text) {
    return NextResponse.json({
      text_input: "",
      footprinter_input: "",
      soup: [],
    })
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const is_tscircuit_domain = req.headers
    .get("origin")
    ?.includes("tscircuit.com")

  const completion = await openai.chat.completions.create({
    // model: is_tscircuit_domain ? "gpt-3.5-turbo" : "gpt-4o",
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: getPrompt(text!),
      },
    ],
  })

  // sometimes the AI inserts ":" in the message
  const footprint = completion.choices[0]?.message?.content!.split(":")[0]

  let soup: any
  try {
    soup = fp.string(footprint!).soup()
  } catch (e: any) {
    console.log(`Invalid footprint: ${footprint}`)
    console.log(e.toString())
    return NextResponse.json({
      text_input: text,
      footprinter_input: footprint,
      error: {
        message: "could not create footprint",
      },
      soup: [],
    })
  }

  return NextResponse.json(
    {
      text_input: text,
      footprinter_input: footprint,
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
