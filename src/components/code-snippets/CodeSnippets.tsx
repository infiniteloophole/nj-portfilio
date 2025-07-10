import React, { useState, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Cpu, Server } from 'lucide-react';
import { Highlight } from 'prism-react-renderer';

type SnippetCategory = 'all' | 'frontend' | 'backend' | 'algorithms' | 'utilities';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: SnippetCategory;
  tags: string[];
}

const codeSnippets: CodeSnippet[] = [
  {
    id: '1',
    title: 'Custom Hook: useFetch',
    description: 'A reusable React hook for handling API requests with loading and error states.',
    language: 'typescript',
    code: `import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T = any>(url: string, options?: RequestInit): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
      }
    };

    fetchData();
  }, [url, options]);

  return state;
}

// Usage:
// const { data, loading, error } = useFetch<User[]>('/api/users');
`,
    category: 'frontend',
    tags: ['react', 'typescript', 'hooks', 'api'],
  },
  {
    id: '2',
    title: 'Express Middleware: Error Handler',
    description: 'A centralized error handling middleware for Express.js applications.',
    language: 'typescript',
    code: `import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

// In your app.ts:
// app.use(errorHandler);
`,
    category: 'backend',
    tags: ['nodejs', 'express', 'typescript', 'error-handling'],
  },
  {
    id: '3',
    title: 'Binary Search',
    description: 'Efficient binary search implementation in TypeScript.',
    language: 'typescript',
    code: `function binarySearch<T>(
  sortedArray: T[], 
  target: T,
  comparator?: (a: T, b: T) => number
): number {
  let left = 0;
  let right = sortedArray.length - 1;
  
  // Default comparator if not provided
  const compare = comparator || ((a: T, b: T) => 
    a < b ? -1 : (a > b ? 1 : 0)
  );

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = compare(sortedArray[mid], target);

    if (comparison === 0) {
      return mid; // Found the target
    } else if (comparison < 0) {
      left = mid + 1; // Search the right half
    } else {
      right = mid - 1; // Search the left half
    }
  }

  return -1; // Target not found
}

// Example usage:
// const numbers = [1, 3, 5, 7, 9];
// console.log(binarySearch(numbers, 5)); // 2
// console.log(binarySearch(numbers, 4)); // -1
`,
    category: 'algorithms',
    tags: ['typescript', 'algorithms', 'search', 'binary-search'],
  },
];

const categoryIcons = {
  all: <Code className="w-5 h-5" />,
  frontend: <Code className="w-5 h-5" />,
  backend: <Server className="w-5 h-5" />,
  algorithms: <Cpu className="w-5 h-5" />,
  utilities: <Terminal className="w-5 h-5" />,
};

const categoryLabels = {
  all: 'All Snippets',
  frontend: 'Frontend',
  backend: 'Backend',
  algorithms: 'Algorithms',
  utilities: 'Utilities',
};

const CodeSnippets: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SnippetCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const defaultStyle: CSSProperties = {
    backgroundColor: '#1a1a1a',
    color: '#f8f8f2',
    fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    padding: '1em',
    margin: '0.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
  };

  const filteredSnippets = activeCategory === 'all'
    ? codeSnippets
    : codeSnippets.filter(snippet => snippet.category === activeCategory);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="code-snippets" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Code <span className="text-gray-800">Snippets</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Useful code examples and solutions I've found helpful
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(Object.keys(categoryLabels) as SnippetCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{categoryIcons[category]}</span>
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Snippets Grid */}
        <div className="grid gap-8">
          {filteredSnippets.map((snippet) => (
            <motion.div
              key={`snippet-${snippet.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div key={`snippet-content-${snippet.id}`} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{snippet.title}</h3>
                    <p className="text-gray-600">{snippet.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {snippet.language}
                    </span>
                    <button
                      onClick={() => copyToClipboard(snippet.code, snippet.id)}
                      className="inline-flex items-center px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                    >
                      {copiedId === snippet.id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-lg overflow-hidden">
                  <Highlight
                    code={snippet.code}
                    language={snippet.language}
                    theme={{
                      plain: {
                        ...defaultStyle,
                        backgroundColor: String(defaultStyle.backgroundColor),
                        fontFamily: 'var(--font-mono)',
                      },
                      styles: []
                    }}
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>

                {snippet.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {snippet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodeSnippets;
