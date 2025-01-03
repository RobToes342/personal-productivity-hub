import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Slider } from './ui/slider';

interface LifeArea {
  id: string;
  name: string;
  rating: number;
}

interface LifeAreaHistory {
  date: string;
  ratings: LifeArea[];
}

const initialLifeAreas: LifeArea[] = [
  { id: '1', name: 'Körper', rating: 0 },
  { id: '2', name: 'Mentale Gesundheit', rating: 0 },
  { id: '3', name: 'Spirituelle Gesundheit', rating: 0 },
  { id: '4', name: 'Freunde', rating: 0 },
  { id: '5', name: 'Familie', rating: 0 },
  { id: '6', name: 'Romantisches Leben', rating: 0 },
  { id: '7', name: 'Mission/Beruf', rating: 0 },
  { id: '8', name: 'Finanzen', rating: 0 },
  { id: '9', name: 'Persönliche Weiterentwicklung', rating: 0 },
];

export function LifeAreas() {
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>(() => {
    const saved = localStorage.getItem('lifeAreas');
    return saved ? JSON.parse(saved) : initialLifeAreas;
  });

  useEffect(() => {
    localStorage.setItem('lifeAreas', JSON.stringify(lifeAreas));
    
    // Speichere den Verlauf
    const history = JSON.parse(localStorage.getItem('lifeAreasHistory') || '[]') as LifeAreaHistory[];
    const today = new Date().toISOString().split('T')[0];
    
    // Prüfe ob heute schon ein Eintrag existiert
    const todayExists = history.some(entry => entry.date === today);
    
    if (!todayExists) {
      const newHistory = [...history, { date: today, ratings: lifeAreas }]
        .slice(-30); // Behalte nur die letzten 30 Tage
      localStorage.setItem('lifeAreasHistory', JSON.stringify(newHistory));
    }
  }, [lifeAreas]);

  const handleRatingChange = (id: string, newRating: number[]) => {
    setLifeAreas(areas =>
      areas.map(area =>
        area.id === id ? { ...area, rating: newRating[0] } : area
      )
    );
  };

  return (
    <Card className="p-6 glass-card">
      <h2 className="text-2xl font-semibold mb-6">Lebensbereiche</h2>
      <div className="space-y-6">
        {lifeAreas.map((area) => (
          <div key={area.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">{area.name}</label>
              <span className="text-sm text-muted-foreground">{area.rating}</span>
            </div>
            <Slider
              value={[area.rating]}
              max={4}
              step={1}
              onValueChange={(value) => handleRatingChange(area.id, value)}
              className="hover-scale"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}