import { db } from "@/drizzle";
import { app } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  await db
    .insert(app)
    .values(data)
    .onConflictDoUpdate({
      target: app.name,
      set: {
        description: data.description,
        url: data.url,
        image: data.image,
        icon: data.icon,
      },
    })
    .catch((error) => {
      console.error(error);
      return Response.json({ error: error.message }, { status: 500 });
    });
  return Response.json({ success: true });
}
export async function DELETE(req: Request) {
  const { name } = await req.json();
  await db
    .delete(app)
    .where(eq(app.name, name))
    .catch((error) => {
      console.error(error);
      return Response.json({ error: error.message }, { status: 500 });
    });
  return Response.json({ success: true });
}
export const runtime = "edge";
