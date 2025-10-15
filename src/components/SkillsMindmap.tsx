import { Card } from "@/components/ui/card";

interface SkillCategory {
  name: string;
  skills: string[];
  color: string;
}

const skillsData: SkillCategory[] = [
  {
    name: "Data",
    skills: ["SQL", "Excel", "Python"],
    color: "hsl(var(--primary))"
  },
  {
    name: "Creative",
    skills: ["Storytelling", "Photography"],
    color: "hsl(var(--accent))"
  },
  {
    name: "General",
    skills: ["Stakeholder management", "Competitive analysis"],
    color: "hsl(var(--work-node))"
  }
];

export const SkillsMindmap = () => {
  return (
    <div className="py-12 max-w-5xl mx-auto">
      <h2 className="text-4xl font-handwritten font-bold text-center mb-12">
        Key Skills
      </h2>

      <div className="relative flex flex-wrap justify-center gap-8 items-start">
        {/* Central node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-xl z-10 border-4 border-background">
          <span className="text-primary-foreground font-handwritten font-bold text-lg text-center">
            Skills
          </span>
        </div>

        {skillsData.map((category, categoryIndex) => {
          const angle = (categoryIndex * 120 - 90) * (Math.PI / 180);
          const radius = 200;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={category.name}
              className="relative z-20"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              <Card className="p-4 min-w-[200px] border-2 hover:shadow-lg transition-all duration-300">
                <h3
                  className="font-handwritten text-xl font-semibold mb-3 pb-2 border-b-2"
                  style={{ borderColor: category.color, color: category.color }}
                >
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-sm flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Connecting line to center */}
              <svg
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  width: Math.abs(x) + 100,
                  height: Math.abs(y) + 100,
                  transform: `translate(${x > 0 ? '-100%' : '0'}, ${y > 0 ? '-100%' : '0'})`
                }}
              >
                <line
                  x1={x > 0 ? '100%' : '0'}
                  y1={y > 0 ? '100%' : '0'}
                  x2={x > 0 ? '0' : '100%'}
                  y2={y > 0 ? '0' : '100%'}
                  stroke={category.color}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
