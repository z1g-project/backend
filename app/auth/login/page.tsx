import { redirect } from "next/navigation";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogIn, AlertCircle } from "lucide-react";
import { StyledSubmit } from "@/components/submit-button";
import { auth, signIn } from "@/auth";
export default async function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  const { error } = searchParams;
  return (
    <>
      <CardTitle className="text-center">Welcome</CardTitle>
      <CardHeader className="text-center">
        This is only for z1g developers. If you aren&apos;t one, you will not be
        able to log in.
      </CardHeader>
      <CardContent className="m-2 w-full flex-col">
        {error ? (
          <Alert variant="destructive" className="w-full text-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error logging in:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
          className="mx-auto mt-4 flex w-full flex-col items-center justify-center gap-2"
        >
          <StyledSubmit className="my-1 w-full">
            <LogIn className="mr-2 size-5" />
            Log in with GitHub
          </StyledSubmit>
        </form>
      </CardContent>
    </>
  );
}
