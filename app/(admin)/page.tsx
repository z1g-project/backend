import { z } from "zod";
import { DataTable } from "@/components/data-table";
import { db } from "@/drizzle";
import { app, insertAppSchema } from "@/drizzle/schema";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StyledSubmit } from "@/components/submit-button";

export default async function Page() {
  const apps = await db.select().from(app).orderBy(app.name);
  return (
    <div className="flex h-full flex-col justify-center items-center mb-2 gap-2">
      <div className="flex-row w-full justify-between flex my-4 px-8">
        <h1 className="text-3xl font-bold">Apps</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-2">Add App</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add App</DialogTitle>
              <DialogDescription>Add a new app</DialogDescription>
            </DialogHeader>
            <form
              action={async (data: FormData) => {
                "use server";
                const validatedFields = insertAppSchema.safeParse({
                  name: data.get("name"),
                  description: data.get("description"),
                  url: data.get("url"),
                  image: data.get("image"),
                  icon: data.get("icon"),
                  featured: data.get("featured"),
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
				return { success: true };
              }}
			  className="flex flex-col gap-2 w-full"
            >
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" name="name" />
              <Label htmlFor="desc">Description</Label>
              <Input id="desc" placeholder="Description" name="description" />
              <Label htmlFor="url">URL</Label>
              <Input id="url" placeholder="URL" name="url" />
              <Label htmlFor="img">Image</Label>
              <Input id="img" placeholder="Image" name="image" />
              <Label htmlFor="icon">Icon</Label>
              <Input id="icon" placeholder="Icon" name="icon" />
              <Label htmlFor="featured">Featured</Label>
              <Switch id="featured" name="featured" />
              <StyledSubmit>Add App</StyledSubmit>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <section className="flex justify-center items-center w-[95%] h-full">
        <DataTable columns={columns} data={apps} />
      </section>
    </div>
  );
}
