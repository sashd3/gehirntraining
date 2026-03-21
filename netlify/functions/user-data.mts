import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const store = getStore("user-data");
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "userId required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    // GET — load user data
    if (req.method === "GET") {
      const data = await store.get(userId, { type: "json" });
      if (!data) {
        return new Response(JSON.stringify({ exists: false }), { status: 200, headers });
      }
      return new Response(JSON.stringify({ exists: true, data }), { status: 200, headers });
    }

    // PUT — save user data
    if (req.method === "PUT") {
      const body = await req.json();
      await store.setJSON(userId, body);
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    }

    // DELETE — remove user data
    if (req.method === "DELETE") {
      await store.delete(userId);
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers,
    });
  }
};
