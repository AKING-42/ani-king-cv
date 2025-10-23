import { useState } from "react";
import { ChevronDown, ChevronUp, Paperclip } from "lucide-react";
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

  return (
    <div className="relative max-w-4xl mx-auto py-4 sm:py-12">
      {/* String line - hidden on mobile, shown on larger screens */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-amber-800/60 via-amber-700/50 to-amber-800/60 shadow-sm" 
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)',
        }}
      />

      <div className="space-y-8 sm:space-y-12">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isExpanded = expandedItems.has(index);
          const nodeColor = item.type === "education" ? "education-node" : "work-node";

          return (
            <div
              key={index}
              className={`relative flex items-start ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col`}
            >
              {/* Card content - styled as paper */}
              <div className={`w-full md:w-[calc(50%-0.5rem)] ${isLeft ? "md:pr-8 md:text-right md:-translate-x-8" : "md:pl-8 md:text-left md:translate-x-8"} pl-8 md:pl-0`}>
                <div 
                  className="bg-card border border-border rounded-sm shadow-lg p-4 sm:p-6 relative overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: 'hsl(var(--card))',
                    backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent calc(100% - 1px), hsl(var(--border) / 0.3) calc(100% - 1px))',
                    backgroundSize: '100% 1.5rem',
                  }}
                >
                  {/* Paperclip on mobile */}
                  <Paperclip 
                    className="md:hidden absolute left-2 top-2 w-5 h-5 text-muted-foreground/40 rotate-45" 
                  />
                  
                  <h3 
                    className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold leading-tight tracking-tight"
                    style={{ color: `hsl(var(--${nodeColor}))` }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground font-medium">
                    {item.organization}
                    {item.location && `, ${item.location}`}
                  </p>
                  
                  {/* Date - mobile: below title, desktop: opposite side */}
                  <p className="md:hidden text-base sm:text-lg text-muted-foreground font-medium">
                    {item.dates}
                  </p>

                  {/* Folding card reveal for details */}
                  <div 
                    className="origin-top transition-all duration-700 ease-out overflow-hidden"
                    style={{
                      transform: isExpanded ? 'perspective(1000px) rotateX(0deg)' : 'perspective(1000px) rotateX(-90deg)',
                      transformStyle: 'preserve-3d',
                      height: isExpanded ? 'auto' : '0',
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <ul className={`mt-4 pt-4 border-t border-border/30 space-y-3 text-base sm:text-lg ${isLeft ? "md:text-right" : "md:text-left"} text-left`}>
                      {item.bullets.map((bullet, bulletIndex) => (
                        <li 
                          key={bulletIndex} 
                          className="text-foreground/80 leading-relaxed flex items-center gap-3"
                          style={{
                            flexDirection: isLeft ? 'row-reverse' : 'row'
                          }}
                        >
                          <span 
                            className="inline-block"
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
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleItem(index)}
                    className="mt-3 gap-2 text-xs sm:text-sm hover:bg-transparent font-medium min-h-[44px] md:min-h-0"
                    style={{ color: `hsl(var(--${nodeColor}))` }}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Fold
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Unfold
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Date on opposite side - desktop only */}
              <div className={`hidden md:block w-[calc(50%-0.5rem)] ${isLeft ? "pl-8 text-left md:translate-x-8" : "pr-8 text-right md:-translate-x-8"} transition-transform`}>
                <p className="text-base sm:text-lg text-muted-foreground font-medium pt-1">
                  {item.dates}
                </p>
              </div>

              {/* Paperclip at node - desktop only */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
                <Paperclip 
                  className="w-8 h-8 rotate-45 transition-all hover:scale-110"
                  style={{ 
                    color: `hsl(var(--${nodeColor}))`,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
