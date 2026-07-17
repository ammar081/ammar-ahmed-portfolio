import { skills } from "@/data/portfolio";

const coreCapabilities = [
  ["React · TypeScript · Next.js", "Frontend product engineering"],
  ["Node.js · NestJS · REST APIs", "Backend services and integrations"],
  ["Python · FastAPI · Applied AI", "Data and intelligent workflows"],
  ["Jest · pytest · CI/CD · Docker", "Quality and reliable delivery"],
] as const;

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="section capabilities"
      data-reveal="up"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">TECHNICAL CAPABILITIES</p>
          <h2>Across the product stack.</h2>
        </div>
        <p>Core strengths first, with supporting technologies grouped below.</p>
      </div>
      <div className="core-capabilities" data-spotlight>
        {coreCapabilities.map(([title, description], index) => (
          <div key={title} data-reveal-item>
            <span>0{index + 1}</span>
            <b>{title}</b>
            <small>{description}</small>
          </div>
        ))}
      </div>
      <p className="supporting-label">SUPPORTING TOOLKIT</p>
      <div className="skill-grid">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} data-reveal-item>
            <h3>{group}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
