import React from 'react';
export function GlassPanel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-6 ${className}`}
      style={{
        boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      {children}
    </div>
  );
}
