import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RawData {
  cv_types: Record<string, number>;
}

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

const cvType_COLORS: Record<string, string> = {
  Berlin: '#2e254b',
  Dublin: '#dbd7cd',
  Stockholm: '#00a884',
  Sydney: '#0099e5',
  Tokio: '#6b1422',
};

export default function DownloadCvTypes() {
  const [chartData, setChartData] = useState<ChartDataItem[] | null>(null);
  const [totalDownloads, setTotalDownloads] = useState<number>(0);

  const rawData: RawData = {
    cv_types: {
      Berlin: 7,
      Stockholm: 1,
      Dublin: 5,
      Sydney: 0,
      Tokio: 5,
    },
  };

  useEffect(() => {
    const formattedData: ChartDataItem[] = Object.entries(rawData.cv_types).map(
      ([cvType, count]) => ({
        name: cvType,
        value: count,
        color: cvType_COLORS[cvType] || '#9ca3af',
      }),
    );

    const total = formattedData.reduce((sum, item) => sum + item.value, 0);

    setTotalDownloads(total);
    setChartData(formattedData);
  }, []);

  if (!chartData) return <div className="text-white">Betöltés...</div>;

  return (
    <div className="bg-[#243042] text-white p-6 rounded-2xl w-[450px] border border-sky-500/30 shadow-2xl font-sans">
      <h3 className="text-text-color font-semibold ">
        {totalDownloads} Letöltés
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-400 text-lg">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="w-56 h-56 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={0}
                label={({
                  cx,
                  cy,
                  midAngle = 0,
                  innerRadius,
                  outerRadius,
                  value,
                }) => {
                  if (value === 0) return null;

                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-xs font-bold"
                    >
                      {value}
                    </text>
                  );
                }}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
