import React from 'react';
import { Card } from './ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  subject: string;
  value: number;
}

export function LifeAreasChart({ data }: { data: ChartData[] }) {
  return (
    <Card className="p-6 glass-card h-[400px]">
      <h2 className="text-2xl font-semibold mb-6">Diagramm</h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="Value"
            dataKey="value"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
}