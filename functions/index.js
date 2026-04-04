export async function onRequestGet(context) {
  const accept = context.request.headers.get("Accept") ?? "";
  if (!accept.includes("text/html")) {
    return Response.redirect("jsr:@quoxlabs/quox", 302);
  }
  return context.env.ASSETS.fetch(context.request);
}
