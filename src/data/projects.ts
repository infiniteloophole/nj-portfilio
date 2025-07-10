import { Project } from '../types/project';

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Health App',
    description: 'Personalized patient support and habit tracking',
    longDescription: 'A cross-platform mobile application that provides personalized health recommendations, real-time habit tracking, and secure payment integration. The app uses AI to analyze user behavior and suggest improvements.',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React Native', 'OpenAI', 'Convex', 'Razorpay', 'TypeScript', 'Node.js'],
    links: {
      github: 'https://github.com/nsaquib22/health-app',
      live: 'https://health-app-demo.netlify.app',
      video: 'https://youtube.com/watch?v=demo1'
    },
    year: '2023',
    type: 'mobile',
    role: 'Full-stack Developer & AI Engineer',
    features: [
      'AI-powered health recommendations based on user data',
      'Real-time habit tracking with push notifications',
      'Secure payment integration with Razorpay',
      'Cross-platform compatibility (iOS & Android)'
    ],
    challenges: [
      'Optimized AI model for mobile devices with limited resources',
      'Implemented offline-first functionality for better user experience',
      'Ensured HIPAA compliance for health data handling'
    ],
    results: [
      '10,000+ downloads in the first month',
      '4.8/5 average rating on app stores',
      'Featured in "Top Health Apps of 2023" by TechCrunch'
    ]
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'Full-featured online shopping experience',
    longDescription: 'A comprehensive e-commerce platform with product listings, cart functionality, user authentication, and secure checkout process. Built with modern web technologies for optimal performance and user experience.',
    image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/nsaquib22/ecommerce-platform',
      live: 'https://ecommerce-demo.netlify.app',
      video: 'https://youtube.com/watch?v=demo2'
    },
    year: '2023',
    type: 'web',
    role: 'Lead Frontend Developer',
    features: [
      'Server-side rendering for better SEO',
      'Responsive design for all devices',
      'Secure payment processing with Stripe',
      'Product search and filtering'
    ],
    challenges: [
      'Optimized performance for large product catalogs',
      'Implemented secure authentication and authorization',
      'Reduced initial load time by 60%'
    ],
    results: [
      '30% increase in conversion rate',
      '95%+ Lighthouse performance score',
      'Featured in "Best E-commerce Solutions" by WebDev Magazine'
    ]
  },
  {
    id: 3,
    title: 'Task Management API',
    description: 'RESTful API for task management',
    longDescription: 'A robust and scalable RESTful API for task management applications. Features include user authentication, role-based access control, and real-time updates using WebSockets.',
    image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'WebSockets'],
    links: {
      github: 'https://github.com/nsaquib22/task-management-api',
      live: 'https://task-api-demo.herokuapp.com/docs',
      video: 'https://youtube.com/watch?v=demo3'
    },
    year: '2023',
    type: 'web',
    role: 'Backend Developer',
    features: [
      'RESTful API with proper status codes',
      'JWT-based authentication',
      'Role-based access control',
      'Real-time updates with WebSockets'
    ],
    challenges: [
      'Implemented efficient database queries for large datasets',
      'Ensured API security best practices',
      'Optimized for high concurrency'
    ],
    results: [
      '99.9% API uptime',
      'Average response time under 100ms',
      'Adopted by 3+ startups'
    ]
  }
];

export default projects;
