import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Plus, Trash2, User } from 'lucide-react';
import AdminHeader from '../AdminHeader';
import { useAdmin } from '../../../contexts/AdminContext';
import { AboutContent } from '../../../types/admin';

interface AboutFormData {
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  description3: string;
  statsProjects: number;
  statsYears: number;
  statsLinesOfCode: number;
  avatar: string;
}

const AboutManagement: React.FC = () => {
  const { state, dispatch } = useAdmin();

  const { register, handleSubmit, formState: { errors } } = useForm<AboutFormData>({
    defaultValues: {
      title: state.aboutContent.title,
      subtitle: state.aboutContent.subtitle,
      description1: state.aboutContent.description[0] || '',
      description2: state.aboutContent.description[1] || '',
      description3: state.aboutContent.description[2] || '',
      statsProjects: state.aboutContent.stats.projects,
      statsYears: state.aboutContent.stats.years,
      statsLinesOfCode: state.aboutContent.stats.linesOfCode,
      avatar: state.aboutContent.avatar
    }
  });

  const [skills, setSkills] = useState(state.aboutContent.skills);

  const onSubmit = (data: AboutFormData) => {
    const aboutContent: AboutContent = {
      title: data.title,
      subtitle: data.subtitle,
      description: [data.description1, data.description2, data.description3].filter(Boolean),
      stats: {
        projects: data.statsProjects,
        years: data.statsYears,
        linesOfCode: data.statsLinesOfCode
      },
      skills: skills,
      avatar: data.avatar,
      updatedAt: new Date().toISOString()
    };

    dispatch({ type: 'SET_ABOUT_CONTENT', payload: aboutContent });
    alert('About content updated successfully!');
  };

  const addNewSkill = () => {
    setSkills([...skills, {
      id: `skill_${Date.now()}`,
      category: '',
      icon: 'Code',
      technologies: [],
      color: 'cyber-blue'
    }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const updatedSkills = [...skills];
    if (field === 'technologies') {
      updatedSkills[index].technologies = value.split(',').map((tech: string) => tech.trim()).filter(Boolean);
    } else if (field === 'category') {
      updatedSkills[index].category = value;
    } else if (field === 'icon') {
      updatedSkills[index].icon = value;
    } else if (field === 'color') {
      updatedSkills[index].color = value;
    }
    setSkills(updatedSkills);
  };

  const colorOptions = [
    { value: 'cyber-blue', label: 'Cyber Blue' },
    { value: 'cyber-green', label: 'Cyber Green' },
    { value: 'cyber-pink', label: 'Cyber Pink' },
    { value: 'cyber-purple', label: 'Cyber Purple' }
  ];

  const iconOptions = [
    { value: 'Code', label: 'Code' },
    { value: 'Zap', label: 'Zap' },
    { value: 'Palette', label: 'Palette' },
    { value: 'Brain', label: 'Brain' },
    { value: 'Monitor', label: 'Monitor' },
    { value: 'Smartphone', label: 'Smartphone' }
  ];

  return (
    <div className="flex-1 overflow-auto">
      <AdminHeader 
        title="About Management" 
        subtitle="Edit your personal information and skills"
      />
      
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
          {/* Basic Information */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <User className="h-5 w-5 text-cyber-blue" />
              <span>Basic Information</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                  placeholder="Digital Architect"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Subtitle *
                </label>
                <input
                  {...register('subtitle', { required: 'Subtitle is required' })}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                  placeholder="Full Stack Developer & Digital Artist"
                />
                {errors.subtitle && (
                  <p className="mt-1 text-sm text-red-400">{errors.subtitle.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-cyber-blue text-sm font-medium mb-2">
                Avatar URL
              </label>
              <input
                {...register('avatar')}
                className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          {/* Description Paragraphs */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Description Paragraphs</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Paragraph 1
                </label>
                <textarea
                  {...register('description1')}
                  rows={3}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none resize-none"
                  placeholder="First paragraph about yourself..."
                />
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Paragraph 2
                </label>
                <textarea
                  {...register('description2')}
                  rows={3}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none resize-none"
                  placeholder="Second paragraph about your experience..."
                />
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Paragraph 3
                </label>
                <textarea
                  {...register('description3')}
                  rows={3}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none resize-none"
                  placeholder="Third paragraph about your interests..."
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Statistics</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Projects Count
                </label>
                <input
                  type="number"
                  {...register('statsProjects', { required: true, min: 0 })}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  {...register('statsYears', { required: true, min: 0 })}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Lines of Code
                </label>
                <input
                  type="number"
                  {...register('statsLinesOfCode', { required: true, min: 0 })}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                  placeholder="100000"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Skills & Technologies</h2>
              <button
                type="button"
                onClick={addNewSkill}
                className="flex items-center space-x-2 px-3 py-2 bg-cyber-green/20 text-cyber-green rounded-lg hover:bg-cyber-green/30 transition-colors"
              >
                <Plus size={16} />
                <span>Add Skill Category</span>
              </button>
            </div>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.id} className="bg-cyber-dark border border-cyber-blue/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Skill Category {index + 1}</h3>
                    {skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-cyber-blue text-sm font-medium mb-2">
                        Category Name *
                      </label>
                      <input
                        value={skill.category}
                        onChange={(e) => updateSkill(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                        placeholder="Frontend Development"
                      />
                    </div>

                    <div>
                      <label className="block text-cyber-blue text-sm font-medium mb-2">
                        Icon
                      </label>
                      <select
                        value={skill.icon}
                        onChange={(e) => updateSkill(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white focus:border-cyber-pink focus:outline-none"
                      >
                        {iconOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cyber-blue text-sm font-medium mb-2">
                        Technologies *
                      </label>
                      <input
                        value={skill.technologies.join(', ')}
                        onChange={(e) => updateSkill(index, 'technologies', e.target.value)}
                        className="w-full px-3 py-2 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                        placeholder="React, TypeScript, Next.js"
                      />
                      <p className="mt-1 text-xs text-gray-400">Separate with commas</p>
                    </div>

                    <div>
                      <label className="block text-cyber-blue text-sm font-medium mb-2">
                        Color Theme
                      </label>
                      <select
                        value={skill.color}
                        onChange={(e) => updateSkill(index, 'color', e.target.value)}
                        className="w-full px-3 py-2 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white focus:border-cyber-pink focus:outline-none"
                      >
                        {colorOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-cyber text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              <Save size={18} />
              <span>Save About Content</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutManagement;
