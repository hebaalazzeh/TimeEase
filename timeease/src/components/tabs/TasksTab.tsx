'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, Check } from 'lucide-react';
import { Task } from '@/types';

const initialTasks: Task[] = [
  { 
    id: '1', 
    name: 'Complete Physics Assignment', 
    category: 'Academics', 
    deadline: 'Tomorrow, 11:59 PM', 
    priority: 'High',
    completed: false 
  },
  { 
    id: '2', 
    name: 'Basketball Practice', 
    category: 'Extracurricular', 
    deadline: 'Today, 4:00 PM', 
    priority: 'Medium',
    completed: false 
  },
];

const TasksTab = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    name: '',
    category: 'Academics',
    deadline: '',
    priority: 'Medium'
  });
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (newTask.name && newTask.deadline) {
      const task: Task = {
        id: Date.now().toString(),
        name: newTask.name,
        category: newTask.category || 'Academics',
        deadline: newTask.deadline,
        priority: newTask.priority || 'Medium',
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask({ name: '', category: 'Academics', deadline: '', priority: 'Medium' });
      setShowAddTask(false);
    }
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return task.category.toLowerCase() === filter;
  });

  return (
    <div className="mt-6 space-y-4">
      {/* Filters */}
      <div className="flex space-x-2 mb-4">
        <select 
          className="px-3 py-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="academics">Academics</option>
          <option value="extracurricular">Extracurricular</option>
        </select>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus size={20} className="mr-1" /> Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task name"
                className="w-full px-3 py-2 border rounded-md"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option value="Academics">Academics</option>
                <option value="Extracurricular">Extracurricular</option>
                <option value="Personal">Personal</option>
              </select>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              />
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority']})}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddTask(false)}
                  className="px-3 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Task
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task List */}
      {filteredTasks.map((task) => (
        <Card key={task.id} className={`w-full ${task.completed ? 'opacity-75' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                >
                  {task.completed && <Check size={16} className="text-white" />}
                </button>
                <div>
                  <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                    {task.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{task.category}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{task.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TasksTab;