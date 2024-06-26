import { db } from "@/drizzle";
import { app as appSchema } from "@/drizzle/schema";
import type { NextRequest } from "next/server";
// edging
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const host = req.headers.get("host");
  if (host) console.log(`Apps requested from ${host}`);
  try {
    const data = await db.select().from(appSchema).orderBy(appSchema.name);
    return Response.json({ status: "success", data });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        status: "error",
        error: {
          message: "An error occurred while retrieving the apps",
          detail: error,
        },
      },
      { status: 500 },
    );
  }
}
