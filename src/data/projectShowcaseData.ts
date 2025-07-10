import { Project } from '../types/project';

const projectShowcaseData: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Health App',
    description: 'A cross-platform mobile application that provides personalized health recommendations and real-time habit tracking using AI.',
    type: 'mobile' as const,
    links: {
      github: 'https://github.com/nsaquib22/health-app',
      live: 'https://health-app-demo.netlify.app',
      video: 'https://youtube.com/watch?v=demo1'
    },
    technologies: ['React Native', 'OpenAI', 'Convex', 'TypeScript', 'Node.js'],
    image: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=800',
    role: 'Full Stack Developer',
    features: [
      'AI-powered health recommendations',
      'Real-time habit tracking',
      'Cross-platform compatibility',
      'User authentication and data sync'
    ],
    challenges: [
      'Implementing real-time data synchronization',
      'Optimizing AI model performance on mobile devices',
      'Ensuring data privacy and security'
    ],
    results: [
      '30% increase in user engagement',
      '4.8/5 average app store rating',
      '10,000+ downloads in the first month'
    ],
    year: '2023'
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with product listings, cart functionality, and secure payment processing.',
    type: 'web',
    links: {
      github: 'https://github.com/nsaquib22/ecommerce-platform',
      live: 'https://ecommerce-demo.netlify.app',
      video: 'https://youtube.com/watch?v=demo2'
    },
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800',
    role: 'Backend Developer',
    features: [
      'Product catalog with search and filters',
      'Shopping cart functionality',
      'Secure payment processing',
      'Order management system'
    ],
    challenges: [
      'Handling high traffic during sales',
      'Implementing secure payment processing',
      'Optimizing database queries for performance'
    ],
    results: [
      '99.9% uptime during peak traffic',
      'Reduced page load time by 40%',
      'Processed 10,000+ orders in the first month'
    ],
    year: '2023'
  },
  {
    id: 3,
    title: 'Task Management API',
    description: 'A RESTful API for task management with user authentication and role-based access control.',
    type: 'api' as const,
    links: {
      github: 'https://github.com/nsaquib22/task-management-api',
      live: 'https://task-api-demo.herokuapp.com/docs',
      video: 'https://youtube.com/watch?v=demo3'
    },
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
    image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800',
    role: 'API Developer',
    features: [
      'RESTful API endpoints',
      'User authentication with JWT',
      'Role-based access control',
      'Automated API documentation'
    ],
    challenges: [
      'Implementing proper authentication flow',
      'Optimizing database queries',
      'Ensuring API security'
    ],
    results: [
      'Reduced API response time by 60%',
      '100% test coverage',
      'Successfully deployed to production with zero critical bugs'
    ],
    year: '2022'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS.',
    type: 'web',
    links: {
      github: 'https://github.com/nsaquib22/portfolio',
      live: 'https://nsaquib22.github.io/portfolio',
      video: 'https://youtube.com/watch?v=demo4'
    },
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    role: 'Frontend Developer',
    features: [
      'Responsive design',
      'Smooth animations and transitions',
      'Dark/light mode',
      'Project showcase with filtering'
    ],
    challenges: [
      'Creating a responsive layout',
      'Optimizing animations for performance',
      'Ensuring accessibility'
    ],
    results: [
      'Perfect Lighthouse scores',
      'Fully responsive on all devices',
      'Improved user engagement metrics'
    ],
    year: '2023'
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather and forecasts using a weather API.',
    type: 'web',
    links: {
      github: 'https://github.com/nsaquib22/weather-dashboard',
      live: 'https://weather-demo.netlify.app',
      video: 'https://youtube.com/watch?v=demo5'
    },
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'Axios'],
    image: 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 6,
    title: 'Recipe Finder',
    description: 'A web application to search and save recipes with filtering by ingredients and dietary restrictions.',
    type: 'web',
    links: {
      github: 'https://github.com/nsaquib22/recipe-finder',
      live: 'https://recipe-finder-demo.netlify.app',
      video: 'https://youtube.com/watch?v=demo6'
    },
    technologies: ['Vue.js', 'Firebase', 'Spoonacular API', 'Vuex'],
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default projectShowcaseData;
