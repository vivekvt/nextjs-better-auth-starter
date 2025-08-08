import { appConfig } from "@/lib/appConfig";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center">
      <div className="max-w-2xl space-y-6 px-4 text-center">
        <h1 className="text-4xl font-bold">{appConfig.name}</h1>
        <p className="text-muted-foreground text-lg">{appConfig.description}</p>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
