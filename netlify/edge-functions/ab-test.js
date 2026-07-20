export default async (request, context) => {
  const url = new URL(request.url);

  // Only test Arabic homepage
  if (url.pathname !== "/ar/") {
    return context.next();
  }

  const cookies = request.headers.get("cookie") || "";

  // Existing assignment
  if (cookies.includes("noblessa_ar_variant=short")) {
    return Response.redirect(
      new URL("/ar/short/", request.url),
      302
    );
  }

  if (cookies.includes("noblessa_ar_variant=control")) {
    return context.next();
  }

  // New assignment
  const variant = Math.random() < 0.5 ? "short" : "control";

  if (variant === "short") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/ar/short/",
        "Set-Cookie":
          "noblessa_ar_variant=short; Path=/; Max-Age=2592000; SameSite=Lax",
      },
    });
  }

  const response = await context.next();

  response.headers.set(
    "Set-Cookie",
    "noblessa_ar_variant=control; Path=/; Max-Age=2592000; SameSite=Lax"
  );

  return response;
};