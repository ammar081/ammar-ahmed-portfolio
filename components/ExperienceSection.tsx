import { experience } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="section split-section" data-reveal="up">
      <div>
        <p className="eyebrow">EXPERIENCE</p>
        <h2>
          Production work,
          <br />
          built with teams.
        </h2>
      </div>
      <div className="timeline">
        {experience.map((job, index) => (
          <article key={job.company} data-reveal-item>
            <span>0{index + 1}</span>
            <div>
              <p className="date">{job.date}</p>
              <h3>{job.role}</h3>
              <h4>{job.company}</h4>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="role-stack">
                {job.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
