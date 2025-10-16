import { useState, useEffect } from "react";
import magicHat from "@/assets/magic-hat.png";

const cvExperiences = [
  "Interviewing 100+ lawyers and in-house counsel per month, drawing out nuanced insights into the legal market",
  "Creating firm and lawyer rankings that are crucial for brand perception of global law firms, through analysing complex data",
  "Building and maintaining strong relationships with senior stakeholders at law firms",
  "Consistently exceeding monthly call number target by 60% on average and working 2-3 days ahead of deadlines on other workflows",
  "Spearheaded independent research into market gaps, just three months into my role, using unfamiliar research tools, building an interview pipeline, creating interview scripts and presenting actionable recommendations",
  "Awarded the company-wide Quarterly Core Values Award by our CEO for my work on above task, for independently 'driving innovation' and 'being customer centric'",
  "Handpicked to edit UK section rankings – a responsibility typically reserved for colleagues two levels more senior",
  "Built and deployed a web-based tool to streamline email template management, enhancing accessibility and efficiency across UK/US team (~90 researchers)",
  "Mentored a new researcher, providing hands-on training on internal systems and research best practices",
  "Co-ordinated an 8-person team, arranging weekly meetings and ensuring internal deadlines were met by all members",
  "Curated and refined content to maintain consistent editorial identity and uphold the magazine's distinctive voice",
  "Proofread pieces during lay-in, ensuring they aligned with house style, balancing speed, accuracy and attention to detail",
  "Crafted engaging copy in the form of blurbs for research handbooks and textbooks, used for both digital and print publication with few changes being made",
  "Assisted business founder with top of funnel initiatives",
  "Liaised with clients to refresh visual and written assets to strengthen brand identity and improve digital presence",
  "Designed webpages for clients in a broad range of industries to increase brand awareness",
  "Crafted captions for scheduled Instagram, Facebook and LinkedIn posts",
  "Commissioned to create posters for a local café",
  "Doing freelance singing, mainly for film scores",
  "Volunteering at Hampstead Heath to help the public engage with nature and raise money for Heath Hands",
  "Consistently winning at Bananagrams (wait, that wasn't meant to be in here)",
];

export const MagicHat = () => {
  const [randomExperience, setRandomExperience] = useState<string>("");
  const [isShrinking, setIsShrinking] = useState(false);

  const bananagramsExperience = "Consistently winning at Bananagrams (wait, that wasn't meant to be in here)";

  const pullRandomExperience = () => {
    setIsShrinking(false);
    const randomIndex = Math.floor(Math.random() * cvExperiences.length);
    setRandomExperience(cvExperiences[randomIndex]);
  };

  useEffect(() => {
    if (randomExperience === bananagramsExperience) {
      const shrinkTimer = setTimeout(() => {
        setIsShrinking(true);
      }, 5000);

      const clearTimer = setTimeout(() => {
        setRandomExperience("");
        setIsShrinking(false);
      }, 5500);

      return () => {
        clearTimeout(shrinkTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [randomExperience]);

  return (
    <section className="w-full py-8 sm:py-12 border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="flex flex-col items-center gap-6">
          {/* Random experience display */}
          {randomExperience && (
            <div className={`w-full ${isShrinking ? "animate-scale-out" : "animate-fade-in"}`}>
              <p className="text-foreground/80 leading-relaxed text-base sm:text-lg text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                {randomExperience}
              </p>
            </div>
          )}

          {/* Hat and instruction */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button
            onClick={pullRandomExperience}
            className="focus:outline-none rounded-full"
            aria-label="Pull random experience from CV"
          >
              <img
                src={magicHat}
                alt="Magic Hat"
                className="h-24 w-24 sm:h-32 sm:w-32 dark:hidden transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                style={{ mixBlendMode: "darken" }}
              />
              <img
                src={magicHat}
                alt="Magic Hat"
                className="h-24 w-24 sm:h-32 sm:w-32 hidden dark:block invert transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                style={{ mixBlendMode: "lighten" }}
              />
            </button>
            <p className="text-foreground/80 text-base sm:text-lg font-medium text-center sm:text-left">
              Click the hat to pull out a random experience from my CV (and a few that didn't make it on there)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
