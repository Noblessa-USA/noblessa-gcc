export default async (request, context) => {
  const url = new URL(request.url);

  // Only test Arabic homepage
  if (url.pathname !== "/ar/") {
    return context.next();
  }

  const cookies = request.headers.get("cookie") || "";
  const getCookie = (name) => {
    const cookie = cookies
      .split(";")
      .map((value) => value.trim())
      .find((value) => value.startsWith(`${name}=`));

    return cookie ? cookie.slice(name.length + 1) : null;
  };

  const assignment = getCookie("ab_variant");

  // Existing assignment
  if (assignment === "short") {
    return Response.redirect(
      new URL("/ar/short/", request.url),
      302
    );
  }

  if (assignment === "control") {
    return context.next();
  }

  // Preserve assignments made before the cookie name changed.
  const legacyAssignment = getCookie("noblessa_ar_variant");

  if (legacyAssignment === "short") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL("/ar/short/", request.url).toString(),
        "Set-Cookie":
          "ab_variant=short; Path=/; Max-Age=2592000; SameSite=Lax",
      },
    });
  }

  if (legacyAssignment === "control") {
    const response = await context.next();

    response.headers.set(
      "Set-Cookie",
      "ab_variant=control; Path=/; Max-Age=2592000; SameSite=Lax"
    );

    return response;
  }

  // New assignment
  const variant = Math.random() < 0.5 ? "short" : "control";

  if (variant === "short") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/ar/short/",
        "Set-Cookie":
          "ab_variant=short; Path=/; Max-Age=2592000; SameSite=Lax",
      },
    });
  }

  const response = await context.next();

  response.headers.set(
    "Set-Cookie",
    "ab_variant=control; Path=/; Max-Age=2592000; SameSite=Lax"
  );

  return response;
};
