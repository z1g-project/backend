import { db } from "@/drizzle";
import { app as appSchema } from "@/drizzle/schema";
export async function GET() {
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
// edging
export const runtime = "edge";
export const dynamic = "force-dynamic";
