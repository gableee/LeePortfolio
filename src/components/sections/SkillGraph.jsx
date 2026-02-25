import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { skillsData } from '../../data/portfolio';
import { useTheme } from '../../hooks/useTheme';
import { useInView } from '../../hooks/useInView';

// Color map by category
const CATEGORY_COLORS = {
  'Frontend Core': '#61DAFB',
  'Styling & Design': '#06B6D4',
  'Tools & Infrastructure': '#F05032',
  'Architecture & Patterns': '#8B5CF6',
};

// Edges: skills that are related within or across categories
const SKILL_EDGES = [
  ['React / Next.js', 'TypeScript'],
  ['React / Next.js', 'JavaScript (ES2024)'],
  ['React / Next.js', 'Component Design'],
  ['React / Next.js', 'State Management'],
  ['React / Next.js', 'Tailwind CSS'],
  ['TypeScript', 'JavaScript (ES2024)'],
  ['HTML5 / CSS3', 'CSS Architecture'],
  ['HTML5 / CSS3', 'Responsive Design'],
  ['HTML5 / CSS3', 'Accessibility (a11y)'],
  ['Tailwind CSS', 'CSS Architecture'],
  ['Tailwind CSS', 'Responsive Design'],
  ['Figma / Design Tools', 'Responsive Design'],
  ['Git / GitHub', 'CI/CD Pipelines'],
  ['Vite / Webpack', 'Performance Optimization'],
  ['Testing (Jest/Vitest)', 'CI/CD Pipelines'],
  ['Component Design', 'State Management'],
  ['Component Design', 'Accessibility (a11y)'],
  ['Performance Optimization', 'Accessibility (a11y)'],
  ['State Management', 'Performance Optimization'],
];

function buildGraphData() {
  const nodes = [];
  const links = [];

  // Create nodes
  skillsData.forEach((category) => {
    category.skills.forEach((skill) => {
      nodes.push({
        id: skill.name,
        label: skill.name,
        level: skill.level,
        category: category.category,
        color: CATEGORY_COLORS[category.category] || '#06b6d4',
        // Node size based on skill level
        val: skill.level / 15,
      });
    });
  });

  // Create edges
  const nodeIds = new Set(nodes.map((n) => n.id));
  SKILL_EDGES.forEach(([source, target]) => {
    if (nodeIds.has(source) && nodeIds.has(target)) {
      links.push({ source, target });
    }
  });

  return { nodes, links };
}

export default function SkillGraph() {
  const graphRef = useRef(null);
  const containerRef = useRef(null);
  const [containerRef2, isInView] = useInView({ threshold: 0.2 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const graphData = useMemo(() => buildGraphData(), []);

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.min(Math.max(rect.width * 0.6, 350), 500),
        });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Cool down the simulation after initial layout
  useEffect(() => {
    if (graphRef.current && isInView) {
      graphRef.current.d3Force('charge').strength(-120);
      graphRef.current.d3Force('link').distance(80);
      // Let it warm up then cool down
      setTimeout(() => {
        graphRef.current?.d3ReheatSimulation();
        setTimeout(() => {
          graphRef.current?.pauseAnimation();
        }, 3000);
      }, 500);
    }
  }, [isInView]);

  const handleNodeHover = useCallback((node) => {
    setHoveredNode(node || null);
    if (graphRef.current) {
      // Resume animation briefly on hover for interactivity
      graphRef.current.resumeAnimation();
      setTimeout(() => graphRef.current?.pauseAnimation(), 2000);
    }
  }, []);

  const nodeCanvasObject = useCallback(
    (node, ctx, globalScale) => {
      const isHovered = hoveredNode?.id === node.id;
      const isConnected =
        hoveredNode &&
        graphData.links.some(
          (l) =>
            (l.source.id === hoveredNode.id && l.target.id === node.id) ||
            (l.target.id === hoveredNode.id && l.source.id === node.id)
        );
      const dimmed = hoveredNode && !isHovered && !isConnected;

      const radius = Math.sqrt(node.val) * 4 + 3;
      const alpha = dimmed ? 0.15 : 1;

      // Outer glow
      if (isHovered || isConnected) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI);
        ctx.fillStyle = `${node.color}33`;
        ctx.fill();
      }

      // Main circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = dimmed ? (isDark ? '#333333' : '#d4d4d8') : node.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Border
      ctx.strokeStyle = dimmed
        ? 'transparent'
        : isHovered
          ? '#ffffff'
          : `${node.color}60`;
      ctx.lineWidth = isHovered ? 2 : 0.5;
      ctx.stroke();

      // Label (only at sufficient zoom or on hover)
      if (globalScale > 0.8 || isHovered) {
        const label = node.label.split('/')[0].split('(')[0].trim();
        const fontSize = isHovered ? 12 / globalScale : 9 / globalScale;
        ctx.font = `${isHovered ? 600 : 400} ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = dimmed
          ? 'transparent'
          : isHovered
            ? '#ffffff'
            : isDark
              ? '#a1a1aa'
              : '#52525b';
        ctx.globalAlpha = alpha;
        ctx.fillText(label, node.x, node.y + radius + 3);
        ctx.globalAlpha = 1;
      }
    },
    [hoveredNode, graphData.links, isDark]
  );

  const linkColor = useCallback(
    (link) => {
      if (!hoveredNode) return isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(8, 145, 178, 0.06)';
      const isConnected =
        link.source.id === hoveredNode.id || link.target.id === hoveredNode.id;
      return isConnected
        ? isDark
          ? 'rgba(6, 182, 212, 0.4)'
          : 'rgba(8, 145, 178, 0.3)'
        : isDark
          ? 'rgba(6, 182, 212, 0.03)'
          : 'rgba(8, 145, 178, 0.02)';
    },
    [hoveredNode, isDark]
  );

  const bgColor = isDark ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)';

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        containerRef2(node);
      }}
      className="relative"
    >
      {/* Graph */}
      <div
        className="overflow-hidden rounded-lg border border-accent/10"
        style={{ height: dimensions.height }}
      >
        {isInView && (
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor={bgColor}
            nodeCanvasObject={nodeCanvasObject}
            nodePointerAreaPaint={(node, color, ctx) => {
              const radius = Math.sqrt(node.val) * 4 + 6;
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
              ctx.fillStyle = color;
              ctx.fill();
            }}
            linkColor={linkColor}
            linkWidth={(link) => {
              if (!hoveredNode) return 0.5;
              const isConnected =
                link.source.id === hoveredNode.id || link.target.id === hoveredNode.id;
              return isConnected ? 2 : 0.3;
            }}
            onNodeHover={handleNodeHover}
            cooldownTime={3000}
            enableZoomInteraction={false}
            enablePanInteraction={false}
            enableNodeDrag={true}
          />
        )}
      </div>

      {/* Hover tooltip */}
      {hoveredNode && (
        <div className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2">
          <div
            className={`rounded-lg border px-4 py-2.5 backdrop-blur-md ${
              isDark
                ? 'border-accent/30 bg-navy-800/95 text-slate-light'
                : 'border-accent/20 bg-white/95 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: hoveredNode.color }}
              />
              <div>
                <div className="font-mono text-sm font-semibold">{hoveredNode.label}</div>
                <div className="font-mono text-[10px] text-slate-dark">
                  {hoveredNode.category} &middot; {hoveredNode.level}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div
            key={cat}
            className="flex items-center gap-1.5 font-mono text-[10px] text-slate-dark sm:text-xs"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}
