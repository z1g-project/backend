"use server";
import { auth } from "@/auth";
import { db } from "@/drizzle";
import { app, insertAppSchema } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteApp = async (name: string) => {
  const session = await auth();
  console.warn(`user ${session?.user?.email} is deleting ${name}`);
  await db.delete(app).where(eq(app.name, name));
  revalidatePath("/")
  return { success: true };
}
export const createApp = async (data: FormData) => {
  const validatedFields = insertAppSchema.safeParse({
    name: data.get("name"),
    description: data.get("description"),
    url: data.get("url"),
    image: data.get("image"),
    icon: data.get("icon"),
    featured: Boolean(data.get("featured")),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  await db
    .insert(app)
    .values(validatedFields.data)
    .onConflictDoUpdate({
      target: app.name,
      set: {
        description: validatedFields.data.description,
        url: validatedFields.data.url,
        featured: validatedFields.data.featured,
        image: validatedFields.data.image,
        icon: validatedFields.data.icon,
      },
    });
  revalidatePath("/")
  return { success: true };
}
