import { useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils/cn';

/**
 * Procedurally-generated animated SVG circuit board divider.
 * Renders horizontal traces with junction nodes and a travelling glow pulse.
 * @param {number} variant - 0–3 for different trace patterns
 */
export default function CircuitDivider({ variant = 0 }) {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const paths = useMemo(() => {
    const patterns = [
      // Variant 0: Center branch
      {
        traces: [
          'M 0 30 H 180 L 200 15 H 350 L 370 30 H 550 L 570 20 H 700',
          'M 250 30 V 50 H 400 V 30',
        ],
        nodes: [
          { cx: 180, cy: 30 },
          { cx: 350, cy: 15 },
          { cx: 550, cy: 30 },
          { cx: 320, cy: 50 },
        ],
        chips: [{ x: 420, y: 22, w: 30, h: 16 }],
      },
      // Variant 1: Zigzag
      {
        traces: [
          'M 0 25 H 120 L 150 40 H 300 L 330 20 H 480 L 500 35 H 600 L 630 25 H 700',
        ],
        nodes: [
          { cx: 120, cy: 25 },
          { cx: 300, cy: 40 },
          { cx: 480, cy: 20 },
          { cx: 600, cy: 35 },
        ],
        chips: [{ x: 200, y: 32, w: 24, h: 14 }, { x: 520, y: 28, w: 20, h: 12 }],
      },
      // Variant 2: Parallel traces
      {
        traces: [
          'M 0 20 H 250 L 270 35 H 500 L 520 20 H 700',
          'M 0 40 H 160 L 180 25 H 380 L 400 40 H 700',
        ],
        nodes: [
          { cx: 250, cy: 20 },
          { cx: 500, cy: 35 },
          { cx: 160, cy: 40 },
          { cx: 380, cy: 25 },
        ],
        chips: [{ x: 300, y: 14, w: 28, h: 14 }],
      },
      // Variant 3: Complex branch
      {
        traces: [
          'M 0 30 H 100 L 120 15 H 280 L 300 30 H 450 L 470 45 H 580 L 600 30 H 700',
          'M 200 15 V 50 H 350',
          'M 500 45 V 15 H 620',
        ],
        nodes: [
          { cx: 100, cy: 30 },
          { cx: 280, cy: 15 },
          { cx: 450, cy: 30 },
          { cx: 580, cy: 45 },
          { cx: 200, cy: 50 },
        ],
        chips: [{ x: 340, y: 24, w: 32, h: 12 }],
      },
    ];
    return patterns[variant % patterns.length];
  }, [variant]);

  const strokeColor = isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(8, 145, 178, 0.15)';
  const glowColor = isDark ? 'rgba(6, 182, 212, 0.8)' : 'rgba(8, 145, 178, 0.6)';
  const nodeColor = isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(8, 145, 178, 0.35)';
  const chipColor = isDark ? 'rgba(6, 182, 212, 0.12)' : 'rgba(8, 145, 178, 0.08)';

  return (
    <div
      ref={ref}
      className={cn(
        'relative mx-auto h-16 w-full max-w-6xl overflow-hidden px-4 sm:h-20 sm:px-6 lg:px-8',
        'transition-opacity duration-700',
        isInView ? 'opacity-100' : 'opacity-0'
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 700 60"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        {/* Static traces */}
        {paths.traces.map((d, i) => (
          <path
            key={`trace-${i}`}
            d={d}
            stroke={strokeColor}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        ))}

        {/* Junction nodes */}
        {paths.nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <circle cx={node.cx} cy={node.cy} r="3" fill={nodeColor} />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="none"
              stroke={glowColor}
              strokeWidth="0.5"
              opacity={isInView ? '1' : '0'}
              style={{
                transition: 'opacity 0.5s ease-out',
                transitionDelay: `${i * 200}ms`,
              }}
            >
              {isInView && (
                <animate
                  attributeName="r"
                  values="3;7;3"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              )}
              {isInView && (
                <animate
                  attributeName="opacity"
                  values="0.8;0.2;0.8"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </g>
        ))}

        {/* Chip rectangles */}
        {paths.chips.map((chip, i) => (
          <rect
            key={`chip-${i}`}
            x={chip.x}
            y={chip.y}
            width={chip.w}
            height={chip.h}
            rx="2"
            fill={chipColor}
            stroke={strokeColor}
            strokeWidth="0.5"
          />
        ))}

        {/* Travelling glow pulse along first trace */}
        {isInView && paths.traces[0] && (
          <circle r="3" fill={glowColor} className={isDark ? 'circuit-glow' : 'circuit-glow circuit-glow-light'}>
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={paths.traces[0]}
            />
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        )}

        {/* Second pulse on second trace if available */}
        {isInView && paths.traces[1] && (
          <circle r="2" fill={glowColor} opacity="0.7" className={isDark ? 'circuit-glow' : 'circuit-glow circuit-glow-light'}>
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={paths.traces[1]}
              begin="1.5s"
            />
            <animate
              attributeName="opacity"
              values="0.7;0.3;0.7"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}
