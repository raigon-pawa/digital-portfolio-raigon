import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@cyberdev.com',
      href: 'mailto:contact@cyberdev.com',
      color: 'cyber-blue'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'cyber-green'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Neo Tokyo, Cyber District',
      href: '#',
      color: 'cyber-pink'
    },
    {
      icon: MessageCircle,
      label: 'Discord',
      value: 'CyberDev#1337',
      href: '#',
      color: 'cyber-purple'
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute bottom-10 right-1/4 text-cyber-blue/20 text-6xl font-light">
        コンタクト
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="text-cyber-green">Touch</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Ready to bring your digital vision to life? Let's discuss your next project and create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-cyber-blue text-sm font-medium">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-cyber-blue text-sm font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-cyber-blue text-sm font-medium">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-cyber-blue text-sm font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-cyber text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Connect Directly</h3>
            
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className={`group flex items-center space-x-4 p-4 bg-cyber-gray border border-${info.color}/20 rounded-lg hover:border-${info.color}/50 transition-all duration-300`}
                >
                  <div className={`p-3 bg-${info.color}/10 border border-${info.color}/20 rounded-lg`}>
                    <info.icon className={`text-${info.color}`} size={24} />
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-sm">{info.label}</div>
                    <div className={`text-white group-hover:text-${info.color} transition-colors duration-300 font-medium`}>
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-cyber-gray-light">
              <h4 className="text-lg font-semibold text-white">Response Time</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Email responses:</span>
                  <span className="text-cyber-green">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Project inquiries:</span>
                  <span className="text-cyber-blue">Same day</span>
                </div>
                <div className="flex justify-between">
                  <span>Urgent matters:</span>
                  <span className="text-cyber-pink">Within 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;