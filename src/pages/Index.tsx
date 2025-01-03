import React, { useState, useEffect } from 'react';
import { LifeAreas } from '@/components/LifeAreas';
import { LifeAreasChart } from '@/components/LifeAreasChart';
import { TodoList } from '@/components/TodoList';
import { DailyQuote } from '@/components/DailyQuote';

const lifeAreas = [
  'Körper',
  'Mentale Gesundheit',
  'Spirituelle Gesundheit',
  'Freunde',
  'Familie',
  'Romantisches Leben',
  'Mission/Beruf',
  'Finanzen',
  'Persönliche Weiterentwicklung',
];

const Index = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const savedLifeAreas = localStorage.getItem('lifeAreas');
    if (savedLifeAreas) {
      const parsedAreas = JSON.parse(savedLifeAreas);
      const formattedData = parsedAreas.map((area: any) => ({
        subject: area.name,
        value: area.rating,
      }));
      setChartData(formattedData);
    }
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-br from-background to-muted">
      <h1 className="text-4xl font-bold text-center mb-10 fade-in">
        Persönliches Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto fade-in">
        <LifeAreas />
        <LifeAreasChart data={chartData} />
      </div>
      
      <DailyQuote />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto fade-in">
        {lifeAreas.map((area) => (
          <TodoList key={area} area={area} />
        ))}
      </div>
    </div>
  );
};

export default Index;