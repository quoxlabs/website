export async function onRequestGet(context) {
  const accept = context.request.headers.get("Accept") ?? "";
  if (!accept.includes("text/html")) {
    return new Response('export * from "jsr:@quoxlabs/quox"\n', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/typescript; charset=utf-8",
      }
    });
  }
  return context.env.ASSETS.fetch(context.request);
}
