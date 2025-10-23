import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineItem {
  type: "education" | "experience";
  title: string;
  organization: string;
  location?: string;
  dates: string;
  bullets: string[];
}

const timelineData: TimelineItem[] = [
  {
    type: "experience",
    title: "Senior Research Analyst",
    organization: "Chambers and Partners",
    location: "London",
    dates: "Oct 2024 – Present",
    bullets: [
      "Interviewing 100+ lawyers and in-house counsel per month, drawing out nuanced insights into the legal market",
      "Creating firm and lawyer rankings that are crucial for brand perception of global law firms, through analysing complex data",
      "Building and maintaining strong relationships with senior stakeholders at law firms",
      "Consistently exceeding monthly call number target by 60% on average and working 2-3 days ahead of deadlines on other workflows",
      "Spearheaded independent research into market gaps, just three months into my role, using unfamiliar research tools, building an interview pipeline, creating interview scripts and presenting actionable recommendations",
      "Awarded the company-wide Quarterly Core Values Award by our CEO for my work on above task, for independently 'driving innovation' and 'being customer centric'",
      "Handpicked to edit UK section rankings – a responsibility typically reserved for colleagues two levels more senior",
      "Built and deployed a web-based tool to streamline email template management, enhancing accessibility and efficiency across UK/US team (~90 researchers)",
      "Mentored a new researcher, providing hands-on training on internal systems and research best practices"
    ]
  },
  {
    type: "education",
    title: "Online courses/certifications",
    organization: "",
    location: "",
    dates: "Jul 2025 – Oct 2025",
    bullets: [
      "Digital Marketing Foundations (LinkedIn Learning)",
      "Introduction to Data for Decision Makers (BCG X, via Forage)",
      "The ADcademy, Research and Strategy (Brixton Finishing School)",
      "Learn SQL Course (Codecademy)"
    ]
  },
  {
    type: "education",
    title: "BA in English Language and Literature: First Class",
    organization: "University of Oxford",
    location: "",
    dates: "Oct 2021 – Oct 2024",
    bullets: [
      "Choral and Academic scholarship holder",
      "Oriel College boat club – rowed in women's 2nd boat",
      "Member of various musical ensembles and contributor to leading student magazines"
    ]
  },
  {
    type: "experience",
    title: "Fiction Team Director",
    organization: "The Isis Magazine, Oxford",
    location: "",
    dates: "Oct 2022 – Jun 2023",
    bullets: [
      "Co-ordinated an 8-person team, arranging weekly meetings and ensuring internal deadlines were met by all members",
      "Curated and refined content to maintain consistent editorial identity and uphold the magazine's distinctive voice",
      "Proofread pieces during lay-in, ensuring they aligned with house style, balancing speed, accuracy and attention to detail"
    ]
  },
  {
    type: "experience",
    title: "Editorial Intern",
    organization: "Edward Elgar Publishing",
    location: "Cheltenham",
    dates: "Jul 2022 – Aug 2022",
    bullets: [
      "Crafted engaging copy in the form of blurbs for research handbooks and textbooks, used for both digital and print publication with few changes being made"
    ]
  },
  {
    type: "experience",
    title: "Marketing Assistant",
    organization: "Cheltenham Lifestyle and Business",
    location: "Cheltenham",
    dates: "Jul 2021 – Aug 2021",
    bullets: [
      "Assisted business founder with top of funnel initiatives",
      "Liaised with clients to refresh visual and written assets to strengthen brand identity and improve digital presence",
      "Designed webpages for clients in a broad range of industries to increase brand awareness",
      "Crafted captions for scheduled Instagram, Facebook and LinkedIn posts"
    ]
  }
];

export const Timeline = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const progress = (viewportCenter - rect.top) / rect.height;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getCardTransform = (index: number) => {
    const totalCards = timelineData.length;
    const anglePerCard = 360 / totalCards;
    const baseAngle = index * anglePerCard;
    const rotation = scrollProgress * 360 * 2;
    const currentAngle = baseAngle - rotation;
    
    const radius = 280;
    const x = Math.sin((currentAngle * Math.PI) / 180) * radius;
    const z = Math.cos((currentAngle * Math.PI) / 180) * radius;
    
    const cardRotation = -currentAngle;
    const tilt = Math.sin((currentAngle * Math.PI) / 180) * 15;
    
    const normalizedAngle = ((currentAngle % 360) + 360) % 360;
    const isFront = normalizedAngle > 90 && normalizedAngle < 270;
    const distanceFromCenter = Math.abs(normalizedAngle - 180);
    const opacity = isFront ? Math.max(0.3, 1 - distanceFromCenter / 180) : 0.1;
    const scale = isFront ? Math.max(0.7, 1 - distanceFromCenter / 400) : 0.5;
    
    return {
      transform: `translate3d(${x}px, 0, ${z}px) rotateY(${cardRotation}deg) rotateX(${tilt}deg) scale(${scale})`,
      opacity,
      zIndex: Math.round((1 - distanceFromCenter / 180) * 100),
    };
  };

  return (
    <div ref={containerRef} className="relative min-h-[300vh] py-20">
      {/* Binder rings */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12 pointer-events-none z-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-16 h-20 rounded-full border-8 border-muted-foreground/30"
            style={{
              transform: `rotateX(75deg) rotateY(${scrollProgress * 360 * 2}deg)`,
              boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted-foreground) / 0.1) 100%)',
            }}
          />
        ))}
      </div>

      {/* Cards container */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
          transformStyle: 'preserve-3d',
        }}
      >
        {timelineData.map((item, index) => {
          const isExpanded = expandedItems.has(index);
          const cardStyle = getCardTransform(index);
          const nodeColor = item.type === "education" ? "education-node" : "work-node";

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] transition-all duration-300"
              style={{
                ...cardStyle,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Index card */}
              <div
                className="relative bg-card rounded-lg shadow-2xl transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)',
                  boxShadow: `
                    0 10px 40px rgba(0,0,0,0.2),
                    0 2px 8px rgba(0,0,0,0.1),
                    inset 0 1px 0 rgba(255,255,255,0.5)
                  `,
                  border: '1px solid hsl(var(--border))',
                  transformStyle: 'preserve-3d',
                  transform: isExpanded ? 'rotateX(-10deg)' : 'rotateX(0deg)',
                }}
              >
                {/* Binder holes */}
                <div className="absolute top-8 left-0 flex flex-col gap-6 -translate-x-1/2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-background border-2 border-border"
                      style={{
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    />
                  ))}
                </div>

                {/* Card content */}
                <div className="p-8 pl-12">
                  <div
                    className="inline-block px-2 py-1 mb-2 text-xs rounded"
                    style={{
                      backgroundColor: `hsl(var(--${nodeColor}) / 0.15)`,
                      color: `hsl(var(--${nodeColor}))`,
                      border: `1px solid hsl(var(--${nodeColor}) / 0.3)`,
                    }}
                  >
                    {item.type}
                  </div>

                  <h3
                    className="font-handwritten text-2xl font-bold mb-2 leading-tight"
                    style={{ color: `hsl(var(--${nodeColor}))` }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-base text-muted-foreground font-medium mb-1">
                    {item.organization}
                    {item.location && `, ${item.location}`}
                  </p>

                  <p className="text-sm text-muted-foreground font-medium mb-4">
                    {item.dates}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleItem(index)}
                    className="gap-2 text-sm font-medium"
                    style={{ color: `hsl(var(--${nodeColor}))` }}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Fold Up
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Unfold Details
                      </>
                    )}
                  </Button>
                </div>

                {/* Expandable details - folds down */}
                <div
                  className="overflow-hidden transition-all duration-500 origin-top"
                  style={{
                    maxHeight: isExpanded ? '600px' : '0',
                    transform: isExpanded ? 'rotateX(0deg) translateZ(20px)' : 'rotateX(-90deg) translateZ(0px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="px-8 pb-8 pl-12 pt-4"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, hsl(var(--muted) / 0.3) 100%)',
                      borderTop: `1px dashed hsl(var(--${nodeColor}) / 0.3)`,
                    }}
                  >
                    <ul className="space-y-3">
                      {item.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="text-sm text-foreground/80 leading-relaxed flex items-start gap-3"
                        >
                          <span
                            className="inline-block mt-2"
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: `hsl(var(--${nodeColor}))`,
                              flexShrink: 0,
                            }}
                          />
                          <span className="flex-1">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm pointer-events-none">
        Scroll to rotate the binder
      </div>
    </div>
  );
};
