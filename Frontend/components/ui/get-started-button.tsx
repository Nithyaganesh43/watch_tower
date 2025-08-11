"use client"

import type React from "react"

interface GetStartedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function GetStartedButton({ children, onClick, disabled = false, className = "" }: GetStartedButtonProps) {
  return (
    <div className={`button-wrapper ${className}`}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
        </filter>
      </svg>
      <div className="backdrop" />
      <button className={`custom-button ${disabled ? "disabled" : ""}`} onClick={onClick} disabled={disabled}>
        <div className="a l" />
        <div className="a r" />
        <div className="a t" />
        <div className="a b" />
        <div className="text">{children}</div>
      </button>

      <style jsx>{`
        .button-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .custom-button {
          position: relative;
          cursor: pointer;
          border: none;
          width: 200px;
          height: 60px;
          background: #1e293b;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .custom-button.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .text {
          position: relative;
          z-index: 1;
        }
        
        .custom-button::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(
              circle at 50% 50%,
              transparent 0,
              transparent 20%,
              rgba(59, 130, 246, 0.3) 50%
            ),
            radial-gradient(ellipse 100% 100%, #3b82f6, transparent);
          background-size: 3px 3px, auto auto;
          transition: 0.3s;
          border-radius: 8px;
        }
        
        .custom-button:hover::before {
          opacity: 0.4;
        }
        
        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -40px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: transparent, rgba(59, 130, 246, 0.3) var(--s), rgba(59, 130, 246, 0.6) var(--s), #3b82f6, rgba(59, 130, 246, 0.6) var(--e), rgba(59, 130, 246, 0.3) var(--e), transparent;
        }
        
        .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(4px) url(#unopaq);
          z-index: -2;
        }
        
        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px) url(#unopaq);
          opacity: 0;
          z-index: -2;
          transition: 0.3s;
        }
        
        .custom-button:hover .a::after {
          opacity: 1;
        }
        
        .l {
          left: -2px;
        }
        
        .r {
          right: -2px;
        }
        
        .l,
        .r {
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }
        
        .t {
          top: -2px;
        }
        
        .b {
          bottom: -2px;
        }
        
        .t,
        .b {
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }
        
        .backdrop {
          position: absolute;
          inset: -9900%;
          background: radial-gradient(
            circle at 50% 50%,
            transparent 0,
            transparent 20%,
            rgba(30, 41, 59, 0.7) 50%
          );
          background-size: 3px 3px;
          z-index: -1;
        }
      `}</style>
    </div>
  )
}
