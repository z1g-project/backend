"use server";
import { auth } from "@/auth";
import { db } from "@/drizzle";
import { app } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function deleteApp(name: string) {
  const session = await auth();
  console.warn(`user ${session?.user?.email} is deleting ${name}`);
  await db.delete(app).where(eq(app.name, name));
  return { success: true };
}
