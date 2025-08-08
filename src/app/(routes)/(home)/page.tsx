import { appConfig } from "@/lib/appConfig";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{appConfig.name}</h1>
      <p className="text-muted-foreground">{appConfig.description}</p>
    </div>
  );
}
