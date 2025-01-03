import React, { useState } from 'react';
import { Card } from './ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ChartData {
  subject: string;
  value: number;
}

interface HistoryData {
  date: string;
  ratings: Array<{ id: string; name: string; rating: number; }>;
}

export function LifeAreasChart({ data }: { data: ChartData[] }) {
  const [selectedView, setSelectedView] = useState<'radar' | 'history'>('radar');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const history = JSON.parse(localStorage.getItem('lifeAreasHistory') || '[]') as HistoryData[];

  const getHistoryData = () => {
    if (selectedArea === 'all') {
      return history.map(entry => ({
        date: entry.date,
        average: entry.ratings.reduce((acc, curr) => acc + curr.rating, 0) / entry.ratings.length
      }));
    }

    return history.map(entry => ({
      date: entry.date,
      value: entry.ratings.find(r => r.name === selectedArea)?.rating || 0
    }));
  };

  return (
    <Card className="p-6 glass-card h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Diagramm</h2>
        <div className="flex gap-4">
          <Select value={selectedView} onValueChange={(value: 'radar' | 'history') => setSelectedView(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wähle Ansicht" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="radar">Radar</SelectItem>
              <SelectItem value="history">Verlauf</SelectItem>
            </SelectContent>
          </Select>

          {selectedView === 'history' && (
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Wähle Bereich" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Bereiche</SelectItem>
                {data.map((item) => (
                  <SelectItem key={item.subject} value={item.subject}>
                    {item.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        {selectedView === 'radar' ? (
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar
              name="Wert"
              dataKey="value"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
          </RadarChart>
        ) : (
          <LineChart data={getHistoryData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedArea === 'all' ? 'average' : 'value'}
              stroke="#2563eb"
              name={selectedArea === 'all' ? 'Durchschnitt' : selectedArea}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}