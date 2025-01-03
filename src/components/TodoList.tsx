import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Plus } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  area: string;
}

export function TodoList({ area }: { area: string }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      area,
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <Card className="p-6 glass-card">
      <h3 className="text-xl font-semibold mb-4">{area}</h3>
      <div className="flex gap-2 mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Neue Aufgabe..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="hover-scale"
        />
        <Button onClick={addTodo} size="icon" className="hover-scale">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-2 rounded hover:bg-secondary/50 transition-colors"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="hover-scale"
            />
            <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}