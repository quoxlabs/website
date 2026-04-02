# Implementation Plan

Building quox is a complex endeavor.
We are going to progress in several stages from a collection of experimental pieces to a uniform solution that just works.

Initially, things will therefore be very broken and hard to use.
As we move gradually out of the prototyping phase, we will focus more and more on providing clean abstractions and good documentation.

Below, you can find a list of all the different stages we went through.

## First Principles

Coming from first principles, we can look at the following facts about existing technologies.

- Applications need a UI, and websites are the most sophisticated and universal UI system in the world.
- TSX is a good way to express such UIs.
- Deno lets us run TSX with no build step.
- Rendering a DOM needs native performance.
- Rendering a DOM needs graphics acceleration.
- JavaScript has neither native performance nor does it run on a GPU.
- blitz is an HTML rendering library written in Rust.
- Rust can be compiled to WASM.
- Deno can run WASM.
- JavaScript can call into WASM.
- blitz uses `wgpu` for its rendering.
- Deno supports WebGPU, and it also uses the same `wgpu` crate for that.
- Native application windows can be managed from C.
- Deno FFI can perform the same calls into native binaries as C.

Consequently, we can

1. compile blitz to WASM+WebGPU,
2. run it inside Deno, and
3. write a thin layer of TS on top of it in order to connect it to native windows via FFI.

That way, people could write TSX and then Deno would be able to parse it, hand it over to blitz, and receive back a rendered frame that could be passed to the OS via FFI.

Unfortunately, compiling blitz to wasm turns out not to be very straightforward.
We therefore currently still compile it natively and ship binaries alongside the TS.
This will hopefully change in the future.

## Current Architecture

Our current implementation can be found [on GitHub](https://github.com/quoxlabs/quox).

A quox application consist of the following **four layers**:

- your application code
- calls into the quox TypeScript package
- which calls into the quox Rust layer that actually performs the windowing and rendering
- which calls into native system libraries in order to communicate with the host system

Most notably, **there is only one event loop**---the Deno event loop.
It is used to pump all native windowing events, rendering, etc.
This means that your entire application only has a single thread.

Deno has Web Workers if you need to perform heavy off-thread computations.
[Use them](https://docs.deno.com/examples/web_workers/) as needed.

> Note that quox cannot be run from within a web worker.
> It must be run from the main thread because it handles OS windows.

## Pending Tasks

We have a lot of ideas, open questions, and pending work.
Check out [the issue section on GitHub] to see our progress.

Consider helping out, too!
