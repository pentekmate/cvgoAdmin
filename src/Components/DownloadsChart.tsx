import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
type downloadChartProps = {
  downloads: Record<string, number>;
};
interface ChartDataItem {
  date: string;
  downloads: number;
}
export const DownloadChart = () => {
  const [chartData, setChartData] = useState<ChartDataItem[] | null>(null);
   const [totalDownloads, setTotalDownloads] = useState<number>(0);

  const rawData = {
    downloads: {
      '2026-06-13': 0,
      '2026-06-14': 3,
      '2026-06-15': 0,
      '2026-06-16': 3,
      '2026-06-17': 8,
      '2026-06-18': 4,
      '2026-06-19': 0,
    },
  };
  useEffect(() => {
    const formattedData = Object.entries(rawData.downloads).map(
      ([date, count]) => ({
        date: date,
        downloads: count,
      }),
    );
     const total = formattedData.reduce((sum, item) => sum + item.downloads, 0);

    setTotalDownloads(total);

    setChartData(formattedData);
  }, []);

  return (
    <div className="bg-inputBg min-w-[582px] h-[382px] px-5 rounded-default pt-2.5">


      <div className='w-full h-full '>
        <h3 className='text-text-color font-semibold'>{totalDownloads} letöltés </h3>
        {chartData && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
            >
              <CartesianGrid  stroke="#94a3b8" />

              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />

              <YAxis stroke="#9ca3af" fontSize={12} width={20} />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#14171a',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />

              <Line
                type="monotone"
                dataKey="downloads"
                stroke="var(--color-primary)"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
