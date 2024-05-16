import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";
import { StyledSubmit } from "@/components/submit-button";
export default async function SignOut() {
  const session = await auth();

  return (
    <CardContent>
      <div className="text-secondary-foreground text-sm flex justify-center items-center p-4">
        <Image
          src={session?.user?.image as string}
          alt="User Image"
          width={25}
          height={25}
          className="rounded-full mr-2"
        />
        signed in as {session?.user?.name || session?.user?.email}
      </div>
      <p className="text-center font-semibold">
        Are you sure you want to log out?
      </p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="w-full"
      >
        <StyledSubmit className="mt-6 w-full">
          <LogOut className="mr-2 size-4" />
          Log out
        </StyledSubmit>
      </form>
    </CardContent>
  );
}
