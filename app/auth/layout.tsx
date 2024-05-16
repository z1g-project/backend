import { Card } from "@/components/ui/card";
export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex h-[90vh] items-center justify-center flex-col">
      <Card className="mx-auto flex min-h-72 w-96 flex-col items-center justify-center bg-foreground/10 py-12 backdrop-blur-md">
        {children}
      </Card>
    </section>
  );
}
