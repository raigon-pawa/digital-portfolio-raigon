import React from 'react';
import { useForm } from 'react-hook-form';
import { Save, Mail, Phone, MapPin, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react';
import AdminHeader from '../AdminHeader';
import { useAdmin } from '../../../contexts/AdminContext';
import { ContactInfo } from '../../../types/admin';

interface ContactFormData {
  email: string;
  phone: string;
  location: string;
  discord: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  emailResponseTime: string;
  projectsResponseTime: string;
  urgentResponseTime: string;
}

const ContactManagement: React.FC = () => {
  const { state, dispatch } = useAdmin();

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    defaultValues: {
      email: state.contactInfo.email,
      phone: state.contactInfo.phone,
      location: state.contactInfo.location,
      discord: state.contactInfo.discord,
      githubUrl: state.contactInfo.socialLinks.github,
      linkedinUrl: state.contactInfo.socialLinks.linkedin,
      twitterUrl: state.contactInfo.socialLinks.twitter,
      emailResponseTime: state.contactInfo.responseTime.email,
      projectsResponseTime: state.contactInfo.responseTime.projects,
      urgentResponseTime: state.contactInfo.responseTime.urgent
    }
  });

  const onSubmit = (data: ContactFormData) => {
    const contactInfo: ContactInfo = {
      email: data.email,
      phone: data.phone,
      location: data.location,
      discord: data.discord,
      socialLinks: {
        github: data.githubUrl,
        linkedin: data.linkedinUrl,
        twitter: data.twitterUrl
      },
      responseTime: {
        email: data.emailResponseTime,
        projects: data.projectsResponseTime,
        urgent: data.urgentResponseTime
      },
      updatedAt: new Date().toISOString()
    };

    dispatch({ type: 'SET_CONTACT_INFO', payload: contactInfo });
    alert('Contact information updated successfully!');
  };

  return (
    <div className="flex-1 overflow-auto">
      <AdminHeader 
        title="Contact Management" 
        subtitle="Manage your contact information and social links"
      />
      
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
          {/* Contact Information */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Mail className="h-5 w-5 text-cyber-blue" />
              <span>Contact Information</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                    placeholder="contact@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...register('phone')}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...register('location')}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Discord
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...register('discord')}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                    placeholder="Username#1234"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Github className="h-5 w-5 text-cyber-green" />
              <span>Social Media Links</span>
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-cyber-green text-sm font-medium mb-2">
                  GitHub Profile
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...register('githubUrl')}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...register('linkedinUrl')}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cyber-purple text-sm font-medium mb-2">
                  Twitter Profile
                </label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    {...register('twitterUrl')}
                    className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Response Times */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Response Time Information</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-cyber-green text-sm font-medium mb-2">
                  Email Responses
                </label>
                <input
                  {...register('emailResponseTime')}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                  placeholder="Within 24 hours"
                />
              </div>

              <div>
                <label className="block text-cyber-blue text-sm font-medium mb-2">
                  Project Inquiries
                </label>
                <input
                  {...register('projectsResponseTime')}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                  placeholder="Same day"
                />
              </div>

              <div>
                <label className="block text-cyber-pink text-sm font-medium mb-2">
                  Urgent Matters
                </label>
                <input
                  {...register('urgentResponseTime')}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none"
                  placeholder="Within 2 hours"
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Contact Form Preview</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-cyber-blue mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-cyber-dark rounded-lg">
                    <Mail className="h-5 w-5 text-cyber-blue" />
                    <div>
                      <p className="text-white font-medium text-sm">{state.contactInfo.email}</p>
                      <p className="text-gray-400 text-xs">Email</p>
                    </div>
                  </div>
                  
                  {state.contactInfo.phone && (
                    <div className="flex items-center space-x-3 p-3 bg-cyber-dark rounded-lg">
                      <Phone className="h-5 w-5 text-cyber-green" />
                      <div>
                        <p className="text-white font-medium text-sm">{state.contactInfo.phone}</p>
                        <p className="text-gray-400 text-xs">Phone</p>
                      </div>
                    </div>
                  )}
                  
                  {state.contactInfo.location && (
                    <div className="flex items-center space-x-3 p-3 bg-cyber-dark rounded-lg">
                      <MapPin className="h-5 w-5 text-cyber-pink" />
                      <div>
                        <p className="text-white font-medium text-sm">{state.contactInfo.location}</p>
                        <p className="text-gray-400 text-xs">Location</p>
                      </div>
                    </div>
                  )}
                  
                  {state.contactInfo.discord && (
                    <div className="flex items-center space-x-3 p-3 bg-cyber-dark rounded-lg">
                      <MessageCircle className="h-5 w-5 text-cyber-purple" />
                      <div>
                        <p className="text-white font-medium text-sm">{state.contactInfo.discord}</p>
                        <p className="text-gray-400 text-xs">Discord</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-4">Response Times</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Email responses:</span>
                    <span className="text-cyber-green">{state.contactInfo.responseTime.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project inquiries:</span>
                    <span className="text-cyber-blue">{state.contactInfo.responseTime.projects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgent matters:</span>
                    <span className="text-cyber-pink">{state.contactInfo.responseTime.urgent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-cyber text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              <Save size={18} />
              <span>Save Contact Information</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactManagement;
