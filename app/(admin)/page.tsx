"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { app as appSchema } from "@/drizzle/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSWR, { useSWRConfig } from "swr";
import { Loader2, PencilIcon } from "lucide-react";
const fetcher = (url: string) =>
  fetch(url).then((res) => res.json().then(({ data }) => data));
const deleteAppSchema = z.object({
  name: z.string(),
});
const insertAppSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10).max(135),
  featured: z.boolean(),
  url: z.string().url(),
  image: z.string().url(),
  icon: z.string().url(),
});
export default function Page() {
  const { data: apps = [], isLoading } = useSWR<
    z.infer<typeof insertAppSchema>[]
  >("/api/apps", fetcher, { refreshInterval: 10000 });
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const [disabledInput, setDisabledInput] = useState(false);
  const [inputValue, setInputValue] = useState<z.infer<typeof insertAppSchema>>(
    {
      name: "",
      description: "",
      url: "",
      image: "",
      icon: "",
      featured: false,
    },
  );
  const [buttonText, setButtonText] = useState("Save");
  const deleteForm = useForm<z.infer<typeof deleteAppSchema>>({
    resolver: zodResolver(deleteAppSchema),
  });
  const createForm = useForm<z.infer<typeof insertAppSchema>>({
    resolver: zodResolver(insertAppSchema),
    defaultValues: inputValue,
  });
  useEffect(() => {
    createForm.reset(inputValue);
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps
  const formFields: {
    name: string;
    placeholder: string;
  }[] = [
    {
      name: "name",
      placeholder: "app name",
    },
    {
      name: "description",
      placeholder: "app description",
    },
    {
      name: "url",
      placeholder: "app url",
    },
    {
      name: "image",
      placeholder: "app image",
    },
    {
      name: "icon",
      placeholder: "app icon",
    },
    {
      name: "featured",
      placeholder: "app featured",
    },
  ];
  return (
    <div className="flex h-full items-center justify-center flex-col">
      {!isLoading ? (
        <div className="flex flex-row m-auto">
          <Table className="mb-4 border-b">
            <TableHeader>
              <TableRow>
                {Object.keys(appSchema).map((key) => (
                  <TableHead key={key} className="text-ellipsis text-sm">
                    {key}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map((app, key) => (
                <TableRow key={key}>
                  {Object.keys(app).map((key) => (
                    <TableCell className="text-ellipsis text-sm" key={key}>
                      {key === "icon" ? (
                        <Image
                          className="w-12 h-12 aspect-square"
                          src={app[key]}
                          alt={app.name}
                          width={32}
                          height={32}
                        />
                      ) : key === "image" ? (
                        <Image
                          className="aspect-auto"
                          src={app[key]}
                          alt={app.name}
                          width={150}
                          height={75}
                        />
                      ) : (
                        app[key as keyof typeof app]
                      )}
                      {key === "name" && (
                        <Button
                          key={key}
                          className="ml-2 text-muted-foreground"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setInputValue(app);
                            setDisabledInput(true);
                            setButtonText("Edit");
                          }}
                        >
                          <PencilIcon className="size-4" />
                        </Button>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center items-center">
          <Loader2 className="mx-auto my-4 size-24 animate-spin" />
        </div>
      )}
      <Form {...createForm}>
        <form
          className="flex justify-start gap-1 flex-wrap"
          onSubmit={createForm.handleSubmit(
            async (values: z.infer<typeof insertAppSchema>) => {
              await fetch("/api/admin/apps", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response) => {
                if (!response.ok) {
                  toast({
                    title: "Error",
                    description: "Network response was not ok",
                    variant: "destructive",
                  });
                  throw new Error("Network response was not ok");
                }
                return response.json();
              });
              setDisabledInput(false);
              createForm.reset({
                name: "",
                description: "",
                featured: false,
                url: "",
                image: "",
                icon: "",
              });
              mutate("/api/apps");
              toast({
                title: "Success",
                description: "App updated successfully",
              });
            },
          )}
        >
          <section className="flex flex-row flex-wrap gap-2 items-center">
            {formFields.map((formField, key) => (
              <FormField
                key={key}
                control={createForm.control}
                name={formField.name as keyof z.infer<typeof insertAppSchema>}
                render={({ field }) => (
                  <FormItem
                    className={
                      formField.name === "featured"
                        ? "flex-col flex items-center -mb-2"
                        : ""
                    }
                  >
                    <FormLabel>{formField.name}</FormLabel>
                    <FormMessage />
                    <FormControl>
                      {formField.name !== "featured" ? (
                        <Input
                          className="w-48"
                          {...field}
                          value={field.value.toString()}
                          {...(formField.name === "name" && {
                            disabled: disabledInput,
                          })}
                        />
                      ) : (
                        <Switch
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </section>
          <div className="flex flex-row">
            <Button
              type="reset"
              className="mx-2 self-end mt-2"
              variant="destructive"
              onClick={() => {
                setDisabledInput(false);
                createForm.reset(
                  {
                    name: "",
                    description: "",
                    url: "",
                    image: "",
                    icon: "",
                  },
                  {
                    keepValues: false,
                    keepErrors: false,
                  },
                );
                setInputValue({
                  name: "",
                  description: "",
                  url: "",
                  image: "",
                  icon: "",
                  featured: false,
                });
                setButtonText("Save");
              }}
            >
              Reset
            </Button>
            <Button type="submit" className="ml-2 self-end">
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
      <Form {...deleteForm}>
        <form
          className="flex justify-start gap-1 py-12"
          onSubmit={deleteForm.handleSubmit(async (values) => {
            await fetch("/api/admin/apps", {
              method: "DELETE",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              if (!response.ok) {
                toast({
                  title: "Error",
                  description: "Network response was not ok",
                  variant: "destructive",
                });
                throw new Error("Network response was not ok");
              }
              return response.json();
            });
            deleteForm.reset();
            setDisabledInput(false);
            mutate("/api/apps");
            toast({
              title: "Success",
              description: "App deleted successfully",
            });
          })}
        >
          <section className="flex flex-row">
            <FormField
              control={deleteForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="ml-4">
                  <FormLabel>name</FormLabel>
                  <FormMessage />
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-56">
                        <SelectValue placeholder="Select an app to delete" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {apps.map((app, key) => (
                        <SelectItem key={key} value={app.name!}>
                          {app.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </section>
          <div className="flex flex-row">
            <Button
              type="submit"
              className="ml-2 self-end"
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
