import { useGetTasksQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { PlusCircle } from "lucide-react";

type TimelineProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = ({ id, setIsModalNewTaskOpen }: TimelineProps) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const niceColors = [
    "#60A5FA", // blue-400
    "#34D399", // green-400
    "#F472B6", // pink-400
    "#FBBF24", // yellow-400
    "#A78BFA", // purple-400
    "#F87171", // red-400
    "#38BDF8", // sky-400
    "#FDBA74", // orange-400
  ];

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task, index) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
        styles: {
          backgroundColor: niceColors[index % niceColors.length],
          progressColor: niceColors[index % niceColors.length],
          backgroundSelectedColor: "#1E40AF", // optional darker shade on click
        },
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="text-sm text-gray-500">Loading timeline...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        Error fetching tasks.
      </div>
    );
  }

  return (
    <div className="px-4 py-6 xl:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          📊 Project Timeline
        </h1>
        <div className="relative inline-block">
          <select
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-all hover:border-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>📅 Day</option>
            <option value={ViewMode.Week}>🗓 Week</option>
            <option value={ViewMode.Month}>📆 Month</option>
          </select>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-lg transition-all">
        <div className="overflow-x-auto rounded-t-2xl">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="140px"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end px-6 py-4">
          <button
            onClick={() => setIsModalNewTaskOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
          >
            <PlusCircle className="h-5 w-5" />
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
