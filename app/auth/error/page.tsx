"use client";
import { useSearchParams } from "next/navigation";
import { CardContent, CardHeader } from "@/components/ui/card";
import { ShieldX } from "lucide-react";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  return (
    <>
      <CardHeader className="mx-auto mb-2 flex flex-col items-center justify-center">
        <ShieldX className="mb-10 h-12 w-12" />
        There was an error logging in:
        {error && (
          <span>
            <br />
            <span className="font-bold text-destructive">{error}</span>
          </span>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Please try again. If the problem persists, please contact support.
        </p>
      </CardContent>
    </>
  );
}
