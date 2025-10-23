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
  const [, setTick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const progress = -rect.top / (rect.height - window.innerHeight);
          setScrollProgress(Math.max(0, Math.min(1, progress)));
        }
        setTick(prev => prev + 1);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const getHelixTransform = (index: number) => {
    if (!itemRefs.current[index]) return {};
    
    const rect = itemRefs.current[index]?.getBoundingClientRect();
    if (!rect) return {};
    
    const viewportHeight = window.innerHeight;
    const itemCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    
    // Normalized position (-1 to 1, where 0 is center)
    const normalizedPos = (itemCenter - viewportCenter) / viewportHeight;
    
    // Double helix parameters
    const helixRadius = 150; // Radius of the spiral
    const helixHeight = index * 180; // Vertical spacing
    const totalItems = timelineData.length;
    const angle = (index / totalItems) * Math.PI * 4 + scrollProgress * Math.PI * 2; // Multiple rotations + scroll rotation
    
    // Determine which helix strand (alternating)
    const isLeftStrand = index % 2 === 0;
    const strandAngle = angle + (isLeftStrand ? 0 : Math.PI); // Offset second strand by 180°
    
    // Calculate helix position
    const x = Math.cos(strandAngle) * helixRadius;
    const z = Math.sin(strandAngle) * helixRadius - 300; // Base Z offset
    const y = -helixHeight + normalizedPos * 200; // Ascend with scroll
    
    // Distance-based effects (proximity to center)
    const distanceFromCenter = Math.abs(normalizedPos);
    const proximityFactor = 1 - Math.min(distanceFromCenter, 1);
    
    // Scale: closer items are larger
    const scale = 0.5 + proximityFactor * 0.7;
    
    // Opacity & glow: fade distant items
    const opacity = 0.2 + proximityFactor * 0.8;
    const blur = distanceFromCenter * 3;
    const glowIntensity = proximityFactor * 30;
    
    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      boxShadow: `0 0 ${glowIntensity}px ${glowIntensity / 2}px currentColor`,
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[400vh] py-32 overflow-visible"
      style={{
        perspective: '1500px',
        perspectiveOrigin: 'center center',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Helix scaffold container */}
      <div 
        className="sticky top-0 left-0 right-0 h-screen flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >

        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${scrollProgress * 60}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {timelineData.map((item, index) => {
            const isExpanded = expandedItems.has(index);
            const nodeColor = item.type === "education" ? "education-node" : "work-node";
            
            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className="absolute"
                style={{
                  ...getHelixTransform(index),
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, opacity, filter',
                  pointerEvents: 'auto',
                  color: `hsl(var(--${nodeColor}))`,
                }}
              >
                {/* Glowing constellation node */}
                <div 
                  className="relative"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Central glow orb */}
                  <div
                    className="absolute -left-4 top-0 w-8 h-8 rounded-full border-2 border-current shadow-lg"
                    style={{
                      backgroundColor: `hsl(var(--${nodeColor}))`,
                      boxShadow: `0 0 20px 4px hsl(var(--${nodeColor}) / 0.6), inset 0 0 10px hsl(var(--${nodeColor}) / 0.8)`,
                      transform: 'translateZ(20px)',
                    }}
                  />
                  
                  {/* Content card */}
                  <div 
                    className="bg-background/95 backdrop-blur-sm border border-current/20 rounded-lg p-4 min-w-[280px] max-w-[400px] shadow-2xl"
                    style={{
                      transform: 'translateZ(30px)',
                      boxShadow: `0 8px 32px -8px hsl(var(--${nodeColor}) / 0.3)`,
                    }}
                  >
                    <div className="space-y-2">
                      <h3 
                        className="font-serif text-lg font-bold leading-tight"
                        style={{ color: `hsl(var(--${nodeColor}))` }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {item.organization}
                        {item.location && `, ${item.location}`}
                      </p>
                      <p className="text-sm text-muted-foreground/80 font-medium">
                        {item.dates}
                      </p>

                      {isExpanded && (
                        <ul className="mt-3 space-y-2 text-sm">
                          {item.bullets.map((bullet, bulletIndex) => (
                            <li 
                              key={bulletIndex} 
                              className="text-foreground/70 leading-relaxed flex items-start gap-2"
                            >
                              <span 
                                className="inline-block mt-1.5"
                                style={{
                                  width: '4px',
                                  height: '4px',
                                  borderRadius: '50%',
                                  backgroundColor: `hsl(var(--${nodeColor}))`,
                                  flexShrink: 0
                                }}
                              />
                              <span className="flex-1">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(index);
                        }}
                        className="mt-3 gap-2 text-xs hover:bg-transparent font-medium relative z-50 cursor-pointer w-full"
                        style={{ 
                          color: `hsl(var(--${nodeColor}))`,
                          pointerEvents: 'auto',
                        }}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            Show Details
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
