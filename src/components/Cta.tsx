
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-secondary/50"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-light mb-4">
                Ready to accelerate your <span className="text-primary font-normal">learning journey</span>?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join our exclusive early access program and be among the first to experience the future of AI-powered mentorship.
              </p>
              <div className="space-y-4">
                {[
                  "Personalized learning experience",
                  "Priority access to new features",
                  "Influence product development",
                  "Special early adopter pricing"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-sm">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" className="group" asChild>
                  <Link to="/payment">
                    Get Early Access
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white rounded-xl border border-border p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <div>
                      <p className="text-sm font-medium">Early Access</p>
                      <p className="text-xs text-muted-foreground">Limited availability</p>
                    </div>
                    <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full">
                      50% OFF
                    </div>
                  </div>
                  
                  <div className="flex items-baseline">
                    <span className="text-3xl font-medium">₹2,399</span>
                    <span className="text-muted-foreground ml-1 line-through text-sm">₹4,799</span>
                    <span className="text-xs text-muted-foreground ml-2">/month</span>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      "Full access to all AI mentors",
                      "Unlimited learning sessions",
                      "Career planning tools",
                      "Mock interviews & resume reviews",
                      "Priority support"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                        </svg>
                        <p className="text-xs">{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground italic">
                      * Early access pricing. Will increase when we launch.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 w-full h-full bg-primary/5 rounded-xl border border-primary/10 -z-10"></div>
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-primary/5 rounded-xl border border-primary/10 -z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
