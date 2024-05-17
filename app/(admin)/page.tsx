import { createApp } from "@/actions/app";
import { DataTable } from "@/components/data-table";
import { StyledSubmit } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/drizzle";
import { app } from "@/drizzle/schema";
import { columns } from "./columns";

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
              <DialogDescription>The app will automatically save after you click the button.</DialogDescription>
            </DialogHeader>
            <form
              action={createApp}
              className="flex flex-col gap-2 w-full"
            >
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" name="name" minLength={2} required />
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" placeholder="Description" name="description" minLength={10} maxLength={135} required />
              <Label htmlFor="url">URL</Label>
              <Input id="url" placeholder="URL" name="url" type="url" required />
              <Label htmlFor="img">Image</Label>
              <Input id="img" placeholder="Image" name="image" type="url" required />
              <Label htmlFor="icon">Icon</Label>
              <Input id="icon" placeholder="Icon" name="icon" type="url" required />
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
