import { Button } from "@/components/ui/button";
import icon from "./icon.png"
import Image from "next/image";
import Link from "next/link";
export default function ErrorPage() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
			<div className="flex flex-col items-center justify-center">
				<section>
					<div className="mb-4 flex flex-col items-center justify-center text-left text-2xl font-bold">
						<div className="mb-4 flex items-center justify-center">
							<Image src={icon} alt="z1g Project" className="size-8" />
							<span className="ml-2 text-3xl font-bold">Backend</span>
						</div>
					</div>
				</section>
				<p className="mb-2 text-center text-xl font-semibold">
				404 - Page Not Found
				</p>
				<section className="flex flex-col items-center justify-center">
					<p className="mb-2 text-center font-bold text-destructive">
					</p>
					<Button
						asChild
						type="button"
						variant="link"
						className="text-foreground"
					>
						<Link href="/">Go Home</Link>
					</Button>
				</section>
			</div>
		</div>
	);
}
