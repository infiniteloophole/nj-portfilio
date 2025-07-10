import { 
  ComponentType, 
  lazy, 
  Suspense, 
  LazyExoticComponent, 
  ReactNode,
  FC,
  useState,
  useEffect,
  useRef
} from 'react';

/**
 * Creates a lazy-loaded component with preloading capability
 * @param importFn Function that returns a dynamic import()
 * @param fallback Optional fallback component to show while loading
 * @returns Object with LazyComponent and preload function
 */
export function lazyWithPreload<T extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback: ReactNode = null
): { LazyComponent: ComponentType<T>; preload: () => Promise<void> } {
  let PreloadedComponent: LazyExoticComponent<ComponentType<T>> | null = null;
  let preloadPromise: Promise<void> | null = null;
  let componentPromise: Promise<{ default: ComponentType<T> }> | null = null;

  const loadComponent = (): Promise<void> => {
    if (!preloadPromise) {
      componentPromise = importFn();
      preloadPromise = componentPromise.then(module => {
        PreloadedComponent = lazy(() => componentPromise as Promise<{ default: ComponentType<T> }>);
      });
    }
    return preloadPromise;
  };

  // Start loading immediately
  loadComponent();

  const LazyComponent: FC<T> = (props: T) => {
    const [, setLoaded] = useState(false);

    useEffect(() => {
      if (!PreloadedComponent) {
        loadComponent().then(() => {
          setLoaded(true);
        });
      }
    }, [PreloadedComponent]);

    if (!PreloadedComponent) {
      return <>{fallback}</>;
    }

    return (
      <Suspense fallback={fallback}>
        {/* @ts-expect-error - Dynamic import type - TypeScript has issues with dynamic component spread */}
        <PreloadedComponent {...props} />
      </Suspense>
    );
  };

  return {
    LazyComponent,
    preload: loadComponent,
  };
}

/**
 * Preloads a component when it's likely to be needed
 * @param importFn Function that returns a dynamic import()
 * @returns Promise that resolves when the component is loaded
 */
export function preloadComponent(
  importFn: () => Promise<{ default: ComponentType<any> }>
): Promise<void> {
  return importFn().then(() => {});
}

/**
 * Creates a component that preloads when it comes into view
 * @param importFn Function that returns a dynamic import()
 * @param fallback Fallback component to show while loading
 * @returns Lazy-loaded component with intersection observer
 */
export function lazyWithIntersection<T extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback: ReactNode = null
): ComponentType<T> {
  const { LazyComponent, preload } = lazyWithPreload(importFn, fallback);
  
  const LazyWithIntersection: FC<T> = (props: T) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            preload();
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          root: null,
          rootMargin: '200px',
          threshold: 0.1,
        }
      );

      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }, []);

    return (
      <div ref={ref}>
        {isVisible ? <LazyComponent {...props as any} /> : fallback}
      </div>
    );
  };

  return LazyWithIntersection;
}
