import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  ExternalLink,
  Github,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import AdminHeader from '../AdminHeader';
import { useAdmin } from '../../../contexts/AdminContext';
import { Project } from '../../../types/admin';

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

const ProjectsManagement: React.FC = () => {
  const { state, dispatch } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      description: '',
      technologies: '',
      image: '',
      demoUrl: '',
      githubUrl: '',
      featured: false
    }
  });

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      reset({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
        image: project.image,
        demoUrl: project.demoUrl,
        githubUrl: project.githubUrl,
        featured: project.featured
      });
    } else {
      setEditingProject(null);
      reset({
        title: '',
        description: '',
        technologies: '',
        image: '',
        demoUrl: '',
        githubUrl: '',
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    reset();
  };

  const onSubmit = (data: ProjectFormData) => {
    const now = new Date().toISOString();
    const project: Project = {
      id: editingProject?.id || `project_${Date.now()}`,
      title: data.title,
      description: data.description,
      technologies: data.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      image: data.image || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      featured: data.featured,
      order: editingProject?.order || state.projects.length,
      createdAt: editingProject?.createdAt || now,
      updatedAt: now
    };

    if (editingProject) {
      dispatch({ type: 'UPDATE_PROJECT', payload: project });
    } else {
      dispatch({ type: 'ADD_PROJECT', payload: project });
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      dispatch({ type: 'DELETE_PROJECT', payload: id });
    }
  };

  const toggleFeatured = (project: Project) => {
    const updatedProject = { ...project, featured: !project.featured, updatedAt: new Date().toISOString() };
    dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });
  };

  return (
    <div className="flex-1 overflow-auto">
      <AdminHeader 
        title="Projects Management" 
        subtitle={`Manage your ${state.projects.length} portfolio projects`}
      />
      
      <div className="p-6">
        {/* Add New Project Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyber-gray border border-cyber-blue/20 rounded-lg p-4">
              <h3 className="text-cyber-blue text-sm font-medium">Total Projects</h3>
              <p className="text-2xl font-bold text-white">{state.projects.length}</p>
            </div>
            <div className="bg-cyber-gray border border-cyber-pink/20 rounded-lg p-4">
              <h3 className="text-cyber-pink text-sm font-medium">Featured</h3>
              <p className="text-2xl font-bold text-white">
                {state.projects.filter(p => p.featured).length}
              </p>
            </div>
            <div className="bg-cyber-gray border border-cyber-green/20 rounded-lg p-4">
              <h3 className="text-cyber-green text-sm font-medium">Technologies</h3>
              <p className="text-2xl font-bold text-white">
                {new Set(state.projects.flatMap(p => p.technologies)).size}
              </p>
            </div>
          </div>

          <button
            onClick={() => openModal()}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-cyber text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
          >
            <Plus size={18} />
            <span>Add Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        {state.projects.length === 0 ? (
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-8 text-center">
            <div className="text-gray-400 mb-4">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>No projects found.</p>
              <p className="text-sm">Create your first project to get started!</p>
            </div>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-cyber text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              <Plus size={18} />
              <span>Create First Project</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.projects.map((project) => (
              <div
                key={project.id}
                className="bg-cyber-gray border border-cyber-blue/20 rounded-xl overflow-hidden hover:border-cyber-pink/50 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-cyber-pink/20 border border-cyber-pink rounded-full p-2">
                      <Star className="text-cyber-pink h-4 w-4" />
                    </div>
                  )}

                  {/* Action Buttons Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleFeatured(project)}
                        className={`p-2 rounded-lg transition-colors ${
                          project.featured 
                            ? 'bg-cyber-pink/20 text-cyber-pink' 
                            : 'bg-gray-800/80 text-gray-300 hover:text-cyber-pink'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star size={16} />
                      </button>
                      
                      <button
                        onClick={() => openModal(project)}
                        className="p-2 bg-cyber-blue/20 text-cyber-blue rounded-lg hover:bg-cyber-blue/30 transition-colors"
                        title="Edit Project"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 text-xs bg-gray-600 text-gray-300 rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-cyber-gray-light">
                    <div className="flex space-x-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-cyber-blue hover:text-cyber-pink transition-colors duration-300 text-sm"
                        >
                          <ExternalLink size={14} />
                          <span>Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-cyber-blue hover:text-cyber-pink transition-colors duration-300 text-sm"
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                    
                    <span className="text-xs text-gray-500">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-cyber-gray border border-cyber-blue/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-cyber-gray-light rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-cyber-blue text-sm font-medium mb-2">
                        Project Title *
                      </label>
                      <input
                        {...register('title', { required: 'Title is required' })}
                        className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                        placeholder="Enter project title..."
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-cyber-blue text-sm font-medium mb-2">
                        Featured Image URL
                      </label>
                      <input
                        {...register('image')}
                        className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-cyber-blue text-sm font-medium mb-2">
                      Description *
                    </label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={4}
                      className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none resize-none"
                      placeholder="Describe your project..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-cyber-blue text-sm font-medium mb-2">
                      Technologies *
                    </label>
                    <input
                      {...register('technologies', { required: 'Technologies are required' })}
                      className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                      placeholder="React, TypeScript, Node.js, etc."
                    />
                    <p className="mt-1 text-xs text-gray-400">Separate technologies with commas</p>
                    {errors.technologies && (
                      <p className="mt-1 text-sm text-red-400">{errors.technologies.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-cyber-blue text-sm font-medium mb-2">
                        Demo URL
                      </label>
                      <input
                        {...register('demoUrl')}
                        className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                        placeholder="https://demo.example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-cyber-blue text-sm font-medium mb-2">
                        GitHub URL
                      </label>
                      <input
                        {...register('githubUrl')}
                        className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register('featured')}
                        className="rounded border-cyber-blue/30 bg-cyber-dark text-cyber-pink focus:ring-cyber-pink focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300">Featured Project</span>
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-6 border-t border-cyber-blue/20">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-cyber text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
                    >
                      <Save size={18} />
                      <span>{editingProject ? 'Update' : 'Create'} Project</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 bg-cyber-gray-light border border-cyber-blue/30 text-gray-300 rounded-lg hover:border-cyber-blue/50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManagement;
