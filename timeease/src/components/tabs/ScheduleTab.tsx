'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Plus, X, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, getDay, isSameMonth } from 'date-fns';

interface ScheduleItem {
  id: string;
  task: string;
  time: string;
  duration: string;
  date: Date;
  type: 'class' | 'study' | 'meeting' | 'other';
}

const ScheduleTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: '1',
      task: 'Physics Lecture',
      time: '09:00',
      duration: '1',
      date: new Date(),
      type: 'class'
    },
    {
      id: '2',
      task: 'Study Session',
      time: '11:00',
      duration: '2',
      date: new Date(),
      type: 'study'
    }
  ]);
  const [newEvent, setNewEvent] = useState<Partial<ScheduleItem>>({
    task: '',
    time: '',
    duration: '1',
    type: 'class',
    date: new Date()
  });

  const handleAddEvent = () => {
    if (newEvent.task && newEvent.time) {
      const event: ScheduleItem = {
        id: Date.now().toString(),
        task: newEvent.task,
        time: newEvent.time,
        duration: newEvent.duration || '1',
        date: selectedDate,
        type: newEvent.type || 'other'
      };
      setScheduleItems([...scheduleItems, event]);
      setNewEvent({ task: '', time: '', duration: '1', type: 'class' });
      setShowAddEvent(false);
    }
  };

  const deleteEvent = (eventId: string) => {
    setScheduleItems(scheduleItems.filter(item => item.id !== eventId));
  };

  const handleDateChange = (days: number) => {
    setSelectedDate(prev => viewMode === 'day' ? addDays(prev, days) : addMonths(prev, days));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'border-blue-500';
      case 'study':
        return 'border-green-500';
      case 'meeting':
        return 'border-purple-500';
      default:
        return 'border-gray-500';
    }
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    return eachDayOfInterval({ start, end });
  };

  const getWeekDays = () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderDayView = () => {
    const filteredEvents = scheduleItems
      .filter(item => isSameDay(new Date(item.date), selectedDate))
      .sort((a, b) => a.time.localeCompare(b.time));

    return (
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No events scheduled for this day
          </div>
        ) : (
          filteredEvents.map((item) => (
            <div 
              key={item.id} 
              className={`flex items-center space-x-4 p-3 border-l-4 bg-gray-50 rounded-r-lg ${getEventTypeColor(item.type)}`}
            >
              <div className="w-20">
                <span className="text-sm font-medium">{item.time}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{item.task}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.duration}h)</span>
                  </div>
                  <button
                    onClick={() => deleteEvent(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderMonthView = () => {
    const days = getDaysInMonth();
    const firstDayOfMonth = getDay(startOfMonth(selectedDate));
    const weekDays = getWeekDays();
    
    return (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 bg-gray-50 rounded-lg" />
          ))}
          {days.map((day) => {
            const dayEvents = scheduleItems.filter(item => isSameDay(new Date(item.date), day));
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, selectedDate);
            
            return (
              <div
                key={day.toISOString()}
                onClick={() => {
                  setSelectedDate(day);
                  setViewMode('day');
                }}
                className={`h-24 p-1 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  isSelected ? 'border-indigo-500 bg-indigo-50' : ''
                } ${isCurrentMonth ? '' : 'opacity-50'}`}
              >
                <div className="text-right p-1">
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event, index) => (
                    <div
                      key={event.id}
                      className={`text-xs truncate px-1 py-0.5 rounded ${
                        event.type === 'class' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'study' ? 'bg-green-100 text-green-800' :
                        event.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {event.time} {event.task}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <Card>
        <CardContent className="p-4">
          {/* View Toggle and Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 rounded-md ${
                  viewMode === 'day' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded-md ${
                  viewMode === 'month' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
                }`}
              >
                Month
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleDateChange(-1)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold">
                {viewMode === 'day' 
                  ? format(selectedDate, 'EEEE, MMMM d')
                  : format(selectedDate, 'MMMM yyyy')}
              </h2>
              <button 
                onClick={() => handleDateChange(1)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Add Event Button */}
          <button
            onClick={() => setShowAddEvent(true)}
            className="flex items-center mb-4 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus size={20} className="mr-1" /> Add Event
          </button>

          {/* Add Event Form */}
          {showAddEvent && (
            <div className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Event name"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newEvent.task}
                  onChange={(e) => setNewEvent({ ...newEvent, task: e.target.value })}
                />
                <div className="flex space-x-2">
                  <input
                    type="time"
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                  <select
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                  >
                    {[0.5, 1, 1.5, 2, 2.5, 3].map(num => (
                      <option key={num} value={num}>{num}h</option>
                    ))}
                  </select>
                </div>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as ScheduleItem['type'] })}
                >
                  <option value="class">Class</option>
                  <option value="study">Study</option>
                  <option value="meeting">Meeting</option>
                  <option value="other">Other</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddEvent(false)}
                    className="px-3 py-2 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Calendar View */}
          {viewMode === 'day' ? renderDayView() : renderMonthView()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleTab;