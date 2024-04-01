import { db } from "@/drizzle";
import { app } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
export async function POST(req: Request) {
  const session = await auth();
  const data = await req.json();
  if (!session) {
    console.warn(
      `${req.headers.get("x-real-ip")} tried to add/update ${data.name} with values ${JSON.stringify(data)}`,
    );
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log(
    `User ${session?.user?.email} is adding/updating ${data.name} with values ${JSON.stringify(data)}`,
  );
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
  const session = await auth();
  const { name } = await req.json();
  if (!session) {
    console.warn(
      `${req.headers.get("x-real-ip") ?? req.headers.get("host")} tried to delete ${name}`,
    );
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.warn(`user ${session?.user?.email} is deleting ${name}`);
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
