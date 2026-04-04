# Next Up

Building quox is a complex endeavor.
Coming from first principles, this is what we had in mind since early 2023:

## First Principles

Coming from first principles, we can look at the following facts about existing technologies.

- Applications need a UI, and websites are the most sophisticated and universal UI system in the world.
- TSX is a good way to express such UIs.
- Deno lets us run TSX with no build step.
- Rendering a DOM needs native performance.
- Rendering a DOM needs graphics acceleration.
- JavaScript has neither native performance nor does it run on a GPU.
- blitz is an HTML rendering library written in Rust.
- Rust can be compiled to Wasm.
- Deno can run Wasm.
- JavaScript can call into Wasm.
- blitz uses `wgpu` for its rendering.
- Deno supports WebGPU, and it also uses the same `wgpu` crate for that.
- Native application windows can be managed from C.
- Deno FFI can perform the same calls into native binaries as C.

Consequently, we can

1. compile blitz to Wasm+WebGPU,
2. run it inside Deno, and
3. write a thin layer of TS on top of it in order to connect it to native windows via FFI.

That way, people can write TSX and then Deno would be able to parse it, hand it over to blitz, and receive back a rendered frame that could be passed to the OS via FFI.

This is what we have done.

## Current Architecture

Our current implementation can be found [on GitHub](https://github.com/quoxlabs/quox).

A quox application consist of the following **three layers**:

- your application code calls into the quox TypeScript package
- which does all windowing via FFI, and calls into a WebAssembly+WebGPU renderer
- which actually performs the layouting and rendering

Most notably, **there is only one event loop**---the Deno event loop.
It is used to pump all native windowing events, rendering, etc.
This means that your entire application only has a single thread.

Deno has Web Workers if you need to perform heavy off-thread computations.
[Use them](https://docs.deno.com/examples/web_workers/) as needed.

> Note that quox cannot be run from within a web worker.
> It must be run from the main thread because it handles OS windows.

## Pending Tasks

We have a lot of ideas, open questions, and pending work.
Check out [the issue section on GitHub](https://github.com/quoxlabs/quox/issues) to see our progress.

Consider helping out, too!
