import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from 'lucide-react';

const settingsItems = [
  { name: 'Notification Preferences', description: 'Manage how you receive alerts' },
  { name: 'Calendar Integration', description: 'Connect with external calendars' },
  { name: 'Time Zone Settings', description: 'Adjust your local time zone' },
  { name: 'Privacy Settings', description: 'Control your data and privacy' },
  { name: 'Theme Preferences', description: 'Customize app appearance' },
];

const SettingsTab = () => {
  return (
    <div className="mt-6">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="space-y-3">
            {settingsItems.map((setting, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{setting.name}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;