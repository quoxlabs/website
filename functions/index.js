export async function onRequestGet(context) {
  const accept = context.request.headers.get("Accept") ?? "";
  if (!accept.includes("text/html")) {
    return Response.text('export * from "jsr:@quoxlabs/quox"');
  }
  return context.env.ASSETS.fetch(context.request);
}
