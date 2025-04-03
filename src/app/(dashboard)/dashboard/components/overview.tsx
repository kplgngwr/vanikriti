import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {
    name: 'Jan',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Feb',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Mar',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Apr',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'May',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Jun',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Jul',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Aug',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Sep',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Oct',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Nov',
    Total: Math.floor(Math.random() * 50) + 5,
  },
  {
    name: 'Dec',
    Total: Math.floor(Math.random() * 50) + 5,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          formatter={(value) => `${value} Planted`}
          cursor={{ fill: 'transparent' }}
        />
        <Bar
          dataKey="Total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#a4c536]"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
