# quox

We envision a fundamentally new way to develop desktop applications for Windows, macOS, and Linux from the same code base.

## What We Have

quox (pronouced like _quarks_) is more than an idea.
We have a concrete [plan](./plan).

However, there is no demo yet.

We have implemented many individual parts of quox already, but there are still some core components that are missing.

## What We Want

[Electron](https://www.electronjs.org/) was a major step forward towards cross-platform applications.
However, it is successful despite a number of serious drawbacks, mainly regarding performance, developer experience, and security.

quox fixes all of them at once by rethinking the entire stack.

Instead of taking HTML, CSS, and JavaScript, and bundling both Node and Chromium with it into a gigantic executable, you can take a TSX file and run it directly.
Windowing, layouting, composing, rendering, and input handling are all done via library calls.

Basically, with quox, a minimal example project has two lines of code and no build step.

```tsx
// main.tsx
import { renderToWindow } from "https://quox.dev/mod.ts";

await renderToWindow(<h1>Hello, world!</h1>);
```

The `renderToWindow` function then takes your TSX and does everything a browser does in order to bring it to the screen.
Just run

```sh
deno run --allow-ffi main.tsx
```

and you have sucessfully created your first cross-platform desktop application with quox.

As a result, quox works quite differently from Electron.

| Electron                                                                       | quox                                                       |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Bundles Node                                                                   | Runs inside [Deno](https://deno.com)                       |
| Bundles Chromium                                                               | Calls into [servo](https://servo.org/)                     |
| Bundles HTML and CSS                                                           | Runs TSX natively                                          |
| Has a complex build process                                                    | Has no build step                                          |
| Runs JavaScript in several environments that differ slightly                   | Runs TypeScript in a single, clean environment             |
| Spreads out an application across several processes, and connects them via IPC | Runs in a single process with wasm threads and web workers |
| Cannot fully benefit from Chromium's security                                  | Fully benefits from Deno's security                        |

Both quox and Electron have full system access, native graphics rendering performance, cross-platform support, and anything else you'd expect from a native application.

A direct consequence our approach is that quox can do things nobody else can do:

1. Run a full desktop app from nothing but a URL via `deno run https://...`
2. Deduplicate quox on disk (even across several indepdendent apps) if run from a URL
3. Secure your _entire_ desktop application via a sandbox, with interactive permissions if desired
4. Have hot module replacement (HMR) out of the box during development

## Who We Are

We are a small team of volunteers with too little time who do open-source work.
Progress is steady but slow.

This means that we cannot develop at a particularly high pace.
Don't expect a release in the next few weeks.

It also means that we can give time to the underlying technologies to mature, and to impact their development in a direction that suits us.
We are early, but not wrong.
