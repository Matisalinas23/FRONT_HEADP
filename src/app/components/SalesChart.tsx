import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function MultiLineTick(props: any) {
  const { x, y, payload } = props;
  
  // Máximo caracteres por línea
  const maxChars = 16;

  const words = payload.value.match(new RegExp(`.{1,${maxChars}}`, "g"));

  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((line: string, index: number) => (
        <text key={index} x={0} y={index * 14}
          dy={12} textAnchor="middle"
          fill="#666" fontSize={13}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function SalesChart({ data }: { data: { name: string, quantity: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={640}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" tick={<MultiLineTick />} interval={0} height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}