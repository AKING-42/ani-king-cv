import { ThemeToggle } from "@/components/ThemeToggle";
import { Timeline } from "@/components/Timeline";
import { Card } from "@/components/ui/card";
import nameLogo from "@/assets/name-logo.png";
import aboutMeHeading from "@/assets/about-me-heading.png";
import experienceEducationHeading from "@/assets/experience-education-heading.png";


const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 pt-16 pb-8">
        <div className="flex justify-center mb-1 handwritten-underline">
          <img
            src={nameLogo}
            alt="Anieshka King"
            className="h-24 md:h-28 w-auto dark:hidden"
            style={{ mixBlendMode: 'darken' }}
          />
          <img
            src={nameLogo}
            alt="Anieshka King"
            className="h-24 md:h-28 w-auto hidden dark:block invert"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>
        <p className="text-center text-muted-foreground text-xl">
          Resume
        </p>
      </header>

      {/* About Section */}
      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-start">
          {/* About Me Card */}
          <Card className="p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-4">
              <img
                src={aboutMeHeading}
                alt="About Me"
                className="h-12 w-auto dark:hidden"
                style={{ mixBlendMode: 'darken' }}
              />
              <img
                src={aboutMeHeading}
                alt="About Me"
                className="h-12 w-auto hidden dark:block invert"
                style={{ mixBlendMode: 'lighten' }}
              />
            </div>
            <p className="text-foreground/90 leading-relaxed">
              With experience across top-of-funnel marketing and legal market research, 
              underpinned by an exceptional academic foundation, I am adept at thinking 
              critically, building persuasive arguments and analyzing complex information. 
              Proactive about upskilling, I have completed courses across marketing verticals 
              to build both breadth and depth. In my current role, I go above and beyond, 
              acting on my initiative at every opportunity, from delivering an independent 
              research project to building a web tool to streamline workflows across our 
              90-strong UK/US research team.
            </p>
          </Card>

          {/* Profile Photo Placeholder */}
          <Card className="p-4 border-2 shadow-lg h-full flex items-center justify-center">
            <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-lg text-center">
                Profile Photo
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* Key Skills */}
      <section className="w-full py-8 border-y border-border/50">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4">
          {["SQE", "Python", "Storytelling", "Critical thinking", "Stakeholder management", "Excel"].map((skill, index, array) => (
            <div key={skill} className="flex items-center gap-4 md:gap-8">
              <span className="text-sm md:text-base font-medium uppercase tracking-wider text-foreground/80">
                {skill}
              </span>
              {index < array.length - 1 && (
                <span className="text-primary/40">•</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
          <img
            src={experienceEducationHeading}
            alt="Experience & Education"
            className="h-16 md:h-20 w-auto dark:hidden"
            style={{ mixBlendMode: 'darken' }}
          />
          <img
            src={experienceEducationHeading}
            alt="Experience & Education"
            className="h-16 md:h-20 w-auto hidden dark:block invert"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>
        <Timeline />
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p className="text-sm">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
