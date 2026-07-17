import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { AmbientMotion } from "./AmbientMotion";

export function Hero() {
  return (
    <section className="hero">
      <AmbientMotion />
      <div className="hero-copy">
        <p className="kicker">
          <span /> AVAILABLE FOR OPPORTUNITIES IN GERMANY
        </p>
        <h1 aria-label="Ammar Ahmed.">
          <span className="name-line" aria-hidden="true">
            <span>Ammar</span>
          </span>
          <span className="name-line accent" aria-hidden="true">
            <span>Ahmed.</span>
          </span>
        </h1>
        <h2>
          Full-stack software engineer building reliable React/TypeScript
          products and applied-AI systems.
        </h2>
        <p className="intro">
          3+ years developing web applications, APIs, data workflows, and tested
          user experiences. Based in Germany and completing an M.Sc. in
          Artificial Intelligence.
        </p>
        <div className="actions">
          <a href="#work" className="button primary" data-magnetic>
            View projects <ArrowDown size={17} />
          </a>
          <a
            href={profile.cv}
            download
            className="button secondary"
            data-magnetic
          >
            Download CV <ArrowDown size={17} />
          </a>
        </div>
        <div className="socials">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail /> Email
          </a>
        </div>
      </div>
      <div
        className="hero-product"
        aria-label="Energy analytics product preview"
      >
        <div className="product-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <b>OPERATIONS / OVERVIEW</b>
          <small>LIVE</small>
        </div>
        <div className="product-body">
          <div className="mini-side">
            <b>AE</b>
            <span className="active" />
            <span />
            <span />
            <span />
          </div>
          <div className="mini-main">
            <div className="mini-title">
              <div>
                <small>FLEET PERFORMANCE</small>
                <strong>Energy operations</strong>
              </div>
              <span className="mock-filter">Last 30 days</span>
            </div>
            <div className="metrics">
              <div>
                <small>TOTAL OUTPUT</small>
                <b>
                  19.84 <em>MWh</em>
                </b>
                <span>↗ 8.2%</span>
              </div>
              <div>
                <small>CAPACITY FACTOR</small>
                <b>
                  84.6 <em>%</em>
                </b>
                <span>On target</span>
              </div>
              <div>
                <small>ACTIVE EVENTS</small>
                <b>03</b>
                <span className="coral">Review</span>
              </div>
            </div>
            <div className="chart">
              <div className="chart-label">
                <b>Production overview</b>
                <small>
                  ACTUAL <i /> FORECAST <i />
                </small>
              </div>
              <svg
                viewBox="0 0 600 190"
                role="img"
                aria-label="Energy output chart"
              >
                <path
                  className="grid"
                  d="M0 30H600M0 80H600M0 130H600M0 180H600"
                />
                <path
                  className="area"
                  d="M0 160 C50 150 65 90 110 110 S170 145 210 95 S275 35 320 80 S385 125 430 60 S510 35 600 55 L600 190 L0 190Z"
                />
                <path
                  className="line"
                  d="M0 160 C50 150 65 90 110 110 S170 145 210 95 S275 35 320 80 S385 125 430 60 S510 35 600 55"
                />
              </svg>
            </div>
            <div className="asset-row">
              <span>
                <i className="green" /> Solar field A
              </span>
              <b>6.4 MWh</b>
              <span>
                <i className="cyan" /> Wind array B
              </span>
              <b>8.9 MWh</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
