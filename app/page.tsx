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
        maxWidth: "99vw",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", maxWidth: "99vw" }}
      >
        <div style={{ opacity: 0.7, paddingBottom: 16 }}>
          <div style={{ paddingBottom: 8, maxWidth: "min(400px, 80vw)" }}>
            This is a technical preview of{" "}
            <a href="https://tscircuit.com">tscircuit</a> text-to-footprint.{" "}
            Type a package description of footprint below and a footprint will
            automatically be generated.
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
              }}
            >
              <div>
                by <a href="https://x.com/seveibar">@seveibar</a>
              </div>
              <a href="https://github.com/tscircuit/tscircuit/issues">
                file issue
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
            <div style={{ maxWidth: "min(600px, 80vw)" }}>
              This text-to-footprint system is optimized for creating footprints
              that can easily be copied and pasted into tscircuit. <br />
              <br />
              It could save electronics engineers hours on each datasheet
              translation they have to do. You can adjust starting pins, pitch,
              pad size, pad shape, width and many other parameters for a wide
              variety of standard components.
              <br />
              <br />
              <b>
                Note: you can press "d" while hovering your mouse over the pcb
                viewer to check dimensions
              </b>
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
                  Pasting manufacturer part numbers is very low accuracy
                  currently
                </li>
                <li>
                  Accuracy is not guaranteed. DO NOT USE TECHNICAL PREVIEW FOR
                  REAL APPLICATIONS. I am working on benchmarks to ensure
                  accuracy, but before that we need to be able to create the
                  majority of shapes
                </li>
              </ul>
              <br />
            </div>
          </details>
        </div>
        <textarea
          style={{ width: "min(400px, 80vw)", height: 80 }}
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
