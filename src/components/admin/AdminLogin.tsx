import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Lock, User, Shield } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { AdminUser } from '../../types/admin';

interface LoginForm {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const { dispatch } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  // Ensure cursor is visible in admin area
  useEffect(() => {
    // Add admin-active class to body for CSS targeting
    document.body.classList.add('admin-active');
    document.documentElement.classList.add('admin-active');
    
    const adminContainer = document.querySelector('.admin-login');
    if (adminContainer) {
      // Force cursor styles
      (adminContainer as HTMLElement).style.cursor = 'auto';
      const inputs = adminContainer.querySelectorAll('input, textarea, button');
      inputs.forEach((input) => {
        if (input instanceof HTMLElement) {
          if (input.tagName === 'BUTTON' || (input instanceof HTMLInputElement && (input.type === 'submit' || input.type === 'button'))) {
            input.style.cursor = 'pointer';
          } else {
            input.style.cursor = 'text';
          }
        }
      });
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('admin-active');
      document.documentElement.classList.remove('admin-active');
    };
  }, []);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (data.email === 'admin@cyberdev.com' && data.password === 'cyber123') {
        const user: AdminUser = {
          id: '1',
          email: data.email,
          name: 'Admin User',
          role: 'admin',
          lastLogin: new Date().toISOString()
        };
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        setError('Invalid credentials. Use admin@cyberdev.com / cyber123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-area admin-login min-h-screen bg-cyber-dark flex items-center justify-center px-4" style={{ cursor: 'auto' }}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-cyber-blue" />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
          <p className="mt-2 text-gray-400">Sign in to manage your cyberpunk portfolio</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cyber-blue mb-2">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none focus:ring-2 focus:ring-cyber-pink/20"
                placeholder="admin@cyberdev.com"
                style={{ cursor: 'text' }}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cyber-blue mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none focus:ring-2 focus:ring-cyber-pink/20"
                placeholder="Enter your password"
                style={{ cursor: 'text' }}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-cyber text-white py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Demo credentials: admin@cyberdev.com / cyber123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
