import skillsMindmapImage from "@/assets/skills-mindmap.png";

export const SkillsMindmap = () => {
  return (
    <div className="py-12 max-w-5xl mx-auto">
      <h2 className="text-4xl font-handwritten font-bold text-center mb-12">
        Key Skills
      </h2>

      <div className="flex justify-center items-center">
        <div className="relative rounded-lg p-8 bg-card/50 backdrop-blur-sm border-2 border-border shadow-lg">
          <img
            src={skillsMindmapImage}
            alt="Key Skills Mindmap"
            className="max-w-full h-auto dark:brightness-90 dark:invert"
            style={{ 
              maxHeight: '500px',
              mixBlendMode: 'multiply'
            }}
          />
        </div>
      </div>
    </div>
  );
};
