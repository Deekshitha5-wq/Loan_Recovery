import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Recovered", value: 70 },
  { name: "Pending", value: 30 },
];

export default function Analytics() {
  return (
    <div className="glass p-6 rounded-2xl h-[400px]">
      <h2 className="text-2xl font-bold mb-4">
        Analytics
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
          >
            <Cell fill="#8b5cf6" />
            <Cell fill="#ec4899" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}