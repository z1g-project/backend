import { Card } from "@/components/ui/card";
import { auth } from "@/auth";
import { Session } from "@/components/providers";
export default async function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <Session {...{ session }}>
      <section className="flex h-[90vh] items-center justify-center flex-col">
        <Card className="mx-auto flex min-h-72 w-96 flex-col items-center justify-center bg-foreground/10 py-12 backdrop-blur-md">
          {children}
        </Card>
      </section>
    </Session>
  );
}
