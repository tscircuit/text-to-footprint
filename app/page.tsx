"use client"

import { PCBViewer } from "@tscircuit/pcb-viewer"
import { useState } from "react"
import { useQuery } from "react-query"
import { useDebounce } from "use-debounce"

export default () => {
  const [textInput, setTextInput] = useState(
    "a qfp component with 24 pins and 0.8mm pitch and a thermal pad"
  )
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ opacity: 0.7, paddingBottom: 16 }}>
          <div style={{ paddingBottom: 8 }}>
            This is a technical preview of{" "}
            <a href="https://tscircuit.com">tscircuit</a> text-to-footprint.{" "}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <a href="https://github.com/tscircuit/tscircuit/issues">
                file issue
              </a>
              <a href="https://github.com/tscircuit/tscircuit/issues/156">
                upvote kicad export
              </a>
              <a href="https://github.com/tscircuit/footprinter">contribute</a>
              <a href="https://github.com/tscircuit/tscircuit">
                <img
                  src="https://img.shields.io/github/stars/tscircuit/tscircuit"
                  alt="GitHub Stars"
                />
              </a>
            </div>
          </div>
          <div style={{ display: "flex", gap: "4px", paddingTop: 4 }}>
            <div
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setTextInput("a 16 pin wide dip component")
              }}
            >
              example1
            </div>
            <div
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setTextInput("72 pin square bga component")
              }}
            >
              example2
            </div>
            <div
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setTextInput(
                  "a qfn component with 24 pins and 0.8mm pitch and a thermal pad, pins are counter clockwise starting from the top right corner"
                )
              }}
            >
              example3
            </div>
          </div>
          <details style={{ paddingTop: 8 }}>
            <summary>Capabilities & Limitations</summary>
            <div style={{ width: 600 }}>
              This text-to-footprint system is optimized for creating footprints
              that can easily be copied and pasted into tscircuit. <br />
              <br />
              It could save electronics engineers hours on each datasheet
              translation they have to do. You can adjust starting pins, pitch,
              pad size, pad shape, width and many other parameters for a wide
              variety of standard components.
              <br />
              <br />
              <ul>
                <li>
                  Generate standard or semi-standard footprints for the majority
                  of packages
                </li>
                <li>
                  Generate from typical footprint descriptions, e.g. the names
                  inside the
                  <a href="https://gitlab.com/kicad/libraries/kicad-footprints">
                    Kicad Component Catalog
                  </a>{" "}
                  (WIP)
                </li>
                <li>
                  Intelligently guess missing dimensions using electronics
                  engineering knowledge
                </li>
                <br />
                <div style={{ fontWeight: "bold" }}>LIMITATIONS</div>
                <li>
                  Cannot read datasheets, datasheet-to-footprint in progress
                </li>
                <li>
                  Not multi-modal, vision model for parsing engineering diagrams
                  is coming soon (this should allow it to create the vast
                  majority of component footprints)
                </li>
                <li>
                  You can't currently paste in part numbers, but this is coming
                  very soon
                </li>
              </ul>
              <br />
            </div>
          </details>
        </div>
        <textarea
          style={{ width: 400, height: 80 }}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <div style={{ color: "red" }}>{data?.error?.message}</div>
        <div
          style={{
            color: "gray",
            fontFamily: "monospace",
            whiteSpace: "pre",
            paddingTop: 4,
          }}
        >{`// paste into tscircuit\n<component footprint="${data?.footprinter_input}" />`}</div>
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
