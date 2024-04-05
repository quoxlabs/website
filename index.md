---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "quox"
  text: "Bring the web stack to the desktop"
  tagline: "Built on TypeScript, Deno, servo, WebGPU, and FFI"
  actions:
    - theme: brand
      text: Read the Vision
      link: /vision
    - theme: alt
      text: Contribute
      link: https://github.com/quoxlabs/quox

features:
  - title: No Electron
    details: Electron adds tremendous complexity by bundling Chromium and Node.js—quox avoids this
  - title: No Build Step
    details: quox projects can be as small as a single TSX file, and never require a build step
  - title: Outstanding DX
    details: A single JS context for your code, built-in security, trivial creation of binaries, and more tools out of the box
---
