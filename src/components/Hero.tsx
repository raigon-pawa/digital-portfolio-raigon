import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Welcome to the Digital Realm';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 via-cyber-dark to-cyber-blue/20" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Japanese decorative text */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-cyber-blue/20 text-6xl font-light">
          デジタル
        </div>
        
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            {text}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-cyber-pink`}>|</span>
          </h1>
          
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl text-cyber-blue font-light">
              Full Stack Developer & Digital Artist
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Crafting immersive digital experiences at the intersection of technology and creativity. 
              Specializing in modern web development, AI integration, and cyberpunk aesthetics.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-6 pt-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group p-3 border border-cyber-blue/30 rounded-full hover:border-cyber-pink transition-all duration-300 hover:animate-glow"
                aria-label={social.label}
              >
                <social.icon className="text-cyber-blue group-hover:text-cyber-pink transition-colors duration-300" size={24} />
              </a>
            ))}
          </div>

          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-cyber text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300 animate-float"
          >
            <span>Explore My Work</span>
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Japanese decorative text */}
        <div className="absolute -bottom-20 right-1/4 text-cyber-purple/20 text-4xl font-light">
          未来
        </div>
      </div>
    </section>
  );
};

export default Hero;