'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Clock, BarChart2, Settings, Plus, CheckCircle2, Sun, Moon } from 'lucide-react';
import TasksTab from './tabs/TasksTab';
import ScheduleTab from './tabs/ScheduleTab';
import InsightsTab from './tabs/InsightsTab';
import SettingsTab from './tabs/SettingsTab';
import { useTheme } from '@/components/ThemeProvider';

const TimeEaseApp = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen w-full transition-colors duration-200
      ${theme === 'dark' ? 'bg-gradient-dark text-white' : 'bg-gradient-light text-gray-900'}`}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">TimeEase</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-yellow-500 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="home" className="w-full">
          <div className="fixed bottom-0 left-0 right-0 pb-6 px-4 bg-transparent">
            <TabsList className={`grid w-full max-w-lg mx-auto grid-cols-5 rounded-full ${
              theme === 'dark' ? 'bg-card-dark' : 'bg-white'
            } p-1 shadow-lg`}>
              <TabsTrigger 
                value="home" 
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Home size={20} />
              </TabsTrigger>
              <TabsTrigger 
                value="tasks"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <CheckCircle2 size={20} />
              </TabsTrigger>
              <TabsTrigger 
                value="schedule"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Clock size={20} />
              </TabsTrigger>
              <TabsTrigger 
                value="insights"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <BarChart2 size={20} />
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Settings size={20} />
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="pb-24">
            <TabsContent value="home">
              <div className={`rounded-3xl p-6 ${
                theme === 'dark' ? 'bg-card-dark' : 'bg-white'
              } shadow-lg`}>
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold mb-2">25:00</div>
                  <button className={`px-8 py-3 rounded-full text-white ${
                    theme === 'dark' ? 'bg-primary hover:bg-primary-dark' : 'bg-primary-light hover:bg-primary'
                  } transition-colors`}>
                    START
                  </button>
                </div>
                <div className="flex justify-center space-x-4">
                  <button className={`p-4 rounded-full ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                    <Plus size={24} />
                  </button>
                  <button className={`p-4 rounded-full ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                    <Clock size={24} />
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <TasksTab />
            </TabsContent>

            <TabsContent value="schedule">
              <ScheduleTab />
            </TabsContent>

            <TabsContent value="insights">
              <InsightsTab />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TimeEaseApp;