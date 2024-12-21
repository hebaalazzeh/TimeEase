'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { format, subDays } from 'date-fns';

interface TimeData {
  name: string;
  value: number;
  color: string;
}

interface TrendData {
  date: string;
  academic: number;
  personal: number;
  extracurricular: number;
}

const InsightsTab = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('distribution');

  // Sample data - in a real app, this would come from your task/schedule data
  const timeDistribution: TimeData[] = [
    { name: 'Academics', value: 45, color: '#4338ca' },
    { name: 'Personal', value: 20, color: '#059669' },
    { name: 'Extracurricular', value: 15, color: '#7c3aed' },
    { name: 'Rest', value: 20, color: '#0ea5e9' },
  ];

  const taskCompletion = [
    { name: 'Monday', completed: 8, total: 10 },
    { name: 'Tuesday', completed: 7, total: 9 },
    { name: 'Wednesday', completed: 9, total: 12 },
    { name: 'Thursday', completed: 6, total: 8 },
    { name: 'Friday', completed: 5, total: 7 },
  ];

  const generateTrendData = (): TrendData[] => {
    return Array.from({ length: 7 }).map((_, i) => ({
      date: format(subDays(new Date(), i), 'MMM dd'),
      academic: Math.floor(Math.random() * 5) + 2,
      personal: Math.floor(Math.random() * 3) + 1,
      extracurricular: Math.floor(Math.random() * 4) + 1,
    })).reverse();
  };

  const trendData = generateTrendData();

  const stats = {
    totalTasks: 45,
    completedTasks: 38,
    productiveHours: 32,
    completionRate: 84,
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Tasks</div>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Completed Tasks</div>
            <div className="text-2xl font-bold">{stats.completedTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Productive Hours</div>
            <div className="text-2xl font-bold">{stats.productiveHours}h</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Completion Rate</div>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Controls */}
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => setSelectedMetric('distribution')}
            className={`px-3 py-1 rounded ${
              selectedMetric === 'distribution' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            Time Distribution
          </button>
          <button
            onClick={() => setSelectedMetric('completion')}
            className={`px-3 py-1 rounded ${
              selectedMetric === 'completion' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            Task Completion
          </button>
          <button
            onClick={() => setSelectedMetric('trend')}
            className={`px-3 py-1 rounded ${
              selectedMetric === 'trend' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            Time Trends
          </button>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded ${
              timeRange === 'week' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded ${
              timeRange === 'month' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Charts */}
      <Card>
        <CardContent className="p-4">
          {selectedMetric === 'distribution' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Time Distribution</h2>
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 h-72">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={timeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {timeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                  {timeDistribution.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }} 
                      />
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedMetric === 'completion' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Task Completion Rate</h2>
              <div className="h-72">
                <ResponsiveContainer>
                  <BarChart data={taskCompletion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#4338ca" name="Completed" />
                    <Bar dataKey="total" fill="#e5e7eb" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {selectedMetric === 'trend' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Time Trends</h2>
              <div className="h-72">
                <ResponsiveContainer>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="academic" 
                      stroke="#4338ca" 
                      name="Academic"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="personal" 
                      stroke="#059669" 
                      name="Personal"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="extracurricular" 
                      stroke="#7c3aed" 
                      name="Extracurricular"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsTab;