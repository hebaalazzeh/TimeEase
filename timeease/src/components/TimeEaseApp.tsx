'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, BarChart2, Settings, Plus, CheckCircle2 } from 'lucide-react';
import TasksTab from './tabs/TasksTab';
import ScheduleTab from './tabs/ScheduleTab';
import InsightsTab from './tabs/InsightsTab';
import SettingsTab from './tabs/SettingsTab';

const TimeEaseApp = () => {
  return (
    <div className="h-screen w-full bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">TimeEase</h1>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="tasks" className="flex flex-col items-center p-2">
            <CheckCircle2 size={20} />
            <span className="text-sm">Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex flex-col items-center p-2">
            <Calendar size={20} />
            <span className="text-sm">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex flex-col items-center p-2">
            <BarChart2 size={20} />
            <span className="text-sm">Insights</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col items-center p-2">
            <Settings size={20} />
            <span className="text-sm">Settings</span>
          </TabsTrigger>
        </TabsList>

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
      </Tabs>
    </div>
  );
};

export default TimeEaseApp;