export interface Task {
    id: number;
    prev: number | null;
    branch: string;
    date: string;
}

export interface TaskTreeNode {
    id: string;
    name: string;
    children: TaskTreeNode[];
}

export interface TaskContextType {
    tasks: Task[];
    branches: string[]; // Добавили сюда branches
    loadTasks: (branch: string, page: number) => Promise<void>;
    loadTaskTree: (taskId: number) => Promise<void>;
}
