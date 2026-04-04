---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "quox"
  text: "Bring the web stack to the desktop"
  tagline: "Built on TypeScript, Deno, Wasm, WebGPU, and FFI"
  actions:
    - theme: brand
      text: What is this?
      link: /overview
    - theme: alt
      text: Contribute
      link: https://github.com/quoxlabs/quox

features:
  - title: No Electron
    details: Electron adds tremendous complexity by bundling Chromium and Node.js, quox avoids this entirely
  - title: No Build Step
    details: quox projects can be as small as a single TSX file, and never require a build step
  - title: Bring your own stack
    details: If it works with preact, it works with quox
  - title: Hardware-accelerated
    details: WebAssembly for the hot paths, GPU-acceleration for the rendering
  - title: Single JS context
    details: Every single competing solution uses two JS contexts, quox needs just one
  - title: Built-in security
    details: Your application is fully contained inside Deno's secure sandbox with granular permissions for full system access
  - title: Run from URLs
    details: You can provide a URL for your users, and if they have Deno, they can directly run your entire application
  - title: Cross-platform compilation
    details: Creating binaries for all target platforms takes seconds and is a single command way, no setup required
---

# Quickstart

quox lets you build a full desktop application in two lines of code and no build
step.

```tsx
/** @jsxImportSource npm:preact */

import { renderToWindow } from "jsr:@quoxlabs/quox";

await renderToWindow(<h1>Hello, world!</h1>);
```

You can directly run this with [Deno](https://deno.com):

```sh
deno --allow-ffi https://quox.dev/main.tsx
```

Current progress:

| OS            | Support                    |
| ------------- | -------------------------------- |
| Windows       | :white_check_mark: yes                                         |
| Linux/X11     | :white_check_mark: yes                                         |
| Linux/Wayland | :white_check_mark: yes, with `--allow-env=WAYLAND_DISPLAY`    |
| Mac           | :construction: in progress                                     |

Are you ready?
[Join us](https://github.com/quoxlabs/quox)!
