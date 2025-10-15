import { useEffect, useState } from "react";
import skillsMindmapImage from "@/assets/skills-mindmap.png";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";

export const SkillsMindmap = () => {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processImage = async () => {
      try {
        setIsProcessing(true);
        const img = await loadImage(skillsMindmapImage);
        const processedDataUrl = await removeBackground(img);
        setProcessedImage(processedDataUrl);
      } catch (error) {
        console.error('Failed to process image:', error);
        // Fallback to original image if processing fails
        setProcessedImage(skillsMindmapImage);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, []);

  return (
    <div className="py-12 max-w-5xl mx-auto">
      <h2 className="text-4xl font-handwritten font-bold text-center mb-12">
        Key Skills
      </h2>

      <div className="flex justify-center items-center min-h-[400px]">
        {isProcessing ? (
          <div className="text-muted-foreground font-handwritten text-lg">
            Processing mindmap...
          </div>
        ) : (
          <img
            src={processedImage || skillsMindmapImage}
            alt="Key Skills Mindmap"
            className="max-w-full h-auto rounded-lg shadow-lg"
            style={{ 
              filter: 'contrast(1.1) brightness(1.05)',
              maxHeight: '600px'
            }}
          />
        )}
      </div>
    </div>
  );
};
