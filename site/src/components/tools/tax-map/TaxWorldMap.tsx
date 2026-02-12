import { useReducer, useCallback, useMemo } from 'react';
import type { TaxMapState, TaxMapAction, TaxRegime } from './types';
import { getCountryByCode, searchCountries, filterByRegime, DEFAULT_COMPARISON, FLAG_EMOJI, TAX_DATA } from './tax-data';
import WorldMap from './WorldMap';
import MapLegend from './MapLegend';
import CountryDetail from './CountryDetail';
import CountryComparison from './CountryComparison';

const initialState: TaxMapState = {
  selectedCountry: null,
  comparedCountries: DEFAULT_COMPARISON,
  hoveredCountry: null,
  detailOpen: false,
  comparisonOpen: true,
  searchQuery: '',
  filterRegime: 'all',
};

function reducer(state: TaxMapState, action: TaxMapAction): TaxMapState {
  switch (action.type) {
    case 'SELECT_COUNTRY':
      return { ...state, selectedCountry: action.code, detailOpen: true };
    case 'CLOSE_DETAIL':
      return { ...state, detailOpen: false, selectedCountry: null };
    case 'HOVER_COUNTRY':
      return { ...state, hoveredCountry: action.code };
    case 'ADD_COMPARISON':
      if (state.comparedCountries.length >= 4 || state.comparedCountries.includes(action.code)) return state;
      return { ...state, comparedCountries: [...state.comparedCountries, action.code], comparisonOpen: true };
    case 'REMOVE_COMPARISON':
      return { ...state, comparedCountries: state.comparedCountries.filter(c => c !== action.code) };
    case 'CLEAR_COMPARISON':
      return { ...state, comparedCountries: [], comparisonOpen: false };
    case 'TOGGLE_COMPARISON':
      return { ...state, comparisonOpen: !state.comparisonOpen };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query };
    case 'SET_FILTER':
      return { ...state, filterRegime: action.regime };
    default:
      return state;
  }
}

export default function TaxWorldMap() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectedCountryData = state.selectedCountry
    ? getCountryByCode(state.selectedCountry)
    : undefined;

  // Compute search matches
  const searchMatches = useMemo(() => {
    if (!state.searchQuery.trim()) return new Set<string>();
    const matches = searchCountries(state.searchQuery);
    return new Set(matches.map(c => c.code));
  }, [state.searchQuery]);

  // Filtered country list for search results
  const filteredCountries = useMemo(() => {
    let list = state.searchQuery.trim()
      ? searchCountries(state.searchQuery)
      : TAX_DATA;
    if (state.filterRegime !== 'all') {
      list = list.filter(c => c.regime === state.filterRegime);
    }
    return list;
  }, [state.searchQuery, state.filterRegime]);

  const handleSelectCountry = useCallback((code: string) => {
    dispatch({ type: 'SELECT_COUNTRY', code });
  }, []);

  const handleHoverCountry = useCallback((code: string | null) => {
    dispatch({ type: 'HOVER_COUNTRY', code });
  }, []);

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un pays..."
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', query: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-gold)] transition-colors"
          />
        </div>
        <MapLegend
          activeFilter={state.filterRegime}
          onFilter={(regime) => dispatch({ type: 'SET_FILTER', regime })}
        />
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Map */}
        <div className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 overflow-hidden">
          <WorldMap
            filterRegime={state.filterRegime}
            searchMatches={searchMatches}
            selectedCountry={state.selectedCountry}
            onSelectCountry={handleSelectCountry}
            onHoverCountry={handleHoverCountry}
          />

          {/* Quick list below map on mobile when searching */}
          {state.searchQuery.trim() && (
            <div className="border-t border-[var(--color-border)] p-3 max-h-48 overflow-y-auto lg:hidden">
              {filteredCountries.map(c => (
                <button
                  key={c.code}
                  onClick={() => handleSelectCountry(c.code)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-[var(--color-surface-hover)] cursor-pointer transition-colors"
                >
                  <span>{FLAG_EMOJI[c.code] || ''}</span>
                  <span className="text-[var(--color-text-secondary)]">{c.name}</span>
                  <span className="ml-auto text-xs text-[var(--color-gold)]">{c.rates}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Side panel - detail */}
        {state.detailOpen && selectedCountryData && (
          <div className="lg:w-80 flex-shrink-0">
            <CountryDetail
              country={selectedCountryData}
              isCompared={state.comparedCountries.includes(selectedCountryData.code)}
              onClose={() => dispatch({ type: 'CLOSE_DETAIL' })}
              onAddComparison={(code) => dispatch({ type: 'ADD_COMPARISON', code })}
            />
          </div>
        )}
      </div>

      {/* Comparison table */}
      {state.comparisonOpen && state.comparedCountries.length > 0 && (
        <CountryComparison
          comparedCodes={state.comparedCountries}
          onRemove={(code) => dispatch({ type: 'REMOVE_COMPARISON', code })}
          onAdd={(code) => dispatch({ type: 'ADD_COMPARISON', code })}
          onClear={() => dispatch({ type: 'CLEAR_COMPARISON' })}
        />
      )}

      {/* Comparison toggle */}
      {state.comparedCountries.length > 0 && !state.comparisonOpen && (
        <button
          onClick={() => dispatch({ type: 'TOGGLE_COMPARISON' })}
          className="w-full py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-violet)] hover:text-[var(--color-violet-light)] transition-colors cursor-pointer"
        >
          Afficher la comparaison ({state.comparedCountries.length} pays)
        </button>
      )}
    </div>
  );
}
