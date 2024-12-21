export interface Task {
  id: string;
  name: string;
  category: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}