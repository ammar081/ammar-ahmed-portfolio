import Portfolio from "@/components/Portfolio";
import { cookies } from "next/headers";
import type { Mode } from "@/data/portfolio";

export default async function Page() {
  const cookieStore = await cookies();
  const savedMode = cookieStore.get("portfolio-mode")?.value;
  const initialMode: Mode = savedMode === "engineer" ? "engineer" : "recruiter";
  return <Portfolio initialMode={initialMode} />;
}
