
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-md rotate-45 opacity-80"></div>
                <div className="absolute inset-1 bg-white rounded-sm rotate-45"></div>
                <div className="absolute inset-2 bg-primary/30 rounded-sm rotate-45"></div>
              </div>
              <span className="font-light text-xl tracking-tight">
                SkillNest
              </span>
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              AI-driven mentorship for skill mastery and career success.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Use Cases', 'Testimonials', 'Pricing'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              {['Terms', 'Privacy', 'Cookies', 'Licenses'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 sm:mb-0">
            © {year} SkillNest. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social, i) => (
              <a 
                key={i} 
                href="#" 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
