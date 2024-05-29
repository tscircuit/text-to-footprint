"use client"

import { PCBViewer } from "@tscircuit/pcb-viewer"
import { useState } from "react"
import { useQuery } from "react-query"
import { useDebounce } from "use-debounce"

export default () => {
  const [textInput, setTextInput] = useState("")
  const [delayedInput] = useDebounce(textInput, 400)
  const { data } = useQuery(["/generation/get", delayedInput], async () => {
    const res = await fetch(
      `/api/generation/get?text=${encodeURIComponent(delayedInput)}`
    )
    return res.json()
  })

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 32,
      }}
    >
      <div>
        <textarea
          style={{ width: 400, height: 80 }}
          onChange={(e) => setTextInput(e.target.value)}
        />
      </div>
      <div style={{ height: 600, width: "100%", marginTop: 40 }}>
        {data && data.text_input === textInput && (
          <PCBViewer
            key={JSON.stringify([textInput, data.text_input])}
            soup={data.soup}
            height={600}
          />
        )}
      </div>
    </div>
  )
}
