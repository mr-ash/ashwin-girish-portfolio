import { Reveal } from "./Reveal";

const EXPERIENCE = [
  {
    icon: "◇",
    role: "Associate UI/UX Designer",
    org: "Mewurk Technologies · Bengaluru",
    description:
      "Designed HRMS modules across web and mobile, ran user interviews, and drove product enhancements that lifted usability and satisfaction — owning research through high-fidelity delivery.",
    when: "Jul 2023 — 2025",
  },
  {
    icon: "T",
    role: "UI/UX Designer Intern",
    org: "Tatos Technologies · Kerala",
    description:
      "Researched and designed a news application and a CRM website for schools — the full UX process from research to prototyping — alongside marketing design for outreach.",
    when: "Aug — Dec 2021",
  },
];

export function Experience() {
  return (
    <section className="wrap" id="experience">
      <Reveal className="sec-head">
        <h2 className="sec-title">Experience</h2>
        <span className="sec-note">Layers · 2</span>
      </Reveal>
      <Reveal className="layers">
        <div className="layers-bar">Pages / Career</div>
        {EXPERIENCE.map((item) => (
          <div className="layer" key={item.role}>
            <span className="layer-ico">{item.icon}</span>
            <div>
              <div className="layer-role">{item.role}</div>
              <div className="layer-org">{item.org}</div>
              <p>{item.description}</p>
            </div>
            <span className="layer-when">{item.when}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
