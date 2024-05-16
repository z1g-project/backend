"use client";

import type { SelectApp } from "@/drizzle/schema";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

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
];
