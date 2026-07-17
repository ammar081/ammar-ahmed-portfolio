"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Database,
  Github,
  Layers3,
} from "lucide-react";
import type { Mode, Project, ProjectTab } from "@/data/portfolio";

const recruiterTabs = [
  "Overview",
  "Product",
] as const satisfies readonly ProjectTab[];
const engineerTabs = [
  "Architecture",
  "Engineering",
  "Quality",
] as const satisfies readonly ProjectTab[];

export function ProjectCard({
  project,
  mode,
}: {
  project: Project;
  mode: Mode;
}) {
  const [requestedTab, setRequestedTab] = useState<ProjectTab>("Overview");
  const componentId = useId().replaceAll(":", "");
  const visibleTabs: readonly ProjectTab[] =
    mode === "recruiter" ? recruiterTabs : engineerTabs;
  const activeTab = visibleTabs.includes(requestedTab)
    ? requestedTab
    : visibleTabs[0];
  const panelId = `${componentId}-panel`;

  const renderList = (items: readonly string[]) => (
    <ul className="tick-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={15} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentTab: ProjectTab,
  ) => {
    const currentIndex = visibleTabs.indexOf(currentTab);
    let targetIndex: number | null = null;

    if (event.key === "ArrowRight")
      targetIndex = (currentIndex + 1) % visibleTabs.length;
    if (event.key === "ArrowLeft")
      targetIndex =
        (currentIndex - 1 + visibleTabs.length) % visibleTabs.length;
    if (event.key === "Home") targetIndex = 0;
    if (event.key === "End") targetIndex = visibleTabs.length - 1;
    if (targetIndex === null) return;

    event.preventDefault();
    const targetTab = visibleTabs[targetIndex];
    setRequestedTab(targetTab);
    const tabList = event.currentTarget.closest('[role="tablist"]');
    tabList
      ?.querySelector<HTMLButtonElement>(
        `#${componentId}-${targetTab.toLowerCase()}`,
      )
      ?.focus();
  };

  return (
    <article className="project" id={project.slug} data-tilt data-reveal-item>
      <div className="project-head">
        <div>
          <span className="project-number">{project.index}</span>
          <p className="eyebrow">{project.eyebrow}</p>
          <h3>{project.title}</h3>
        </div>
        <a
          className="icon-link"
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} source code`}
        >
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="evidence-links">
        <button
          type="button"
          data-magnetic
          onClick={() => setRequestedTab(visibleTabs[0])}
        >
          <BookOpen aria-hidden="true" /> Case study
        </button>
        <a data-magnetic href={project.repo} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" /> GitHub{" "}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="project-visual">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 1000px) 100vw, 50vw"
          loading="lazy"
        />
        <span>Verified product interface</span>
      </div>
      <div
        className="tabs"
        key={mode}
        role="tablist"
        aria-label={`${project.title} ${mode} details`}
      >
        {visibleTabs.map((item) => {
          const selected = activeTab === item;
          return (
            <button
              key={item}
              id={`${componentId}-${item.toLowerCase()}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setRequestedTab(item)}
              onKeyDown={(event) => handleTabKeyDown(event, item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div
        id={panelId}
        className="tab-panel"
        key={`${mode}-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${componentId}-${activeTab.toLowerCase()}`}
      >
        {activeTab === "Overview" && (
          <div className="project-overview">
            <div className="two-col">
              <div>
                <p className="label">THE PROBLEM</p>
                <p>{project.problem}</p>
              </div>
              <div>
                <p className="label">MY CONTRIBUTION</p>
                <p>{project.contribution}</p>
              </div>
            </div>
            <div className="outcome">
              <p className="label">OUTCOME</p>
              <p>{project.outcome}</p>
            </div>
          </div>
        )}
        {activeTab === "Product" && (
          <div className="two-col">
            <div>
              <p className="label">SOLUTION</p>
              <p>{project.solution}</p>
            </div>
            <div>
              <p className="label">CAPABILITIES</p>
              {renderList(project.capabilities)}
            </div>
          </div>
        )}
        {activeTab === "Architecture" && (
          <>
            <div className="flow">
              {project.architecture.map((item, index) => (
                <div key={item}>
                  <span>
                    {index === 3 ? (
                      <Database size={18} aria-hidden="true" />
                    ) : (
                      <Layers3 size={18} aria-hidden="true" />
                    )}
                  </span>
                  <b>{item}</b>
                  {index < project.architecture.length - 1 && (
                    <i aria-hidden="true">→</i>
                  )}
                </div>
              ))}
            </div>
            <div className="chips">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </>
        )}
        {activeTab === "Engineering" && (
          <div>
            <p className="label">DECISIONS &amp; TRADE-OFFS</p>
            {renderList(project.decisions)}
          </div>
        )}
        {activeTab === "Quality" && (
          <div>
            <p className="label">QUALITY APPROACH</p>
            {renderList(project.quality)}
          </div>
        )}
      </div>
    </article>
  );
}
