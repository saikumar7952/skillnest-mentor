
import { useState } from 'react';
import FeatureItem from './features/FeatureItem';
import FeatureDetail from './features/FeatureDetail';
import { featuresData } from './features/featuresData';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
  };

  return (
    <section id="features" className="section bg-secondary">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-medium text-primary">KEY FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            AI-Powered Tools for Your <span className="text-primary font-normal">Learning Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-balance">
            SkillNest combines cutting-edge AI technologies to create a comprehensive learning and career development ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-4">
            {featuresData.map((feature, index) => (
              <FeatureItem 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                active={activeFeature === index}
                onClick={handleFeatureClick}
                index={index}
              />
            ))}
          </div>
          
          <div className="lg:col-span-3 min-h-[350px] relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white rounded-xl border border-border p-8">
              <FeatureDetail feature={featuresData[activeFeature]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
