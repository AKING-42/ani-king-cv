import { ThemeToggle } from "@/components/ThemeToggle";
import { Timeline } from "@/components/Timeline";
import { SkillsMindmap } from "@/components/SkillsMindmap";
import { Card } from "@/components/ui/card";
import nameLogo from "@/assets/name-logo.png";


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
            <h2 className="text-3xl font-serif font-semibold mb-4">
              About Me
            </h2>
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
          <Card className="p-4 border-2 shadow-lg aspect-square flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-lg text-center">
                Profile Photo
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-5xl font-serif font-bold text-center mb-12">
          Experience & Education
        </h2>
        <Timeline />
      </section>

      {/* Skills Mindmap */}
      <section className="container mx-auto px-4 py-12">
        <SkillsMindmap />
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
