# Implementation Plan

Building quox is a complex endeavor.
We are going to progress in several stages from a collection of experimental pieces to a uniform solution that just works.

Initially, things will therefore be very broken and hard to use.
As we move gradually out of the prototyping phase, we will focus more and more on providing clean abstractions and good documentation.

## Stage 0: Cluelessness

Coming from first principles, we can look at the following facts about existing technologies.

- Applications need a UI, and websites are the most sophisticated and universal UI system in the world.
- TSX is a good way to express such UIs.
- Deno lets us run TSX with no build step.
- Rendering a DOM needs native performance.
- Rendering a DOM needs graphics acceleration.
- JavaScript has neither native performance nor does it run on a GPU.
- servo is a browser engine written in Rust.
- Rust can be compiled to WASM.
- Deno can run WASM.
- JavaScript can call into WASM.
- servo uses `wgpu` for its rendering.
- Deno supports WebGPU, and it also uses the same `wgpu` crate for that.
- Native application windows can be managed from C.
- Deno FFI can perform the same calls into native binaries as C.

Consequently, we can

1. compile servo to WASM+WebGPU,
2. run it inside Deno, and
3. write a thin layer of TS on top of it in order to connect it to native windows via FFI.

That way, people could write TSX and then Deno would be able to parse it, hand it over to servo, and receive back a rendered frame that could be passed to the OS via FFI.

This was the initial naïve idea in early 2023.
It was only explored in September in that same year.

Unsurprisingly, a lot of things immediately turned out to be a lot more difficult.
In finding out where our assumptions were incorrect, we also developed this very plan, and all following stages.

## Stage 1: Solving Problems Individually

A main insight during stage 0 was that servo actually does not solely rely on `wgpu` for its rendering.
It relies on a much larger dependency tree for that.
Most of the consumed libraries call into native graphics libraries in the end.
Hence, servo cannot be compiled to WASM.

We therefore decided to compile servo to a binary for now, and call it via FFI.
Since we also won't be able to obtain the rendered image easily, we will only use servo up to the layouting.
The resulting display list can be passed back to JS, and we can write our own slow and primitive compositor for now.

:::tip Image of a Rendering Pipeline
<https://wiki.mozilla.org/Gecko:Overview#Painting.2FRasterizing_.28Layers_aka_Non-WebRender.29>
:::

In summary, we have to build a number of prototypes that we can stitch together afterwards.

1. Runs TSX in Deno, hijack the library calls of it, obtain a custom DOM structure.
2. Pass a DOM from Deno to a Rust library via FFI.
3. Layout a DOM using servo, yielding a display list.
4. Pass a display list from a Rust library to Deno via FFI.
5. Render a display list using the WebGPU API inside Deno.
6. Open a native window, and pass WebGPU rendering output to it.

Naturally, since this is a prototype, we are only going to support a tiny subset of DOM nodes.
Once we are able to demonstrate the functionality, we can expand the scope to cover the remaining nodes.
This is part of the remaining stages.

We are already able to run servo on small HTML files, and obtain a display list.
However, servo bundles SpiderMonkey, and DOM nodes are managed by the GC of SpiderMonkey on the C++ side, which is undesired for our purposes.
Hence, we have to find a way to carve out the layouting from servo, which requires writing a complete DOM API in Rust.
(We would have had to do this anyway, but now we have to do it sooner rather than later.)

## Stage 2: Improving the Stack (Current)

There are three concurrent goal we currently pursue.

1. Improving servo to the point that it is usable for us.
   This includes running it without SpiderMonkey and having it compile to wasm.
2. Working on "the rest,", i.e. everything from input handling over windowing with winding cross-platform to integrating Rust+wasm+Deno+WebGPU+TSX with a proper API and reactivity/DOM updates.
3. Avoiding servo in the short run and rely on dioxus/blitz just to see how far we can bring this in order to test "the rest."

The first point has three ways how we can attempt it:

1. do nothing, wait for the servo team to fix things for us, spend time on the rest instead
2. only carve out SM and finish up the existing abstraction to it
3. go one level down and revise our decision to perform layouting to the display list only, instead, actually port the underlying graphics stack to wasm+WebGPU

Our initial concern about this was that passing a DL per frame back to JS is faster than performing every single GPU rendering call through the wasm/JS interface, but it turns out that doing JS->WebGPU is virtually slow as wasm->JS-WebGPU.
That means that rendering should indeed be done in Rust.

Improving servo to the point where it is usuable for us is inevitable, as no other engine has the broad support we need.
Apart from doing everything else, this needs to be our main area of contribution for the time being.

## Stage 3: Stichting Things Together

The six steps listed above only demonstrate each part of the functionality in isolation.
We have to put all of them together into a library that actually works.
Achieving this would give us a working prototype that we can publish to JSR.

This will be a very impressive accomplishment already, and it is likely to spark enough attention to bring in new collaborators.
It will be possible to develop small production applications with quox.
A community can be built from here, which will help us work through the remaining stages.

## Stage 4: Scaling Compatibility

In this stage, a minimal prototype already works, but only a few DOM nodes are supported, which severely limits our ability to develop real applications with quox.
Hence, we have to scale up the size of the internal interfaces, which allows us to support all DOM nodes.
This should be fairly repetitive.

In parallel to that, we are likely going to hit numerous other limits.
For example, we may want to swap out our primitive composer for a faster Rust-based alternative.
It can potentially leverage parts of servo that we threw away earlier.

As of today, the exact list of tasks to do at this stage is unclear.
Once we have completed them, we are slowly going to transition into stage 4, the last stage of quox.

## Stage 5: Perpetuity

At this stage, quox is no longer considered a prototype.
It solves problems in the real world, and it is backed by a community.

That does not mean that this project is done.
There will always be further open questions and incompatibilities.
Some of them are:

- How will Web APIs such as `getBoundingClientRect` work?
- How will `<script>` tags work?
- How will iFrames work?

Those things as well as maintenance and governance are questions to be addressed when time has come.
Until then, [join us](https://github.com/quoxlabs)!
