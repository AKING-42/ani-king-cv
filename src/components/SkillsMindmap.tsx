import skillsMindmapImage from "@/assets/skills-mindmap.png";

export const SkillsMindmap = () => {
  return (
    <div className="py-12 max-w-5xl mx-auto">
      <h2 className="text-4xl font-handwritten font-bold text-center mb-12">
        Key Skills
      </h2>

      <div className="flex justify-center items-center">
        <img
          src={skillsMindmapImage}
          alt="Key Skills Mindmap"
          className="max-w-full h-auto dark:hidden"
          style={{ 
            maxHeight: '500px',
            mixBlendMode: 'darken'
          }}
        />
        <img
          src={skillsMindmapImage}
          alt="Key Skills Mindmap"
          className="max-w-full h-auto hidden dark:block invert"
          style={{ 
            maxHeight: '500px',
            mixBlendMode: 'lighten'
          }}
        />
      </div>
    </div>
  );
};
