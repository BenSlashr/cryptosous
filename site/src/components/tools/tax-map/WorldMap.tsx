import { useState, useCallback, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from '@vnedyalk0v/react19-simple-maps';
import { getCountryByNumericCode, getRegimeColor, NUMERIC_TO_ALPHA2 } from './tax-data';
import type { TaxRegime } from './types';
import type { CountryTaxInfo } from './types';
import MapTooltip from './MapTooltip';

const GEO_URL = '/data/countries-110m.json';

interface WorldMapProps {
  filterRegime: TaxRegime | 'all';
  searchMatches: Set<string>; // set of alpha-2 codes matching search
  selectedCountry: string | null;
  onSelectCountry: (code: string) => void;
  onHoverCountry: (code: string | null) => void;
}

function WorldMapInner({
  filterRegime,
  searchMatches,
  selectedCountry,
  onSelectCountry,
  onHoverCountry,
}: WorldMapProps) {
  const [tooltip, setTooltip] = useState<{
    country: CountryTaxInfo;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseEnter = useCallback(
    (geo: { id: string }, evt: React.MouseEvent) => {
      const numericId = geo.id;
      const alpha2 = NUMERIC_TO_ALPHA2[numericId];
      if (alpha2) {
        onHoverCountry(alpha2);
        const country = getCountryByNumericCode(numericId);
        if (country) {
          setTooltip({ country, x: evt.clientX, y: evt.clientY });
        }
      }
    },
    [onHoverCountry]
  );

  const handleMouseMove = useCallback(
    (geo: { id: string }, evt: React.MouseEvent) => {
      const numericId = geo.id;
      const country = getCountryByNumericCode(numericId);
      if (country) {
        setTooltip({ country, x: evt.clientX, y: evt.clientY });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    onHoverCountry(null);
    setTooltip(null);
  }, [onHoverCountry]);

  const handleClick = useCallback(
    (geo: { id: string }) => {
      const alpha2 = NUMERIC_TO_ALPHA2[geo.id];
      if (alpha2) {
        onSelectCountry(alpha2);
      }
    },
    [onSelectCountry]
  );

  const getFillColor = useCallback(
    (geoId: string): string => {
      const alpha2 = NUMERIC_TO_ALPHA2[geoId];
      if (!alpha2) return '#0E1525'; // surface color for unknown

      const country = getCountryByNumericCode(geoId);
      if (!country) return '#0E1525';

      // Dim countries not matching filter
      if (filterRegime !== 'all' && country.regime !== filterRegime) {
        return '#0E1525';
      }

      // Dim countries not matching search
      if (searchMatches.size > 0 && !searchMatches.has(alpha2)) {
        return '#0E1525';
      }

      return getRegimeColor(country.regime);
    },
    [filterRegime, searchMatches]
  );

  const getStrokeColor = useCallback(
    (geoId: string): string => {
      const alpha2 = NUMERIC_TO_ALPHA2[geoId];
      if (alpha2 && alpha2 === selectedCountry) return '#F59E0B';
      return '#1E293B';
    },
    [selectedCountry]
  );

  const getStrokeWidth = useCallback(
    (geoId: string): number => {
      const alpha2 = NUMERIC_TO_ALPHA2[geoId];
      if (alpha2 && alpha2 === selectedCountry) return 1.5;
      return 0.5;
    },
    [selectedCountry]
  );

  return (
    <div className="relative w-full">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          center: [0, 20],
          scale: 140,
        }}
        width={800}
        height={420}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: Array<{ rsmKey: string; id: string; svgPath?: string }> }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getFillColor(geo.id)}
                  stroke={getStrokeColor(geo.id)}
                  strokeWidth={getStrokeWidth(geo.id)}
                  onMouseEnter={(evt: React.MouseEvent) => handleMouseEnter(geo, evt)}
                  onMouseMove={(evt: React.MouseEvent) => handleMouseMove(geo, evt)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(geo)}
                  style={{
                    default: { outline: 'none', cursor: NUMERIC_TO_ALPHA2[geo.id] ? 'pointer' : 'default' },
                    hover: {
                      outline: 'none',
                      fill: NUMERIC_TO_ALPHA2[geo.id] ? '#F59E0B' : '#0E1525',
                      fillOpacity: NUMERIC_TO_ALPHA2[geo.id] ? 0.7 : 1,
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <MapTooltip
          country={tooltip.country}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
    </div>
  );
}

export default memo(WorldMapInner);
