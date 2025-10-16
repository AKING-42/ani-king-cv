import { ThemeToggle } from "@/components/ThemeToggle";
import { Timeline } from "@/components/Timeline";
import { Card } from "@/components/ui/card";
import nameLogo from "@/assets/name-logo.png";
import aboutMeHeading from "@/assets/about-me-heading.png";
import experienceEducationHeading from "@/assets/experience-education-heading.png";
import keySkillsHeading from "@/assets/key-skills-heading.png";
import interestsHeading from "@/assets/interests-heading.png";
import profilePhoto from "@/assets/profile-photo.jpg";


const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Theme Toggle - Fixed position with larger touch target on mobile */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="flex justify-center mb-1 handwritten-underline">
          <img
            src={nameLogo}
            alt="Anieshka King"
            className="h-20 sm:h-24 md:h-28 w-auto dark:hidden"
            style={{ mixBlendMode: 'darken' }}
          />
          <img
            src={nameLogo}
            alt="Anieshka King"
            className="h-20 sm:h-24 md:h-28 w-auto hidden dark:block invert"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>
        <p className="text-center text-muted-foreground text-lg sm:text-xl">
          Resume
        </p>
      </header>

      {/* About Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        <div className="grid md:grid-cols-[2fr,1fr] gap-6 sm:gap-8 items-stretch">
          {/* About Me Card */}
          <Card className="p-5 sm:p-6 border-2 border-primary shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            <div className="mb-4">
              <img
                src={aboutMeHeading}
                alt="About Me"
                className="h-10 sm:h-12 w-auto dark:hidden"
                style={{ mixBlendMode: 'darken' }}
              />
              <img
                src={aboutMeHeading}
                alt="About Me"
                className="h-10 sm:h-12 w-auto hidden dark:block invert"
                style={{ mixBlendMode: 'lighten' }}
              />
            </div>
            <p className="text-foreground/90 leading-relaxed text-base sm:text-lg">
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
          <Card className="p-4 border-2 border-primary shadow-lg h-full flex items-center justify-center order-first md:order-last">
            <div className="w-full aspect-square rounded-lg overflow-hidden">
              <img
                src={profilePhoto}
                alt="Anieshka King - Profile Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Key Skills */}
      <section className="w-full py-6 sm:py-8 border-y border-border/50">
        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            src={keySkillsHeading}
            alt="Key Skills"
            className="h-8 sm:h-10 md:h-12 w-auto dark:hidden"
            style={{ mixBlendMode: 'darken' }}
          />
          <img
            src={keySkillsHeading}
            alt="Key Skills"
            className="h-8 sm:h-10 md:h-12 w-auto hidden dark:block invert"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-6 px-4 sm:px-6">
          {["SQE", "Python", "Storytelling", "Critical thinking", "Stakeholder management", "Excel"].map((skill, index, array) => (
            <div key={skill} className="flex items-center gap-2 sm:gap-3 md:gap-6">
              <span className="text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider text-foreground/80 whitespace-nowrap transition-transform duration-200 hover:scale-110 cursor-default">
                {skill}
              </span>
              {index < array.length - 1 && (
                <span className="text-primary/40 hidden sm:inline">•</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex justify-center mb-8 sm:mb-12">
          <img
            src={experienceEducationHeading}
            alt="Experience & Education"
            className="h-12 sm:h-16 md:h-20 w-auto dark:hidden"
            style={{ mixBlendMode: 'darken' }}
          />
          <img
            src={experienceEducationHeading}
            alt="Experience & Education"
            className="h-12 sm:h-16 md:h-20 w-auto hidden dark:block invert"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>
        <Timeline />
      </section>


      {/* Interests */}
      <section className="w-full py-6 sm:py-8 border-t border-border/50">
        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            src={interestsHeading}
            alt="Interests"
            className="h-8 sm:h-10 md:h-12 w-auto dark:hidden"
            style={{ mixBlendMode: 'darken' }}
          />
          <img
            src={interestsHeading}
            alt="Interests"
            className="h-8 sm:h-10 md:h-12 w-auto hidden dark:block invert"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-6 px-4 sm:px-6">
          {["Conservation volunteering", "Freelance art and singing", "French learning (started podcast)", "Tennis", "Hiking"].map((interest, index, array) => (
            <div key={interest} className="flex items-center gap-2 sm:gap-3 md:gap-6">
              <span className="text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider text-foreground/80 whitespace-nowrap transition-transform duration-200 hover:scale-110 cursor-default">
                {interest}
              </span>
              {index < array.length - 1 && (
                <span className="text-primary/40 hidden sm:inline">•</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center text-muted-foreground">
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
