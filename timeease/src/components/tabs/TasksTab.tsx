'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Plus, X, Check, Clock, Flag, Search, Calendar, Tag } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { format } from 'date-fns';

interface Task {
  id: string;
  name: string;
  category: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  notes?: string;
}

interface NewTask {
  name: string;
  category: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  notes?: string;
}
const TasksTab = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      name: 'Physics Lecture', 
      category: 'Academics', 
      deadline: format(new Date(), 'yyyy-MM-dd HH:mm'), 
      priority: 'High',
      completed: false,
      notes: 'Chapter 7: Quantum Mechanics' 
    },
    { 
      id: '2', 
      name: 'Baseball Practice', 
      category: 'Extracurricular', 
      deadline: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd HH:mm'),
      priority: 'Medium',
      completed: false 
    },
  ]);
  
  const [showAddTask, setShowAddTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newTask, setNewTask] = useState<NewTask>({
    name: '',
    category: 'Academics',
    deadline: format(new Date(), 'yyyy-MM-dd HH:mm'),
    priority: 'Medium',
    notes: ''
  });
const priorityColors = {
    High: {
      bg: theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100',
      text: theme === 'dark' ? 'text-red-300' : 'text-red-700'
    },
    Medium: {
      bg: theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100',
      text: theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'
    },
    Low: {
      bg: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100',
      text: theme === 'dark' ? 'text-green-300' : 'text-green-700'
    }
  };

  const categoryColors = {
    Academics: {
      bg: theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100',
      text: theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
    },
    Extracurricular: {
      bg: theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100',
      text: theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
    },
    Personal: {
      bg: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100',
      text: theme === 'dark' ? 'text-green-300' : 'text-green-700'
    }
  };
const handleAddTask = () => {
    if (newTask.name && newTask.deadline) {
      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask({
        name: '',
        category: 'Academics',
        deadline: format(new Date(), 'yyyy-MM-dd HH:mm'),
        priority: 'Medium',
        notes: ''
      });
      setShowAddTask(false);
    }
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks
    .filter(task => {
      if (searchQuery) {
        return task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               task.category.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .filter(task => {
      if (categoryFilter === 'all') return true;
      return task.category.toLowerCase() === categoryFilter.toLowerCase();
    });
return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white'} shadow-lg`}>
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className={`absolute left-3 top-2.5 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search tasks..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm transition-colors
                ${theme === 'dark' 
                  ? 'bg-gray-900/50 text-white placeholder-gray-400 focus:bg-gray-900' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
  {/* Status Filters */}
  <div className="flex gap-2">
    {['all', 'pending', 'completed'].map((filterOption) => (
      <button
        key={filterOption}
        onClick={() => setFilter(filterOption)}
        className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
          filter === filterOption
            ? theme === 'dark' 
              ? 'bg-primary text-white' 
              : 'bg-primary-light text-white'
            : theme === 'dark'
              ? 'bg-gray-900/50 text-gray-300 hover:bg-gray-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
      </button>
    ))}
  </div>

  {/* Separator Line */}
  <div className={`h-8 w-px my-auto ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />

  {/* Category Filters */}
  <div className="flex gap-2">
    {['all', 'academics', 'extracurricular', 'personal'].map((category) => (
      <button
        key={category}
        onClick={() => setCategoryFilter(category)}
        className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
          categoryFilter === category
            ? theme === 'dark'
              ? 'bg-primary text-white'
              : 'bg-primary-light text-white'
            : theme === 'dark'
              ? 'bg-gray-900/50 text-gray-300 hover:bg-gray-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </button>
    ))}
  </div>
</div>
        </div>
        </div>
{/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card 
            key={task.id} 
            className={`p-4 rounded-2xl transition-all duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 backdrop-blur-lg hover:bg-gray-800' 
                : 'bg-white hover:bg-gray-50'
            } ${task.completed ? 'opacity-75' : ''}`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleTaskComplete(task.id)}
                className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${task.completed 
                    ? theme === 'dark' ? 'bg-primary border-primary' : 'bg-primary-light border-primary-light'
                    : theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
              >
                {task.completed && <Check size={12} className="text-white" />}
              </button>
              
              <div className="flex-1">
                <h3 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                  {task.name}
                </h3>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-xl text-xs flex items-center gap-1
                    ${categoryColors[task.category].bg} ${categoryColors[task.category].text}`}>
                    <Tag size={12} />
                    {task.category}
                  </span>
                  <span className={`px-3 py-1 rounded-xl text-xs flex items-center gap-1
                    ${priorityColors[task.priority].bg} ${priorityColors[task.priority].text}`}>
                    <Flag size={12} />
                    {task.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-xl text-xs flex items-center gap-1
                    ${theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    <Calendar size={12} />
                    {format(new Date(task.deadline), 'MMM d, h:mm a')}
                  </span>
                </div>

                {task.notes && (
                  <p className={`mt-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{task.notes}</p>
                )}
              </div>

              <button
                onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                className={`p-2 rounded-xl hover:bg-gray-200 transition-colors ${
                  theme === 'dark' ? 'text-gray-400 hover:bg-gray-700 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <X size={16} />
              </button>
            </div>
          </Card>
        ))}
        </div>
{/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="mb-2">No tasks found</div>
          <button
            onClick={() => setShowAddTask(true)}
            className={`text-primary hover:text-primary-dark transition-colors ${
              theme === 'dark' ? 'text-primary-light hover:text-primary' : ''
            }`}
          >
            Add your first task
          </button>
        </div>
      )}

      {/* Add Task Button */}
      <button
        onClick={() => setShowAddTask(true)}
        className={`fixed right-6 bottom-24 p-4 rounded-full shadow-lg
          ${theme === 'dark' 
            ? 'bg-primary hover:bg-primary-dark' 
            : 'bg-primary-light hover:bg-primary'} 
          text-white transition-colors`}
      >
        <Plus size={24} />
        </button>

{/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <button
                onClick={() => setShowAddTask(false)}
                className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${
                  theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500'
                }`}
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Task Name
                </label>
                <input
                  type="text"
                  placeholder="Enter task name"
                  className={`w-full px-4 py-2 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-900 text-white placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  }`}
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                />
              </div>
              
              <div>
                <label className={`block text-sm mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Category
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                >
                  <option value="Academics">Academics</option>
                  <option value="Extracurricular">Extracurricular</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Deadline
                </label>
                <input
                  type="datetime-local"
                  className={`w-full px-4 py-2 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                />
              </div>
              
              <div>
                <label className={`block text-sm mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Priority
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Notes (optional)
                </label>
                <textarea
                  placeholder="Add any additional notes"
                  className={`w-full px-4 py-2 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-900 text-white placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  }`}
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddTask(false)}
                  className={`px-4 py-2 rounded-xl transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className={`px-4 py-2 rounded-xl text-white transition-colors ${
                    theme === 'dark'
                      ? 'bg-primary hover:bg-primary-dark'
                      : 'bg-primary-light hover:bg-primary'
                  }`}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksTab;