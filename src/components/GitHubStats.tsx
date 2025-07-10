import React from 'react';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FiGithub,
  FiRefreshCw,
  FiFrown,
  FiInfo
} from 'react-icons/fi';

// Environment types are now defined in src/vite-env.d.ts

interface GitHubStatsProps {
  username: string;
  className?: string;
}

interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GithubEvent {
  created_at: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    push_id?: number;
    size?: number;
    distinct_size?: number;
  };
  actor: {
    login: string;
    display_login?: string;
    avatar_url: string;
  };
  org?: {
    id: number;
    login: string;
    url: string;
    avatar_url: string;
  };
}

// Enhanced API cache with TTL and size limit
const apiCache = new Map();
const MAX_CACHE_SIZE = 50;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const cleanupCache = () => {
  const now = Date.now();
  // Remove expired items
  for (const [key, { timestamp }] of apiCache.entries()) {
    if (now - timestamp > CACHE_TTL) {
      apiCache.delete(key);
    }
  }
  // Enforce size limit
  if (apiCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(apiCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    for (let i = 0; i < entries.length - MAX_CACHE_SIZE; i++) {
      apiCache.delete(entries[i][0]);
    }
  }
};

console.log('Current API cache size:', apiCache.size);
setInterval(() => {
  console.log('API Cache Contents:', Array.from(apiCache.keys()));
  cleanupCache();
}, 30000); // Log every 30 seconds

// Enhanced fetch with timeout and retries
const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = 3): Promise<Response> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(import.meta.env.VITE_GITHUB_TOKEN && {
          'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
        }),
        ...options.headers
      }
    });

    if (!response.ok) {
      if (response.status === 403 && retries > 0) {
        // Rate limited - wait and retry
        const resetTime = parseInt(response.headers.get('X-RateLimit-Reset') || '0') * 1000;
        const waitTime = Math.max(1000, resetTime - Date.now());
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries))); // Exponential backoff
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

const contributionColors = [
  'bg-gray-100',
  'bg-green-100',
  'bg-green-300',
  'bg-green-500',
  'bg-green-700'
];

const GitHubStats = React.memo(({ username, className = '' }: GitHubStatsProps) => {
  // Track mounted state to prevent state updates after unmount
  const isMounted = useRef(true);
  const maxRetries = 3;
  const retryAttempts = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [contributions, setContributions] = useState<number[][]>([]);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  // Generate mock contributions data
  const generateMockContributions = useCallback((): number[][] => {
    const mockContributions: number[][] = [];
    
    for (let week = 0; week < 52; week++) {
      const weekData: number[] = [];
      
      for (let day = 0; day < 7; day++) {
        // Generate random contribution count (0-4)
        weekData.push(Math.floor(Math.random() * 5));
      }
      
      mockContributions.push(weekData);
    }
    
    return mockContributions;
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Get environment variables from Vite
  const env = import.meta.env;

  // Helper function to create a timeout promise with retry logic
  const fetchUserData = useCallback(async () => {
    if (!import.meta.env.VITE_GITHUB_TOKEN) {
      console.warn('GitHub token not found. Using mock data.');
      setContributions(generateMockContributions());
      setIsUsingMockData(true);
      setIsLoading(false);
      return;
    }
    if (!isMounted.current) return;
    
    console.log('Starting to fetch GitHub data for:', username);
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch user data with retry
      console.log('Checking cache for:', username);
      console.log('Fetching user data...');
      const cacheKey = `user-${username}`;
      if (apiCache.has(cacheKey)) {
        const cachedResponse = apiCache.get(cacheKey);
        if (cachedResponse) {
          const user = cachedResponse.data;
          console.log('User data received from cache:', { login: user.login, name: user.name });
          if (!isMounted.current) return;
          setUserData(user);
        } else {
          throw new Error('Cached response is null');
        }
      } else {
        const userResponse = await fetchWithRetry(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              ...(env.VITE_GITHUB_TOKEN && {
                'Authorization': `token ${env.VITE_GITHUB_TOKEN}`
              })
            }
          },
          10000 // 10 second timeout for user data
        );
        
        const user = await userResponse.json();
        console.log('User data received:', { login: user.login, name: user.name });
        apiCache.set(cacheKey, { data: user, timestamp: Date.now() });
        cleanupCache();
        
        if (!isMounted.current) return;
        setUserData(user);
      }
      
      // Fetch contributions (using GitHub Events API)
      console.log('Fetching contribution data...');
      try {
        const contributionsResponse = await fetchWithRetry(
          `https://api.github.com/users/${username}/events/public`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              ...(env.VITE_GITHUB_TOKEN && {
                'Authorization': `token ${env.VITE_GITHUB_TOKEN}`
              })
            }
          },
          15000 // 15 second timeout for events
        );
        
        const events = await contributionsResponse.json();
        console.log('GitHub events received:', events.length);
        
        // Process events into contribution data
        const contributionMap = new Map<string, number>();
        const now = new Date();
        const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        
        events.forEach((event: GithubEvent) => {
          const eventDate = new Date(event.created_at);
          if (eventDate > oneYearAgo) {
            const dateStr = eventDate.toISOString().split('T')[0];
            contributionMap.set(dateStr, (contributionMap.get(dateStr) || 0) + 1);
          }
        });
        
        // Convert to the expected format
        const contributions: number[][] = [];
        for (let week = 0; week < 52; week++) {
          const weekData: number[] = [];
          for (let day = 0; day < 7; day++) {
            const date = new Date();
            date.setDate(date.getDate() - (week * 7 + (6 - day)));
            const dateStr = date.toISOString().split('T')[0];
            weekData.push(contributionMap.get(dateStr) || 0);
          }
          contributions.push(weekData);
        }
        
        if (!isMounted.current) return;
        setContributions(contributions);
        setIsUsingMockData(false);
        retryAttempts.current = 0; // Reset retry counter on success
      } catch (contribError) {
        console.warn('Using mock contribution data. Error:', contribError);
        if (isMounted.current) {
          setContributions(generateMockContributions());
          setIsUsingMockData(true);
        }
      }
      
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError('Failed to load GitHub data. Please try again later.');
      setContributions(generateMockContributions());
      setIsUsingMockData(true);
    } finally {
      setIsLoading(false);
    }
  }, [username, generateMockContributions, import.meta.env.VITE_GITHUB_TOKEN]);

  // Fetch data on component mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Handle retry
  const handleRetry = () => {
    fetchUserData();
  };

  // Memoize user info section
  const userInfo = useMemo(() => (
    <div className="flex items-center space-x-4 mb-4">
      <img 
        src={userData?.avatar_url} 
        alt={`${userData?.login}'s avatar`} 
        className="w-16 h-16 rounded-full border-2 border-gray-200"
      />
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{userData?.name || userData?.login}</h3>
        <a href={userData?.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:underline">
          @{userData?.login}
        </a>
      </div>
    </div>
  ), [userData]);

  // Memoize contribution graph calculation
  const contributionGraph = useMemo(() => {
    return contributions.map((week, weekIndex) => (
      <div key={weekIndex} className="flex flex-col gap-1">
        {week.map((day, dayIndex) => (
          <div 
            key={`${weekIndex}-${dayIndex}`}
            className={`w-2 h-2 rounded-sm ${contributionColors[day]}`}
          />
        ))}
      </div>
    ));
  }, [contributions]);

  // Loading state
  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 space-y-4 ${className}`}>
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          ></motion.div>
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="text-gray-600 flex items-center">
          <FiRefreshCw className="animate-spin mr-2" />
          Loading GitHub data...
        </p>
        {retryAttempts.current > 0 && (
          <p className="text-sm text-gray-500">
            Attempt {retryAttempts.current} of 3
          </p>
        )}
      </div>
    );
  }

  // Error state
  if (error && !userData) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <FiFrown className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Error Loading GitHub Data
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto px-4">
          {error.includes('rate limit') ? (
            <>
              GitHub API rate limit exceeded. 
              {env.VITE_GITHUB_TOKEN 
                ? 'Try again later or check your token.' 
                : 'Add a GitHub token to increase your rate limit.'}
            </>
          ) : (
            error
          )}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleRetry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </button>
          {!env.VITE_GITHUB_TOKEN && (
            <a
              href="https://github.com/settings/tokens/new?scopes=public_repo&description=GitHub%20Stats%20Widget"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <FiGithub className="mr-2" />
              Get Token
            </a>
          )}
        </div>
        {env.MODE === 'development' && (
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            <p>Add to .env: VITE_GITHUB_TOKEN=your_token_here</p>
          </div>
        )}
      </div>
    );
  }

  // Success state - show user data
  return (
    <motion.div 
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* User Profile */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Contribution Activity</h3>
          {isUsingMockData && (
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              Using Mock Data
            </span>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-1">
            {contributionGraph}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${contributionColors[level]}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Stats */}
      {userData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            icon={<FiInfo />}
            label="Public Repos"
            value={userData.public_repos}
          />
          <StatCard 
            icon={<FiGithub />}
            label="Followers"
            value={userData.followers}
          />
          <StatCard 
            icon={<FiGithub />}
            label="Following"
            value={userData.following}
          />
        </div>
      )}
    </motion.div>
  );
});

// Stat Card Component
const StatCard = React.memo(({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number;
}) => (
  <div className="text-center">
    <div className="text-lg font-semibold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
));

// Export the component
export default GitHubStats;
