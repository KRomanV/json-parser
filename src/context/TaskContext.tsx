import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://rdb.altlinux.org/api/site/tasks_history";

interface Task {
    id: number;
    prev: number | null;
    branch: string;
    date: string;
}

interface TaskContextType {
    tasks: Task[];
    branches: string[];
    searchTaskTree: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [branches, setBranches] = useState<string[]>([]);
    const [allTasks, setAllTasks] = useState<Task[]>([]); // Храним полный список задач

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setBranches(response.data.branches);
                setTasks(response.data.tasks.slice(0, 1000));
                setAllTasks(response.data.tasks); // Сохраняем весь массив
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchData();
    }, []);

    const searchTaskTree = (taskId: number) => {
        console.log("Ищем задачу с ID:", taskId);
        const foundTask = allTasks.find(task => task.id === taskId);

        if (!foundTask) {
            console.warn("Задача не найдена!");
            return;
        }

        const resultTree: Task[] = [];
        let currentTask: Task | undefined = foundTask;

        while (currentTask) {
            resultTree.unshift(currentTask);
            console.log("Добавляем в дерево:", currentTask);
            currentTask = allTasks.find(task => task.id === currentTask?.prev);
        }

        console.log("Итоговое дерево:", resultTree);

        setTasks([...resultTree]); // Копируем массив, чтобы React перерисовал компонент
    };

    return (
        <TaskContext.Provider value={{ tasks, branches, searchTaskTree }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext должен быть внутри TaskProvider');
    }
    return context;
};
