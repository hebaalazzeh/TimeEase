export interface Task {
  id: string;
  name: string;
  category: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  notes?: string;
  createdAt: string;    // Add this
  completedAt?: string; // Add this
}

interface InsightsProps {
  tasks: Task[];
}