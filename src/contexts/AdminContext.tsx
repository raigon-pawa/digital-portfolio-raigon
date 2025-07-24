import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AdminState, Project, BlogPost, AboutContent, ContactInfo, AdminUser } from '../types/admin';
import { blogPostService } from '../services/blogPostService';
import { projectService } from '../services/projectService';

// Action types
type AdminAction =
  | { type: 'SET_USER'; payload: AdminUser | null }
  | { type: 'UPDATE_USER'; payload: Partial<AdminUser> }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_BLOG_POSTS'; payload: BlogPost[] }
  | { type: 'ADD_BLOG_POST'; payload: BlogPost }
  | { type: 'UPDATE_BLOG_POST'; payload: BlogPost }
  | { type: 'DELETE_BLOG_POST'; payload: string }
  | { type: 'SET_ABOUT_CONTENT'; payload: AboutContent }
  | { type: 'SET_CONTACT_INFO'; payload: ContactInfo }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AdminState = {
  user: null,
  isAuthenticated: false,
  projects: [],
  blogPosts: [],
  loading: false,
  error: null,
  aboutContent: {
    title: 'Digital Architect',
    subtitle: 'Full Stack Developer & Digital Artist',
    description: [
      "Greetings, fellow digital wanderer. I'm a full-stack developer and digital artist who thrives at the intersection of cutting-edge technology and creative expression.",
      "With over 5 years of experience crafting immersive digital experiences, I specialize in building applications that not only function flawlessly but also inspire and engage users through innovative design and seamless interactions.",
      "When I'm not coding, you'll find me exploring the latest in AI technology, creating digital art, or diving deep into cyberpunk literature and aesthetics."
    ],
    stats: {
      projects: 50,
      years: 5,
      linesOfCode: 100000
    },
    skills: [
      {
        id: '1',
        category: 'Frontend Development',
        icon: 'Code',
        technologies: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Three.js'],
        color: 'cyber-blue'
      },
      {
        id: '2',
        category: 'Backend Development',
        icon: 'Zap',
        technologies: ['Node.js', 'Python', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis'],
        color: 'cyber-green'
      },
      {
        id: '3',
        category: 'Design & Creative',
        icon: 'Palette',
        technologies: ['Figma', 'Adobe Creative Suite', 'Blender', 'After Effects', 'UI/UX Design'],
        color: 'cyber-pink'
      },
      {
        id: '4',
        category: 'AI & Machine Learning',
        icon: 'Brain',
        technologies: ['TensorFlow', 'PyTorch', 'OpenAI API', 'Computer Vision', 'NLP'],
        color: 'cyber-purple'
      }
    ],
    avatar: '',
    updatedAt: new Date().toISOString()
  },
  contactInfo: {
    email: 'contact@cyberdev.com',
    phone: '+1 (555) 123-4567',
    location: 'Neo Tokyo, Cyber District',
    discord: 'CyberDev#1337',
    socialLinks: {
      github: '#',
      linkedin: '#',
      twitter: '#'
    },
    responseTime: {
      email: 'Within 24 hours',
      projects: 'Same day',
      urgent: 'Within 2 hours'
    },
    updatedAt: new Date().toISOString()
  }
};

// Reducer
const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload)
      };
    case 'SET_BLOG_POSTS':
      return { ...state, blogPosts: action.payload };
    case 'ADD_BLOG_POST':
      return { ...state, blogPosts: [...state.blogPosts, action.payload] };
    case 'UPDATE_BLOG_POST':
      return {
        ...state,
        blogPosts: state.blogPosts.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_BLOG_POST':
      return {
        ...state,
        blogPosts: state.blogPosts.filter(p => p.id !== action.payload)
      };
    case 'SET_ABOUT_CONTENT':
      return { ...state, aboutContent: action.payload };
    case 'SET_CONTACT_INFO':
      return { ...state, contactInfo: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
};

// Context
interface AdminContextType {
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
  // Database operations
  loadDataFromDatabase: () => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addBlogPost: (post: BlogPost) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Provider component
export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Database operations
  const loadDataFromDatabase = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const [projects, blogPosts] = await Promise.all([
        projectService.getAllProjects(),
        blogPostService.getAllBlogPosts()
      ]);

      dispatch({ type: 'SET_PROJECTS', payload: projects });
      dispatch({ type: 'SET_BLOG_POSTS', payload: blogPosts });
    } catch (error) {
      console.error('Error loading data from database:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load data from database' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addProject = async (project: Project) => {
    try {
      const newProject = await projectService.createProject(project);
      dispatch({ type: 'ADD_PROJECT', payload: newProject });
    } catch (error) {
      console.error('Error adding project:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add project' });
    }
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      const updatedProject = await projectService.updateProject(id, project);
      dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });
    } catch (error) {
      console.error('Error updating project:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update project' });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectService.deleteProject(id);
      dispatch({ type: 'DELETE_PROJECT', payload: id });
    } catch (error) {
      console.error('Error deleting project:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete project' });
    }
  };

  const addBlogPost = async (post: BlogPost) => {
    try {
      const newPost = await blogPostService.createBlogPost(post);
      dispatch({ type: 'ADD_BLOG_POST', payload: newPost });
    } catch (error) {
      console.error('Error adding blog post:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add blog post' });
    }
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    try {
      const updatedPost = await blogPostService.updateBlogPost(id, post);
      dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
    } catch (error) {
      console.error('Error updating blog post:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update blog post' });
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await blogPostService.deleteBlogPost(id);
      dispatch({ type: 'DELETE_BLOG_POST', payload: id });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete blog post' });
    }
  };

  // Load data from database on mount
  useEffect(() => {
    loadDataFromDatabase();
  }, []);

  // Load fallback data from localStorage if database fails
  useEffect(() => {
    if (state.error && state.projects.length === 0 && state.blogPosts.length === 0) {
      const savedData = localStorage.getItem('adminData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.projects) dispatch({ type: 'SET_PROJECTS', payload: parsed.projects });
          if (parsed.blogPosts) dispatch({ type: 'SET_BLOG_POSTS', payload: parsed.blogPosts });
          if (parsed.aboutContent) dispatch({ type: 'SET_ABOUT_CONTENT', payload: parsed.aboutContent });
          if (parsed.contactInfo) dispatch({ type: 'SET_CONTACT_INFO', payload: parsed.contactInfo });
        } catch (error) {
          console.error('Error loading saved data:', error);
        }
      }
    }
  }, [state.error]);

  // Check for saved auth
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth) {
      try {
        const user = JSON.parse(savedAuth);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Error loading auth data:', error);
      }
    }
  }, []);

  // Save data to localStorage as backup whenever state changes
  useEffect(() => {
    const dataToSave = {
      projects: state.projects,
      blogPosts: state.blogPosts,
      aboutContent: state.aboutContent,
      contactInfo: state.contactInfo
    };
    localStorage.setItem('adminData', JSON.stringify(dataToSave));
  }, [state.projects, state.blogPosts, state.aboutContent, state.contactInfo]);

  // Save auth data
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('adminAuth', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('adminAuth');
    }
  }, [state.user]);

  const contextValue: AdminContextType = {
    state,
    dispatch,
    loadDataFromDatabase,
    addProject,
    updateProject,
    deleteProject,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook to use admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
