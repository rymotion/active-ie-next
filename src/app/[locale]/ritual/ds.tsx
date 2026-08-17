'use client';
// Ritual DS core components, ported from the Ritual Contrast Therapy design system.
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  jp?: string;
};

export function Button({ variant = 'primary', size = 'md', jp, children, style, ...rest }: ButtonProps) {
  const pad = { sm: '6px 14px', md: '10px 22px', lg: '14px 30px' }[size];
  const fs = { sm: 11, md: 13, lg: 15 }[size];
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-caps)', fontSize: fs, padding: pad,
    border: 'var(--border-hairline)', borderRadius: 0, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: 'var(--ink)',
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--ink)', color: 'var(--bone)' },
    outline: {},
    ghost: { border: '1.5px solid transparent' },
    accent: { background: 'var(--accent)', color: 'var(--bone)', borderColor: 'var(--accent)' },
  };
  const hovers: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--accent)', borderColor: 'var(--accent)' },
    outline: { background: 'var(--ink)', color: 'var(--bone)' },
    ghost: { borderBottomColor: 'var(--ink)' },
    accent: { background: 'var(--accent-deep)', borderColor: 'var(--accent-deep)' },
  };
  const [hover, setHover] = React.useState(false);
  return (
    <button {...rest} style={{ ...base, ...variants[variant], ...(hover ? hovers[variant] : null), ...style }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      {jp && <span style={{ fontFamily: 'var(--font-jp)', fontWeight: 500, letterSpacing: '0.2em', opacity: 0.8 }}>{jp}</span>}
    </button>
  );
}

export function Tag({ variant = 'outline', children, style }: {
  variant?: 'outline' | 'ink' | 'accent' | 'cedar'; children: React.ReactNode; style?: React.CSSProperties;
}) {
  const variants: Record<string, React.CSSProperties> = {
    outline: { border: 'var(--border-hairline)', color: 'var(--ink)' },
    ink: { background: 'var(--ink)', color: 'var(--bone)' },
    accent: { background: 'var(--accent)', color: 'var(--bone)' },
    cedar: { background: 'var(--cedar-500)', color: 'var(--bone)' },
  };
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
      textTransform: 'uppercase', padding: '3px 9px', display: 'inline-block', ...variants[variant], ...style }}>
      {children}
    </span>
  );
}

export function PatternBand({ pattern = 'alon', height = 48, color = 'var(--ink)', scale = 1, style }: {
  pattern?: string; height?: number; color?: string; scale?: number; style?: React.CSSProperties;
}) {
  const url = `url('/ritual/${pattern}.svg')`;
  return (
    <div aria-hidden style={{ height, background: color,
      WebkitMaskImage: url, maskImage: url, WebkitMaskRepeat: 'repeat', maskRepeat: 'repeat',
      WebkitMaskSize: `${40 * scale}px auto`, maskSize: `${40 * scale}px auto`, ...style }} />
  );
}
