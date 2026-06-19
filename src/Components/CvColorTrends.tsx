import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// 1. Típusok definiálása az új struktúrához
interface ColorTrendItem {
  color: string;
  count: number;
}

// A fő objektum típusa (Város név -> Szín trendek tömbje)
type TypeColorTrends = Record<string, ColorTrendItem[]>;

interface ColorTrendsListProps {
  trendsData?: TypeColorTrends;
}

export default function CvColorTrends({ trendsData }: ColorTrendsListProps) {
  // Hardcoded fallback adat, ha nem érkezne meg prop-on keresztül
  const data: TypeColorTrends = trendsData || {
    Berlin: [
      { color: '#2e294e', count: 23 },
      { color: '#1B998B', count: 3 },
      { color: '#F46036', count: 2 },
      { color: '#c5d86d', count: 0 },
    ],
    Stockholm: [
      { color: '#1B998B', count: 16 },
      { color: '#E71D36', count: 1 },
      { color: '#F46036', count: 0 },
      { color: '#2E294E', count: 0 },
    ],
    Dublin: [
      { color: '#DAD7CD', count: 18 },
      { color: '#A3B18A', count: 3 },
      { color: '#588157', count: 2 },
      { color: '#3A5A40', count: 0 },
    ],
    Sydney: [
      { color: '#00A8E8', count: 3 },
      { color: '#007EA7', count: 3 },
      { color: '#003459', count: 1 },
      { color: '#00171F', count: 0 },
    ],
    Tokio: [
      { color: '#641220', count: 20 },
      { color: '#6E1423', count: 0 },
      { color: '#B21E35', count: 0 },
      { color: '#C71F37', count: 0 },
    ],
  };

  return (
    // Flexbox grid, ami szépen rendezi a kártyákat a képernyőn
    <div className="flex flex-wrap gap-6 p-6 justify-center bg-[#1e2530] min-h-screen">
      {/* Végigmegyünk a kulcs-érték párokon (cityName = "Berlin", colorItems = [...] ) */}
      {Object.entries(data).map(([cityName, colorItems]) => {
        // Kiszámoljuk az adott város legmagasabb értékét a chart skálázásához
        const maxCount = Math.max(...colorItems.map((item) => item.count), 1);

        return (
          <div
            key={cityName}
            className="bg-[#243042] text-white p-6 rounded-2xl w-[420px] border border-sky-500/10 shadow-2xl font-sans"
          >
            {/* Kártya címe */}
            <h3 className="text-xl font-semibold text-gray-400 mb-4 px-2">
              {cityName}
            </h3>

            {/* Recharts konténer */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={colorItems}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: -10, bottom: 0 }}
                >
                  <XAxis type="number" domain={[0, maxCount]} hide />

                  {/* Y tengely: itt a "color" kulcsot olvassuk ki szövegként */}
                  <YAxis
                    dataKey="color"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 14 }}
                    width={90}
                  />

                  {/* Oszlopok csíkja és a jobb oldali darabszám */}
                  <Bar
                    dataKey="count"
                    radius={4}
                    barSize={8}
                    label={{
                      position: 'right',
                      fill: '#9ca3af',
                      fontSize: 14,
                      offset: 12,
                    }}
                  >
                    {/* Szeletenkénti egyedi színezés a loop-olt elemen belül */}
                    {colorItems.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
