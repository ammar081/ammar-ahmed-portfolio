"use client";

import { projects } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { usePortfolioMode } from "./PortfolioModeContext";

export function ProjectGrid() {
  const { mode } = usePortfolioMode();
  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} mode={mode} />
      ))}
    </div>
  );
}
