
import { cn } from '@/lib/utils';
import { Brain, UserIcon, LightbulbIcon } from 'lucide-react';

const About = () => {
  const advantages = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI-First Approach",
      description: "Real-time learning adaptation and personalized content delivery powered by advanced machine learning models."
    },
    {
      icon: <UserIcon className="h-5 w-5" />,
      title: "Multi-Agent System",
      description: "A team of specialized AI mentors with domain expertise in different aspects of learning and career development."
    },
    {
      icon: <LightbulbIcon className="h-5 w-5" />,
      title: "End-to-End Growth",
      description: "Seamless integration of learning materials, skill development, and career guidance in one comprehensive platform."
    }
  ];
  
  return (
    <section id="about" className="section bg-secondary">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-medium text-primary">OUR VISION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Revolutionizing Learning with <span className="text-primary font-normal">AI Mentorship</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-balance">
            We're building a future where personalized AI mentorship accelerates learning and career growth for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Abstract shape backgrounds */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full mix-blend-multiply filter blur-md animate-morphing-blur"></div>
              <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full mix-blend-multiply filter blur-md animate-morphing-blur animation-delay-400"></div>
              
              {/* Central element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform rotate-45"></div>
                  <div className="absolute inset-[15%] bg-primary/5 rounded-xl transform rotate-45 border border-primary/10"></div>
                  <div className="absolute inset-[30%] bg-white rounded-lg shadow-sm transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-primary text-4xl font-light">SkillNest</div>
                  </div>
                </div>
              </div>
              
              {/* Orbital elements */}
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className={cn(
                    "absolute w-full h-full rounded-full border border-primary/10",
                    "animate-[spin_20s_linear_infinite]",
                    i === 1 ? "animation-delay-200 border-dashed" : "",
                    i === 2 ? "animation-delay-400" : ""
                  )}
                  style={{ 
                    transform: `rotate(${i * 45}deg)`,
                    width: `${100 - i * 10}%`, 
                    height: `${100 - i * 10}%`,
                    top: `${i * 5}%`,
                    left: `${i * 5}%`
                  }}
                >
                  <div 
                    className="absolute w-3 h-3 bg-primary/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      top: "0%", 
                      left: "50%",
                      boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-light mb-4">Our Approach</h3>
            <p className="text-muted-foreground mb-6">
              SkillNest was founded on the belief that traditional one-size-fits-all education fails to unlock each person's unique potential. We've built an AI mentorship platform that adapts to your individual learning style, goals, and pace.
            </p>
            <p className="text-muted-foreground mb-8">
              By combining cutting-edge artificial intelligence with educational best practices, we create a learning experience that's as effective as working with a team of expert human mentors – but accessible anytime, anywhere.
            </p>
            
            <div className="space-y-6">
              {advantages.map((advantage, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-md">
                    {advantage.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">{advantage.title}</h4>
                    <p className="text-muted-foreground text-sm">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
