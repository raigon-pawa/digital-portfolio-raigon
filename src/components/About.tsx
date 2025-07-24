import React from 'react';
import { Code, Palette, Zap, Brain } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    {
      category: 'Frontend Development',
      icon: Code,
      technologies: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Three.js'],
      color: 'cyber-blue'
    },
    {
      category: 'Backend Development',
      icon: Zap,
      technologies: ['Node.js', 'Python', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis'],
      color: 'cyber-green'
    },
    {
      category: 'Design & Creative',
      icon: Palette,
      technologies: ['Figma', 'Adobe Creative Suite', 'Blender', 'After Effects', 'UI/UX Design'],
      color: 'cyber-pink'
    },
    {
      category: 'AI & Machine Learning',
      icon: Brain,
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Computer Vision', 'NLP'],
      color: 'cyber-purple'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="absolute top-10 left-1/4 text-cyber-pink/20 text-5xl font-light">
        アバウト
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Avatar and Info */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                {/* Cyberpunk Avatar Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 via-cyber-purple/20 to-cyber-pink/20 rounded-lg border border-cyber-blue/30 flex items-center justify-center">
                  <div className="text-center text-cyber-blue">
                    <div className="text-8xl mb-4">サイバー</div>
                    <div className="text-lg">Cyberpunk Avatar</div>
                    <div className="text-sm text-gray-400 mt-2">AI Generated Portrait</div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-cyber-pink rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-cyber-green rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            <div className="text-center lg:text-left space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Digital <span className="text-cyber-blue">Architect</span>
              </h2>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Greetings, fellow digital wanderer. I'm a full-stack developer and digital artist 
                  who thrives at the intersection of cutting-edge technology and creative expression.
                </p>
                <p>
                  With over 5 years of experience crafting immersive digital experiences, I specialize 
                  in building applications that not only function flawlessly but also inspire and engage users 
                  through innovative design and seamless interactions.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring the latest in AI technology, 
                  creating digital art, or diving deep into cyberpunk literature and aesthetics.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-blue">50+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-green">5+</div>
                  <div className="text-sm text-gray-400">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-pink">100K+</div>
                  <div className="text-sm text-gray-400">Lines of Code</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white text-center lg:text-left">
              Technical <span className="text-cyber-purple">Arsenal</span>
            </h3>

            <div className="grid gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.category}
                  className={`group bg-cyber-gray border border-${skill.color}/20 rounded-xl p-6 hover:border-${skill.color}/50 transition-all duration-300`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 bg-${skill.color}/10 border border-${skill.color}/20 rounded-lg`}>
                      <skill.icon className={`text-${skill.color}`} size={24} />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h4 className={`text-lg font-semibold text-white group-hover:text-${skill.color} transition-colors duration-300`}>
                        {skill.category}
                      </h4>
                      
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 text-xs bg-${skill.color}/10 text-${skill.color} border border-${skill.color}/20 rounded-full hover:bg-${skill.color}/20 transition-colors duration-300`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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