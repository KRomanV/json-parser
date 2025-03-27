import React, { useState, useEffect, useCallback } from 'react';
import { TreeView } from '@patternfly/react-core';
import { useTaskContext } from '../context/TaskContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import BranchList from './BranchList';
import { Task } from "../types";
import '../style.css';

const PAGE_SIZE = 1000;

const TaskTree: React.FC = () => {
    const { tasks, branches } = useTaskContext();
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [visibleTasks, setVisibleTasks] = useState(tasks.slice(0, PAGE_SIZE));

    useEffect(() => {
        setVisibleTasks(tasks.slice(0, PAGE_SIZE * page));
    }, [tasks, page]);

    const handleBranchSelect = (branch: string) => {
        setSelectedBranch(branch);
        setPage(1);
        setVisibleTasks(tasks.filter(t => t.branch === branch).slice(0, PAGE_SIZE));
    };

    const fetchMoreData = useCallback(() => {
        setPage(prev => prev + 1);
    }, []);


    const buildTree = (tasks: Task[]) => {
        const taskMap = new Map<number, any>();
        tasks.forEach(task => taskMap.set(task.id, { id: String(task.id), name: `Task ${task.id} (${task.date})`, children: [] }));

        tasks.forEach(task => {
            if (task.prev && taskMap.has(task.prev)) {
                taskMap.get(task.prev).children.push(taskMap.get(task.id));
            }
        });

        return Array.from(taskMap.values()).filter(task => !tasks.some(t => t.id === task.prev));
    };

    console.log(visibleTasks.length < tasks.length)
    return (
        <div className="task-tree-container">
            <h2>Branches</h2>
            <BranchList branches={branches} onSelectBranch={handleBranchSelect} />

            {selectedBranch && (
                <InfiniteScroll
                    className="task-list"
                    dataLength={visibleTasks.length}
                    next={fetchMoreData}
                    hasMore={visibleTasks.length < tasks.length}
                    scrollableTarget="scroll-container"
                    loader={<h4>Загрузка...</h4>}
                >
                    <div id="scroll-container" style={{height: "500px", overflowY: "auto"}}>
                        <TreeView data={buildTree(visibleTasks)}/>
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default TaskTree;
