import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';

const quotes = [
  "Der beste Weg, die Zukunft vorherzusagen, ist sie zu erschaffen.",
  "Jeder Tag ist eine neue Chance, dein Leben zu verbessern.",
  "Disziplin ist die Brücke zwischen Zielen und Erfolg.",
  "Der einzige Weg, großartige Arbeit zu leisten, ist zu lieben, was man tut.",
  "Erfolg ist kein Zufall. Es ist harte Arbeit, Ausdauer, Lernen, Studieren, Opfer und vor allem Liebe zu dem, was man tut.",
];

export function DailyQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const today = new Date();
    const index = today.getDate() % quotes.length;
    setQuote(quotes[index]);
  }, []);

  return (
    <Card className="p-6 glass-card">
      <h2 className="text-2xl font-semibold mb-6">Tägliches Zitat</h2>
      <p className="text-lg italic text-center">{quote}</p>
    </Card>
  );
}