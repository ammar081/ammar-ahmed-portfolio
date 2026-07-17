import { ProjectGrid } from "./ProjectGrid";

export function ProjectsSection() {
  return (
    <section id="work" className="section projects-section" data-reveal="up">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SELECTED ENGINEERING WORK</p>
          <h2>
            Flagship systems,
            <br />
            built end to end.
          </h2>
        </div>
        <p>
          Verified implementation evidence across product thinking, interface
          design, architecture, testing and delivery.
        </p>
      </div>
      <ProjectGrid />
    </section>
  );
}
