'use client';

/**
 * Subtle diagonal light beams (soft cyan → violet). Single smooth gradient wash.
 */
export function LightBeams() {
  return (
    <>
      <style>{`
        @keyframes light-beams-flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 40% 40%; }
        }
      `}</style>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          backgroundImage:
            'linear-gradient(135deg, transparent 0%, rgba(148,163,184,0.04) 15%, rgba(103,232,249,0.06) 28%, rgba(167,139,250,0.07) 42%, rgba(148,163,184,0.04) 58%, transparent 72%, transparent 100%)',
          backgroundSize: '55% 140%',
          backgroundPosition: '0% 0%',
          backgroundRepeat: 'repeat',
          animation: 'light-beams-flow 25s linear infinite',
        }}
      />
    </>
  );
}
