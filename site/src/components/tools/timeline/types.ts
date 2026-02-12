import type { EventCategory } from '@/data/bitcoin-timeline';

export interface ViewRange {
  start: number; // timestamp ms
  end: number;
}

export interface TimelineState {
  selectedEvent: string | null;
  hoveredEvent: string | null;
  activeCategories: EventCategory[];
  viewRange: ViewRange;
  isDragging: boolean;
}

export type TimelineAction =
  | { type: 'SELECT_EVENT'; id: string | null }
  | { type: 'HOVER_EVENT'; id: string | null }
  | { type: 'TOGGLE_CATEGORY'; category: EventCategory }
  | { type: 'SET_VIEW_RANGE'; start: number; end: number }
  | { type: 'SET_DRAGGING'; dragging: boolean }
  | { type: 'ZOOM'; factor: number; centerX?: number }
  | { type: 'PAN'; deltaRatio: number }
  | { type: 'RESET_VIEW' };
