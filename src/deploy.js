import { serve } from "https://deno.land/std/http/server.ts";
import { join, extname } from "https://deno.land/std/path/mod.ts";
import { contentType } from "https://deno.land/std/media_types/mod.ts";

const DIST_DIR = join(Deno.cwd(), "dist");

async function handler(req) {
  const url = new URL(req.url);
  let filePath = join(DIST_DIR, url.pathname);

  // Remove leading slash for consistent file path resolution
  if (url.pathname.startsWith('/')) {
    filePath = join(DIST_DIR, url.pathname.substring(1));
  }

  // If the path is a directory or root, serve index.html
  try {
    const file = await Deno.stat(filePath);
    if (file.isDirectory) {
      filePath = join(filePath, "index.html");
    }
  } catch {
    // Fallback to index.html for HTML5 routing.
    filePath = join(DIST_DIR, "index.html");
  }

  try {
    const file = await Deno.readFile(filePath);
    const mimeType = contentType(extname(filePath)) || "application/octet-stream";

    // If the file is JavaScript, ensure it's served with the right MIME type
    if (extname(filePath) === ".js") {
      return new Response(file, {
        headers: {
          "content-type": "application/javascript",
        },
      });
    }

    return new Response(file, {
      headers: {
        "content-type": mimeType,
      },
    });
  } catch (error) {
    return new Response("404 Not Found", { status: 404 });
  }
}

serve(handler);
