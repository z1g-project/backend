"use client";

import { createApp, deleteApp } from "@/actions/app";
import { StyledSubmit } from "@/components/submit-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { SelectApp } from "@/drizzle/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export const columns: ColumnDef<SelectApp>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "featured",
    header: "Featured",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        className="aspect-auto"
        alt={row.original.name}
        src={row.original.image}
        width={150}
        height={75}
      />
    ),
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <Image
        className="h-12 w-12"
        alt={row.original.name}
        src={row.original.icon}
        width={48}
        height={48}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const app = row.original;
      return (
        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit App</DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>
                    Delete App
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the app from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => toast.promise(() => deleteApp(app.name), {
                  loading: "Deleting app...",
                  success: "App deleted successfully",
                  error: "Failed to delete app",
                })}>
                  Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {app.name}</DialogTitle>
              <DialogDescription>The app will automatically save after you click the button.</DialogDescription>
            </DialogHeader>
            <form
              action={(data) => toast.promise(() => createApp(data), {
                loading: "Saving app...",
                success: "App saved successfully",
                error: "Failed to save app",
              })}
              className="flex flex-col gap-2 w-full"
            >
              <input readOnly hidden id="name" name="name" minLength={2} value={app.name} />
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" placeholder="Description" name="description" minLength={10} maxLength={135} defaultValue={app.description} required />
              <Label htmlFor="url">URL</Label>
              <Input id="url" placeholder="URL" name="url" type="url" defaultValue={app.url} required />
              <Label htmlFor="img">Image</Label>
              <Input id="img" placeholder="Image" name="image" type="url" defaultValue={app.image} required />
              <Label htmlFor="icon">Icon</Label>
              <Input id="icon" placeholder="Icon" name="icon" type="url" defaultValue={app.icon} required />
              <Label htmlFor="featured">Featured</Label>
              <Switch id="featured" name="featured" defaultChecked={app.featured} />
              <StyledSubmit>Save</StyledSubmit>
            </form>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
