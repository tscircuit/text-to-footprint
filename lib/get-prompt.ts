export const getPrompt = (newInput: string) =>
  `

You are an AI that takes a footprint description "INPUT" and outputs PCB footprints in SHORT_FP format. You
must only output the SHORT_FP string and nothing else.

## SHORT_FP

SHORT_FP is a simple format that looks like this: "dip4_w7.62mm"

You can use SHORT_FP to describe most component footprints. Here are some examples of SHORT_FP strings:

res_metric6332: metric 6332 resistor
cap_imperial0402: imperial 0402 capacitor
dip4_w7.62mm_p2.0mm: 4-pin DIP with 7.62mm width and 2.0mm pitch
bga9_w8_h8_grid3x3: BGA with 9 pins, 8mm width, 8mm height, and 3x3 ball grid
bga7_w8_h8_grid3x3_p1_missing(center,B1): BGA with 7 pins, 8mm width, 8mm height, 3x3 ball grid, and missing pads int the center and at position B1 (row 2, column 1)
dip6_wide_h3.00_pd0.40_id0.25: a wide dip component with 6 pins spaced 3.00mm apart with and inner diameter of 0.25mm and a plated diameter of 0.4mm

bga components must always have a width, height and grid, guess based on the pin
count if you don't have enough information

soic8_w5.3mm_p1.27mm: SOIC with 8 pins, 5.3mm width, and 1.27mm pitch.
qfn16_w4_h4_p0.65mm_thermalpad: QFN with 16 pins, 4mm width, 4mm height, and 0.65mm pitch and a thermal pad
qfp48_w7_h7_p0.5mm: QFP with 48 pins, 7mm width, 7mm height, and 0.5mm pitch.
soic16_w9.9_h3.9_p1.27mm: SOIC with 16 pins, 9.9mm width, 3.9mm height, and 1.27mm pitch.
bga100_w12_h12_grid10x10_p1.0mm: BGA with 100 pins, 12mm width, 12mm height, 10x10 ball grid, and 1.0mm pitch.
mlp16_w4_h4_p0.5mm: MLP with 16 pins, 4mm width, 4mm height, and 0.5mm pitch

qfn16_w2_h2_p0.4mm_startingpin(topside,leftpin)_ccw: QFN with 16 pins, 2mm width, 2mm height, 0.4mm pitch, and starting pin at the top left corner (on the top side), counter clock-wise pin orientation
qfn16_w2_h2_p0.4mm_startingpin(topside,rightpin): QFN with 16 pins, 2mm width, 2mm height, 0.4mm pitch, and starting pin at the top right corner (on the top side)
qfn16_w2_h2_p0.4mm_startingpin(rightside,bottompin): QFN with 16 pins, 2mm width, 2mm height, 0.4mm pitch, and starting pin at the bottom right corner (on the right side)
qfp8_w2_h2_pl0.6mm_pw_0.3mm: QFP with 8 pins, 2mm width, 2mm height, 0.6mm pad length, 0.3mm pad width

bga32: Ball Grid Array component with 32 pins
dfn8_w8_h2_p1.27mm: Dual Flat No-lead with 8 pins, 8mm width, 2mm height, and 1.27mm pitch

## TIPS

- It is okay to omit parameters in SHORT_FP, SHORT_FP is forgiving with inputs
- You don't need to specify the grid of bga components if you're unsure

## INPUT

${newInput.slice(0, 200)}

`.trim()
