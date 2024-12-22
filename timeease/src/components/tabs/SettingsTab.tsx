'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Moon, User, Calendar, Globe, Download, ChevronRight } from 'lucide-react';

interface NotificationSetting {
  id: string;
  name: string;
  enabled: boolean;
}

interface ThemeSetting {
  id: string;
  name: string;
  value: string;
}

const SettingsTab = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { id: 'due-soon', name: 'Tasks Due Soon', enabled: true },
    { id: 'task-reminder', name: 'Task Reminders', enabled: true },
    { id: 'schedule-changes', name: 'Schedule Changes', enabled: true },
    { id: 'weekly-summary', name: 'Weekly Summary', enabled: false },
  ]);

  const [selectedTheme, setSelectedTheme] = useState('system');
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  
  const themeOptions: ThemeSetting[] = [
    { id: 'light', name: 'Light', value: 'light' },
    { id: 'dark', name: 'Dark', value: 'dark' },
    { id: 'system', name: 'System Default', value: 'system' },
  ];

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'notifications':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between py-2">
                <span>{notification.name}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notification.enabled}
                    onChange={() => toggleNotification(notification.id)}
                  />
                  <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 
                    peer-focus:ring-indigo-300 peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute 
                    after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                    peer-checked:bg-indigo-600`}>
                  </div>
                </label>
              </div>
            ))}
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Theme Settings</h3>
            <div className="space-y-2">
              {themeOptions.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                    selectedTheme === theme.value
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTheme(theme.value)}
                >
                  <span>{theme.name}</span>
                  {selectedTheme === theme.value && (
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'timezone':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Time Zone Settings</h3>
            <select
              className="w-full p-2 border rounded-md"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
            >
              {Intl.supportedValuesOf('timeZone').map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Calendar Integration</h3>
            <div className="space-y-3">
              <button className="w-full p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/google-calendar.png" alt="Google Calendar" className="w-6 h-6" />
                  <span>Google Calendar</span>
                </div>
                <span className="text-sm text-gray-500">Connect</span>
              </button>
              <button className="w-full p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/outlook.png" alt="Outlook" className="w-6 h-6" />
                  <span>Outlook Calendar</span>
                </div>
                <span className="text-sm text-gray-500">Connect</span>
              </button>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Data Management</h3>
            <div className="space-y-3">
              <button className="w-full p-3 border rounded-lg hover:bg-gray-50 text-left">
                Export All Data
              </button>
              <button className="w-full p-3 border rounded-lg hover:bg-gray-50 text-left">
                Import Data
              </button>
              <button className="w-full p-3 border rounded-lg hover:bg-gray-50 text-left text-red-600">
                Delete All Data
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Select a setting to configure
          </div>
        );
    }
  };

  const settingsMenu = [
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'theme', icon: Moon, label: 'Theme' },
    { id: 'timezone', icon: Globe, label: 'Time Zone' },
    { id: 'calendar', icon: Calendar, label: 'Calendar Integration' },
    { id: 'data', icon: Download, label: 'Data Management' },
  ];

  return (
    <div className="mt-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex h-[400px]">
            {/* Settings Menu */}
            <div className="w-64 border-r pr-4">
              {settingsMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-2 flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className={activeSection === item.id ? 'text-indigo-600' : 'text-gray-400'} 
                  />
                </button>
              ))}
            </div>

            {/* Settings Content */}
            <div className="flex-1 pl-6">
              {renderSection()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;