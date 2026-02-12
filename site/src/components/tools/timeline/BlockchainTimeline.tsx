import { useReducer, useCallback, useMemo, useRef } from 'react';
import type { EventCategory } from '@/data/bitcoin-timeline';
import { TIMELINE_EVENTS, BTC_PRICE_HISTORY } from '@/data/bitcoin-timeline';
import type { TimelineState, TimelineAction, ViewRange } from './types';
import { SVG, ERA_PRESETS, ALL_CATEGORIES, MIN_RANGE_MS, MAX_RANGE_MS, CATEGORY_CONFIG } from './constants';
import PriceCurve from './PriceCurve';
import EventMarker from './EventMarker';
import EventDetail from './EventDetail';
import TimelineControls from './TimelineControls';

// ── Reducer ───────────────────────────────────────────────

const initialState: TimelineState = {
  selectedEvent: null,
  hoveredEvent: null,
  activeCategories: [...ALL_CATEGORIES],
  viewRange: { start: ERA_PRESETS['all'].start, end: ERA_PRESETS['all'].end },
  isDragging: false,
};

function clampRange(start: number, end: number): ViewRange {
  let range = end - start;
  if (range < MIN_RANGE_MS) {
    const mid = (start + end) / 2;
    start = mid - MIN_RANGE_MS / 2;
    end = mid + MIN_RANGE_MS / 2;
    range = MIN_RANGE_MS;
  }
  if (range > MAX_RANGE_MS) {
    const mid = (start + end) / 2;
    start = mid - MAX_RANGE_MS / 2;
    end = mid + MAX_RANGE_MS / 2;
  }
  // Don't go before 2008 or after 2026
  const globalMin = Date.parse('2008-01-01');
  const globalMax = Date.parse('2026-01-01');
  if (start < globalMin) { end += globalMin - start; start = globalMin; }
  if (end > globalMax) { start -= end - globalMax; end = globalMax; }
  return { start, end };
}

function reducer(state: TimelineState, action: TimelineAction): TimelineState {
  switch (action.type) {
    case 'SELECT_EVENT':
      return { ...state, selectedEvent: state.selectedEvent === action.id ? null : action.id };
    case 'HOVER_EVENT':
      return { ...state, hoveredEvent: action.id };
    case 'TOGGLE_CATEGORY': {
      const cats = state.activeCategories;
      const has = cats.includes(action.category);
      const next = has ? cats.filter((c) => c !== action.category) : [...cats, action.category];
      return { ...state, activeCategories: next.length > 0 ? next : cats };
    }
    case 'SET_VIEW_RANGE':
      return { ...state, viewRange: clampRange(action.start, action.end) };
    case 'SET_DRAGGING':
      return { ...state, isDragging: action.dragging };
    case 'ZOOM': {
      const { start, end } = state.viewRange;
      const mid = (start + end) / 2;
      const half = ((end - start) / 2) * action.factor;
      return { ...state, viewRange: clampRange(mid - half, mid + half) };
    }
    case 'PAN': {
      const { start, end } = state.viewRange;
      const delta = (end - start) * action.deltaRatio;
      return { ...state, viewRange: clampRange(start + delta, end + delta) };
    }
    case 'RESET_VIEW':
      return { ...state, viewRange: { start: ERA_PRESETS['all'].start, end: ERA_PRESETS['all'].end } };
    default:
      return state;
  }
}

// ── Projection helpers ────────────────────────────────────

function makeTimeToX(viewRange: ViewRange) {
  const { left, right } = SVG.padding;
  const usable = SVG.width - left - right;
  return (timestamp: number) => left + ((timestamp - viewRange.start) / (viewRange.end - viewRange.start)) * usable;
}

function makePriceToY(minLog: number, maxLog: number) {
  const top = SVG.padding.top;
  const bottom = SVG.priceAreaBottom;
  const usable = bottom - top;
  return (price: number) => {
    const log = Math.log10(Math.max(price, 0.001));
    return bottom - ((log - minLog) / (maxLog - minLog)) * usable;
  };
}

// ── Component ─────────────────────────────────────────────

export default function BlockchainTimeline() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ startX: number; startRange: ViewRange } | null>(null);

  // ── Projection functions
  const timeToX = useMemo(() => makeTimeToX(state.viewRange), [state.viewRange]);

  const { priceToY, minLog, maxLog } = useMemo(() => {
    const prices = BTC_PRICE_HISTORY.filter((p) => p.price > 0).map((p) => p.price);
    const mn = Math.log10(Math.min(...prices));
    const mx = Math.log10(Math.max(...prices));
    return { priceToY: makePriceToY(mn - 0.5, mx + 0.3), minLog: mn - 0.5, maxLog: mx + 0.3 };
  }, []);

  // ── Filtered events
  const visibleEvents = useMemo(() => {
    return TIMELINE_EVENTS.filter((e) => state.activeCategories.includes(e.category));
  }, [state.activeCategories]);

  // ── Compute event positions with collision stagger
  const eventPositions = useMemo(() => {
    const positions = visibleEvents.map((e) => ({
      event: e,
      x: timeToX(Date.parse(e.date)),
      yOffset: 0,
    }));

    // Sort by x for collision detection
    positions.sort((a, b) => a.x - b.x);

    // Stagger overlapping events
    for (let i = 1; i < positions.length; i++) {
      for (let j = i - 1; j >= 0 && j >= i - 4; j--) {
        if (Math.abs(positions[i].x - positions[j].x) < 14 &&
            Math.abs(positions[i].yOffset - positions[j].yOffset) < 14) {
          positions[i].yOffset = positions[j].yOffset + (positions[j].yOffset >= 0 ? -16 : 16);
        }
      }
    }

    return positions;
  }, [visibleEvents, timeToX]);

  // ── Selected event
  const selectedEvent = useMemo(
    () => (state.selectedEvent ? TIMELINE_EVENTS.find((e) => e.id === state.selectedEvent) || null : null),
    [state.selectedEvent],
  );

  // ── Year grid lines
  const yearLines = useMemo(() => {
    const { start, end } = state.viewRange;
    const startYear = new Date(start).getFullYear();
    const endYear = new Date(end).getFullYear();
    const lines: { x: number; year: number }[] = [];
    for (let y = startYear; y <= endYear + 1; y++) {
      const t = Date.parse(`${y}-01-01`);
      const x = timeToX(t);
      if (x >= SVG.padding.left && x <= SVG.width - SVG.padding.right) {
        lines.push({ x, year: y });
      }
    }
    return lines;
  }, [state.viewRange, timeToX]);

  // ── Pointer handlers (drag to pan)
  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if ((e.target as Element).getAttribute('role') === 'button') return;
    const svg = svgRef.current;
    if (!svg) return;
    svg.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startRange: { ...state.viewRange } };
    dispatch({ type: 'SET_DRAGGING', dragging: true });
  }, [state.viewRange]);

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = e.clientX - dragRef.current.startX;
    const ratio = -dx / rect.width;
    const { start, end } = dragRef.current.startRange;
    const range = end - start;
    dispatch({ type: 'SET_VIEW_RANGE', start: start + ratio * range, end: end + ratio * range });
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = null;
    dispatch({ type: 'SET_DRAGGING', dragging: false });
    const svg = svgRef.current;
    if (svg) svg.releasePointerCapture(e.pointerId);
  }, []);

  // ── Wheel handler (zoom)
  const handleWheel = useCallback((e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Horizontal scroll = pan
      const ratio = e.deltaX / 800;
      dispatch({ type: 'PAN', deltaRatio: ratio });
    } else {
      // Vertical scroll = zoom
      const factor = e.deltaY > 0 ? 1.15 : 0.87;
      dispatch({ type: 'ZOOM', factor });
    }
  }, []);

  // ── Keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        dispatch({ type: 'PAN', deltaRatio: -0.1 });
        break;
      case 'ArrowRight':
        e.preventDefault();
        dispatch({ type: 'PAN', deltaRatio: 0.1 });
        break;
      case '+':
      case '=':
        e.preventDefault();
        dispatch({ type: 'ZOOM', factor: 0.75 });
        break;
      case '-':
        e.preventDefault();
        dispatch({ type: 'ZOOM', factor: 1.3 });
        break;
    }
  }, []);

  // ── Callbacks for controls
  const handleToggleCategory = useCallback((cat: EventCategory) => {
    dispatch({ type: 'TOGGLE_CATEGORY', category: cat });
  }, []);

  const handleSetEra = useCallback((start: number, end: number) => {
    dispatch({ type: 'SET_VIEW_RANGE', start, end });
  }, []);

  const handleZoom = useCallback((factor: number) => {
    dispatch({ type: 'ZOOM', factor });
  }, []);

  const handleSelectEvent = useCallback((id: string) => {
    dispatch({ type: 'SELECT_EVENT', id });
  }, []);

  const handleHoverEvent = useCallback((id: string | null) => {
    dispatch({ type: 'HOVER_EVENT', id });
  }, []);

  const handleCloseDetail = useCallback(() => {
    dispatch({ type: 'SELECT_EVENT', id: null });
  }, []);

  // ── Hovered event tooltip
  const hoveredEvent = state.hoveredEvent
    ? TIMELINE_EVENTS.find((e) => e.id === state.hoveredEvent)
    : null;
  const hoveredPos = state.hoveredEvent
    ? eventPositions.find((p) => p.event.id === state.hoveredEvent)
    : null;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-4 md:p-6">
      {/* Controls */}
      <TimelineControls
        activeCategories={state.activeCategories}
        onToggleCategory={handleToggleCategory}
        onSetEra={handleSetEra}
        onZoom={handleZoom}
        currentStart={state.viewRange.start}
        currentEnd={state.viewRange.end}
      />

      {/* SVG Timeline */}
      <div className="relative select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG.width} ${SVG.height}`}
          className="w-full"
          style={{ cursor: state.isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
          role="img"
          aria-label="Timeline interactive de l'histoire de Bitcoin de 2008 a 2025"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
        >
          {/* Year grid lines */}
          {yearLines.map(({ x, year }) => (
            <g key={year}>
              <line
                x1={x}
                y1={SVG.padding.top}
                x2={x}
                y2={SVG.axisY}
                stroke="var(--color-border)"
                strokeOpacity="0.15"
              />
              <text
                x={x}
                y={SVG.height - 8}
                textAnchor="middle"
                fill="var(--color-text-muted)"
                fontSize="11"
                fontFamily="var(--font-mono, monospace)"
              >
                {year}
              </text>
            </g>
          ))}

          {/* Horizontal axis */}
          <line
            x1={SVG.padding.left}
            y1={SVG.axisY}
            x2={SVG.width - SVG.padding.right}
            y2={SVG.axisY}
            stroke="var(--color-border)"
            strokeOpacity="0.3"
          />

          {/* Price curve */}
          <PriceCurve
            pricePoints={BTC_PRICE_HISTORY}
            timeToX={timeToX}
            priceToY={priceToY}
            viewStart={state.viewRange.start}
            viewEnd={state.viewRange.end}
          />

          {/* Event markers */}
          {eventPositions.map(({ event, x, yOffset }) => {
            const priceY = event.btcPrice != null ? priceToY(event.btcPrice) : null;
            return (
              <EventMarker
                key={event.id}
                event={event}
                x={x}
                yOffset={yOffset}
                isSelected={state.selectedEvent === event.id}
                isHovered={state.hoveredEvent === event.id}
                onSelect={handleSelectEvent}
                onHover={handleHoverEvent}
                priceY={priceY}
              />
            );
          })}
        </svg>

        {/* Tooltip for hovered event (HTML overlay, not SVG) */}
        {hoveredEvent && hoveredPos && state.hoveredEvent !== state.selectedEvent && (
          <div
            className="absolute pointer-events-none z-10 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/95 shadow-lg backdrop-blur-sm max-w-[240px]"
            style={{
              left: `${(hoveredPos.x / SVG.width) * 100}%`,
              top: `${((SVG.eventRowY + hoveredPos.yOffset - 50) / SVG.height) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: CATEGORY_CONFIG[hoveredEvent.category].color }}
              />
              <span className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                {hoveredEvent.title}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)] font-mono">
              <span>{hoveredEvent.date}</span>
              {hoveredEvent.btcPrice != null && (
                <span className="text-[var(--color-gold)]">
                  {hoveredEvent.btcPrice >= 1000
                    ? `${(hoveredEvent.btcPrice / 1000).toFixed(hoveredEvent.btcPrice >= 10000 ? 0 : 1)}k $`
                    : `${hoveredEvent.btcPrice} $`}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Drag hint */}
      <p className="text-[10px] text-[var(--color-text-muted)] mt-2 text-center">
        Glissez pour naviguer, scrollez pour zoomer, cliquez sur un evenement pour le detail
      </p>

      {/* Event detail card */}
      {selectedEvent && (
        <EventDetail event={selectedEvent} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
