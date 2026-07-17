import { Check, MapPin } from "lucide-react";
import { AnimatedYears } from "./AnimatedYears";

export function AboutSection() {
  return (
    <section id="about" className="section about" data-reveal="up">
      <AnimatedYears />
      <div>
        <p className="eyebrow">ABOUT</p>
        <h2>Engineering with a product lens.</h2>
        <p>
          I’m a full-stack developer and M.Sc. Artificial Intelligence student
          at BTU Cottbus-Senftenberg. I care about the whole path from an
          ambiguous user need to a dependable, understandable product.
        </p>
        <div className="about-grid">
          <p>
            <MapPin /> Cottbus, Brandenburg
          </p>
          <p>
            <Check /> English C1
          </p>
          <p>
            <Check /> German A1
          </p>
          <p>
            <Check /> Urdu / Punjabi native
          </p>
        </div>
        <p className="education">
          <b>M.Sc. Artificial Intelligence</b>
          <span>BTU Cottbus-Senftenberg · 2023—Present</span>
        </p>
      </div>
    </section>
  );
}
