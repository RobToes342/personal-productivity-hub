import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Plus } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList({ area }: { area: string }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(`todos-${area}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem(`todos-${area}`, JSON.stringify(todos));
  }, [todos, area]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        text: newTodo,
        completed: false
      }
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  return (
    <Card className="p-6 glass-card">
      <h3 className="text-xl font-semibold mb-4">{area}</h3>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Neue Aufgabe..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 group">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto opacity-0 group-hover:opacity-100"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}