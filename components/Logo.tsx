export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col leading-tight ${className ?? ''}`}>
      <span
        className="font-bold tracking-tight"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '19px',
          background: 'linear-gradient(to right, #6b21a8, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Alvaro Valle
      </span>
      <span
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '10px',
          color: 'var(--text-2)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        digital solutions
      </span>
    </div>
  )
}
