'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid, Area, AreaChart
} from 'recharts';
import { 
  Clock, Target, TrendingUp, BrainCircuit, 
  Activity, CheckCircle2, Calendar, BarChart2 
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { format, subDays, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

const InsightsTab = () => {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState('week');
  const [activeMetric, setActiveMetric] = useState('overview');

  // Generate sample data for time tracking
  const generateTimeData = () => {
    const days = eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date())
    });

    return days.map(day => ({
      date: format(day, 'EEE'),
      academic: Math.floor(Math.random() * 5) + 2,
      personal: Math.floor(Math.random() * 3) + 1,
      extracurricular: Math.floor(Math.random() * 4) + 1,
      total: Math.floor(Math.random() * 8) + 4
    }));
  };

  const timeData = generateTimeData();

  // Focus distribution data
  const focusData = [
    { name: 'Deep Focus', value: 45, color: '#4338ca' },
    { name: 'Light Work', value: 30, color: '#06b6d4' },
    { name: 'Meetings', value: 15, color: '#8b5cf6' },
    { name: 'Breaks', value: 10, color: '#10b981' }
  ];

  // Task completion trends
  const completionData = [
    { name: 'Mon', completed: 8, total: 10 },
    { name: 'Tue', completed: 7, total: 9 },
    { name: 'Wed', completed: 9, total: 12 },
    { name: 'Thu', completed: 6, total: 8 },
    { name: 'Fri', completed: 5, total: 7 },
    { name: 'Sat', completed: 4, total: 5 },
    { name: 'Sun', completed: 3, total: 4 }
  ];

  // Productivity score calculation
  const calculateProductivityScore = () => {
    const completionRate = completionData.reduce((acc, curr) => 
      acc + (curr.completed / curr.total), 0) / completionData.length * 100;
    const focusScore = focusData[0].value * 0.8 + focusData[1].value * 0.5;
    return Math.round((completionRate + focusScore) / 2);
  };

  const stats = {
    productivityScore: calculateProductivityScore(),
    totalHours: timeData.reduce((acc, curr) => acc + curr.total, 0),
    completedTasks: completionData.reduce((acc, curr) => acc + curr.completed, 0),
    focusedTime: Math.round(timeData.reduce((acc, curr) => acc + curr.academic, 0) * 1.5)
  };

  const renderStatCard = (title: string, value: number | string, icon: React.ReactNode, trend?: string) => (
    <Card className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} p-4 rounded-2xl`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <p className={`text-xs mt-1 ${
              trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend} vs last week
            </p>
          )}
        </div>
        <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {icon}
        </div>
      </div>
    </Card>
  );

  const renderOverviewSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderStatCard(
          'Productivity Score',
          `${stats.productivityScore}%`,
          <Target className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />,
          '+5%'
        )}
        {renderStatCard(
          'Total Hours',
          `${stats.totalHours}h`,
          <Clock className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />,
          '+2.5h'
        )}
        {renderStatCard(
          'Completed Tasks',
          stats.completedTasks,
          <CheckCircle2 className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />,
          '+12'
        )}
        {renderStatCard(
          'Focus Time',
          `${stats.focusedTime}h`,
          <BrainCircuit className={`h-5 w-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />,
          '+3.2h'
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} p-4 rounded-2xl`}>
          <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData}>
                <defs>
                  <linearGradient id="colorAcademic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338ca" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4338ca" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPersonal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="academic"
                  stroke="#4338ca"
                  fillOpacity={1}
                  fill="url(#colorAcademic)"
                />
                <Area
                  type="monotone"
                  dataKey="personal"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#colorPersonal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} p-4 rounded-2xl`}>
          <h3 className="text-lg font-semibold mb-4">Focus Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={focusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {focusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} p-4 rounded-2xl`}>
        <h3 className="text-lg font-semibold mb-4">Task Completion Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="completed" name="Completed" fill="#4338ca" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" name="Total" fill={theme === 'dark' ? '#374151' : '#e5e7eb'} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );

  const metricButtons = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'focus', label: 'Focus', icon: BrainCircuit },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
    { id: 'time', label: 'Time', icon: Clock }
  ];

  return (
    <div className="space-y-6">
      {/* Metric Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {metricButtons.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveMetric(id)}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeMetric === id
                ? theme === 'dark' 
                  ? 'bg-primary text-white' 
                  : 'bg-primary-light text-white'
                : theme === 'dark'
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Time Range Selection */}
      <div className="flex gap-2">
        {['day', 'week', 'month', 'year'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-xl text-sm transition-colors ${
              timeRange === range
                ? theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-900'
                : theme === 'dark'
                  ? 'bg-gray-800/50 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      {renderOverviewSection()}
    </div>
  );
};

export default InsightsTab;