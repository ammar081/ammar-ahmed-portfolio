import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer>
      <a href="#top" className="brand">
        AA<span>.</span>
      </a>
      <p>© {new Date().getUTCFullYear()} Ammar Ahmed</p>
      <div>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
