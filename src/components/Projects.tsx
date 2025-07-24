import React from 'react';
import { ExternalLink, Github, Zap } from 'lucide-react';
import { useProjects } from '../hooks/useData';

const Projects: React.FC = () => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse text-cyber-blue text-xl">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-red-400 text-xl">Error loading projects: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute top-10 left-10 text-cyber-green/20 text-8xl font-light">
        プロジェクト
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="text-cyber-blue">Projects</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            A collection of cutting-edge applications that push the boundaries of technology and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative bg-cyber-gray border border-cyber-blue/20 rounded-xl overflow-hidden hover:border-cyber-pink/50 transition-all duration-300 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {project.featured && (
                <div className="absolute top-4 right-4 z-10 bg-cyber-pink/20 border border-cyber-pink rounded-full p-2">
                  <Zap className="text-cyber-pink" size={16} />
                </div>
              )}

              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-cyber-blue transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-cyber-gray-light">
                  <div className="flex space-x-4">
                    <a
                      href={project.demoUrl}
                      className="flex items-center space-x-2 text-cyber-blue hover:text-cyber-pink transition-colors duration-300"
                      aria-label={`View ${project.title} demo`}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center space-x-2 text-cyber-blue hover:text-cyber-pink transition-colors duration-300"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;