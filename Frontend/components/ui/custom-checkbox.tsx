"use client"

interface CustomCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function CustomCheckbox({ checked, onChange, disabled = false }: CustomCheckboxProps) {
  return (
    <label className="checkbox">
      <input
        hidden
        checked={checked}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <svg viewBox="0 0 44 44" className="sizer checkmark">
        <path
          d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
          transform="translate(-2.000000, -2.000000)"
        />
      </svg>
      <style jsx>{`
        .checkbox {
          display: block;
          position: relative;
          cursor: pointer;
          user-select: none;
        }
        .checkbox input {
          cursor: none;
          position: absolute;
          pointer-events: none;
          opacity: 0;
          height: 0;
          width: 0;
        }
        .checkmark {
          --sizer: var(--toast-success-sz, 40px);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          stroke-width: 6;
          stroke-linecap: round;
          stroke-linejoin: round;
          z-index: 1;
          border-radius: 999px;
        }
        .checkmark,
        .checkmark path {
          transition: all 0.5s linear 0s, stroke 0.15s, fill 0.15s;
        }
        .checkbox input:checked ~ .checkmark {
          fill: hsl(108, 62%, 55%);
          stroke: hsl(0, 0%, 100%);
        }
        .checkbox input:checked ~ .checkmark path {
          animation: checked_success 0.8s linear 0s both;
          stroke-dashoffset: 162.6;
          stroke-dasharray: 0 162.6 28 134.6;
        }
        .checkbox input:where(:not(:checked)) ~ .checkmark {
          fill: hsl(0, 0%, 100%);
          stroke: hsl(0, 62%, 55%);
        }
        .checkbox input:where(:not(:checked)) ~ .checkmark path {
          stroke-dashoffset: 162.6;
          stroke-dasharray: 0 200 158 134.6;
        }
        .sizer {
          width: var(--sizer);
          min-width: var(--sizer);
          max-width: var(--sizer);
          height: var(--sizer);
          min-height: var(--sizer);
          max-height: var(--sizer);
        }
        @keyframes checked_success {
          0% {
            stroke-dashoffset: 162.6;
            stroke-dasharray: 0 162.6 28 134.6;
          }
          100% {
            stroke-dashoffset: 162.6;
            stroke-dasharray: 0 162.6 28 134.6;
          }
        }
      `}</style>
    </label>
  )
}
