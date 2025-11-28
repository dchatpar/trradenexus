import React, { useRef, useState, useEffect } from 'react';
import { motion, HTMLMotionProps, useInView } from 'framer-motion';
import { UserCircleIcon } from '../Icons';

// --- Types ---
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'shiny';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  pulse?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

// --- Layout Primitives ---
export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <section id={id} className={`relative w-full overflow-hidden ${className}`}>
    {children}
  </section>
);

// --- Image With Fallback ---
interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className, fallback, ...props }) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [src]);

    if (error || !src) {
        return (
            <div className={`flex items-center justify-center bg-slate-800 text-slate-500 overflow-hidden ${className}`}>
                {fallback || <UserCircleIcon className="h-full w-full p-2 opacity-50" />}
            </div>
        );
    }

    return (
        <img 
            src={src} 
            alt={alt} 
            className={className} 
            onError={() => setError(true)}
            loading="lazy"
            {...props} 
        />
    );
};

// --- Text Reveal Component ---
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: 'center' }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Skeleton Component ---
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-shimmer bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:1000px_100%] rounded-md ${className}`} />
);

// --- Border Beam Component ---
interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": delay,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-ratio-[1] after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:calc(var(--delay)*1s)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))] ${className}`}
    />
  );
};

// --- Background Beams Component ---
export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent opacity-30" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-500/10 to-transparent opacity-30" />
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-30" />
      <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-30" />
    </div>
  );
};

// --- Animated Shapes Component ---
export const AnimatedShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl border border-white/5 opacity-50"
      />
      <motion.div
        animate={{
          y: [0, 60, 0],
          x: [0, -30, 0],
          rotate: [0, -180],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[60%] right-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-2xl border border-white/5 opacity-50"
      />
    </div>
  );
};

// --- Animated Gradient Background ---
export const AnimatedGradientBackground: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className = "", children }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-orange-500/20 animate-gradient-xy bg-[length:400%_400%] blur-[60px] opacity-60 mix-blend-screen pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// --- Scroll Reveal Wrapper ---
export const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Glass Card (Interactive) ---
interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  spotlight?: boolean;
  animatedGradient?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  noPadding = false,
  spotlight = false,
  animatedGradient = false,
  onClick,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotlight) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => { if(spotlight) setOpacity(1); };
  const handleMouseLeave = () => { if(spotlight) setOpacity(0); };

  const isInteractive = !!onClick || props.whileHover;

  return (
    <motion.div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      whileHover={isInteractive ? { y: -4, transition: { duration: 0.2 } } : undefined}
      transition={{ duration: 0.4 }}
      className={`
        relative overflow-hidden rounded-2xl border border-white/[0.08] 
        bg-slate-950/40 backdrop-blur-xl shadow-2xl 
        ${noPadding ? '' : 'p-6'} 
        ${className}
      `}
      {...props}
    >
      {animatedGradient && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-orange-500/20 animate-gradient-xy bg-[length:400%_400%] opacity-40 mix-blend-soft-light pointer-events-none" />
      )}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </motion.div>
  );
};

// --- Page Header ---
export const PageHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 animate-fade-in w-full">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight leading-tight">
        {title}
      </h1>
      {subtitle && <p className="text-slate-400 mt-1.5 text-sm md:text-base font-light">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0 w-full md:w-auto">{action}</div>}
  </div>
);

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'brand' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' }> = ({ children, color = 'blue' }) => {
  const colors = {
    brand: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    green: 'bg-green-500/10 text-green-300 border-green-500/20',
    red: 'bg-red-500/10 text-red-300 border-red-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    gray: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm cursor-default ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- Button ---
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  pulse = false,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transform-gpu whitespace-nowrap select-none";
  
  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)] border border-white/10',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600',
    outline: 'bg-transparent hover:bg-slate-800 text-slate-200 border border-slate-700',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white',
    danger: 'bg-red-900/30 hover:bg-red-900/50 text-red-200 border border-red-800',
    shiny: 'bg-slate-950 text-white border border-slate-800 hover:border-slate-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs h-8',
    md: 'px-4 py-2.5 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12',
  };

  const motionProps = {
    whileHover: { scale: 1.02, brightness: 1.1 },
    whileTap: { scale: 0.98 },
    animate: pulse ? {
      boxShadow: [
        "0 0 0 0 rgba(249, 115, 22, 0)",
        "0 0 0 10px rgba(249, 115, 22, 0.1)",
        "0 0 0 20px rgba(249, 115, 22, 0)"
      ],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    } : undefined
  };

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`} 
      {...motionProps}
      {...(props as any)}
    >
      {variant === 'shiny' && (
        <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

// --- Inputs ---
export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>}
    <div className="relative">
        <input 
        className={`w-full px-4 bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 transition-all focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none h-10 ${error ? 'border-red-500' : 'border-slate-700 hover:border-slate-600'}`}
        {...props}
        />
    </div>
    {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
  </div>
);

// --- Data Table ---
export const DataTable: React.FC<{ headers: string[]; children: React.ReactNode }> = ({ headers, children }) => (
  <div className="w-full rounded-xl border border-white/5 bg-slate-900/20 backdrop-blur-sm overflow-hidden flex flex-col">
    {/* Wrapper for responsive scrolling */}
    <div className="w-full overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-white/5">
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/30 whitespace-nowrap sticky top-0 z-10">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-300">
          {children}
        </tbody>
      </table>
    </div>
  </div>
);