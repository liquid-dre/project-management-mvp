"use client";

import {
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import React, { useEffect, useState } from "react";
// import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from "@nivo/calendar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { ClipboardList, Flag, User } from "lucide-react";

const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "priority", headerName: "Priority", width: 150 },
  { field: "dueDate", headerName: "Due Date", width: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  useEffect(() => {
    if (!selectedProjectId && projects && projects.length > 0) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: selectedProjectId! });

  if (tasksLoading || isProjectsLoading) return <div>Loading..</div>;
  if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

  // const priorityCount = tasks.reduce(
  //   (acc: Record<string, number>, task: Task) => {
  //     const { priority } = task;
  //     acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
  //     return acc;
  //   },
  //   {},
  // );

  // const taskDistribution = Object.keys(priorityCount).map((key) => ({
  //   name: key,
  //   count: priorityCount[key],
  // }));

  // const statusCount = projects.reduce(
  //   (acc: Record<string, number>, project: Project) => {
  //     const status = project.endDate ? "Completed" : "Active";
  //     acc[status] = (acc[status] || 0) + 1;
  //     return acc;
  //   },
  //   {},
  // );

  // const projectStatus = Object.keys(statusCount).map((key) => ({
  //   name: key,
  //   count: statusCount[key],
  // }));

  // const chartColors = isDarkMode
  //   ? {
  //       bar: "#8884d8",
  //       barGrid: "#303030",
  //       pieFill: "#4A90E2",
  //       text: "#FFFFFF",
  //     }
  //   : {
  //       bar: "#8884d8",
  //       barGrid: "#E0E0E0",
  //       pieFill: "#82ca9d",
  //       text: "#000000",
  //     };

  const taskStatusCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const status = task.status ?? "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const taskStatusBarData = Object.entries(taskStatusCount).map(
    ([status, count]) => ({
      status,
      count,
    }),
  );

  const taskStatusData = Object.entries(taskStatusCount).map(
    ([status, count]) => ({
      name: status,
      count,
    }),
  );

  const calendarData = tasks
    .filter((task) => task.dueDate) // or use startDate
    .map((task) => ({
      day: new Date(task.dueDate!).toISOString().split("T")[0],
      value: 1, // or use a score/priority system if needed
    }));

  const tasksForSelectedDay = tasks.filter(
    (task) =>
      selectedDay &&
      task.dueDate &&
      new Date(task.dueDate).toISOString().split("T")[0] === selectedDay,
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <Header
        name="📊 Project Management Dashboard"
        buttonComponent={
          <select
            value={selectedProjectId ?? ""}
            onChange={(e) => setSelectedProjectId(Number(e.target.value))}
            className="rounded-md border border-gray-300 p-2"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        }
      />

      <div className="animate-fadeIn mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Task Priority Chart */}
        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              Task Status Distribution
            </h3>
          </div>

          <div style={{ height: 320 }}>
            <ResponsiveBar
              data={taskStatusBarData}
              keys={["count"]}
              indexBy="status"
              margin={{ top: 40, right: 20, bottom: 60, left: 60 }}
              padding={0.3}
              colors={{ scheme: "set2" }}
              borderRadius={4}
              colorBy="indexValue"
              axisBottom={{
                tickRotation: 0,
                legend: "Status",
                legendPosition: "middle",
                legendOffset: 40,
              }}
              axisLeft={{
                tickValues: "every 1",
                legend: "Tasks",
                legendPosition: "middle",
                legendOffset: -50,
              }}
              animate
              motionConfig="molasses"
              tooltip={({ indexValue, value }) => (
                <strong>
                  {indexValue}: {value} task{value !== 1 ? "s" : ""}
                </strong>
              )}
            />
          </div>
        </div>

        {/* Project Status Pie Chart */}
        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              Task Status Breakdown
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                dataKey="count"
                data={taskStatusData}
                fill="#82ca9d"
                label
                outerRadius={90}
              >
                {taskStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Task Table */}
        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg md:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              Your Active Tasks
            </h3>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              className={dataGridClassNames}
              sx={dataGridSxStyles()}
            />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg md:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              Task Timeline (Due Dates)
            </h3>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveCalendar
              onClick={(dayData) => {
                setSelectedDay(dayData.day);
                setIsSheetOpen(true);
              }}
              data={calendarData}
              from={calendarData[0]?.day || "2024-01-01"}
              to={calendarData[calendarData.length - 1]?.day || "2024-12-31"}
              emptyColor="#eeeeee"
              colors={["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"]}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              yearSpacing={40}
              monthSpacing={20}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              tooltip={({ day, value }) => {
                const numericValue = Number(value);
                return (
                  <strong>
                    {numericValue} task{numericValue > 1 ? "s" : ""} on {day}
                  </strong>
                );
              }}
            />
          </div>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            side="right"
            className="w-full rounded-l-2xl bg-white p-6 shadow-xl sm:max-w-md"
          >
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-gray-800">
                Tasks on {selectedDay}
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                {tasksForSelectedDay.length === 0
                  ? "No tasks for this day."
                  : "Here are the tasks due on this date."}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {tasksForSelectedDay.map((task) => {
                const statusColor: Record<string, string> = {
                  "To Do": "bg-blue-500",
                  "Work In Progress": "bg-emerald-500",
                  "Under Review": "bg-amber-500",
                  Completed: "bg-black",
                };

                return (
                  <div
                    key={task.id}
                    className="group relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Icon Top Left */}
                    <div className="absolute -top-4 -left-4 rounded-full bg-indigo-500 p-2 text-white shadow-md transition-transform group-hover:rotate-12">
                      <ClipboardList size={16} />
                    </div>

                    {/* Floating ID badge */}
                    <div className="absolute top-0 right-0 m-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 transition group-hover:bg-blue-100 group-hover:text-blue-600">
                      #{task.id}
                    </div>

                    {/* Title */}
                    <h4 className="mb-1 text-lg font-semibold text-gray-800 transition group-hover:text-blue-600">
                      {task.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-gray-600">
                      {task.description || "No description"}
                    </p>

                    {/* Metadata */}
                    <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-blue-500" />
                        <span>
                          <strong>Author:</strong>{" "}
                          {task.author?.username || "Unknown"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <User size={14} className="text-green-500" />
                        <span>
                          <strong>Assignee:</strong>{" "}
                          {task.assignee?.username || "Unassigned"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Flag size={14} className="text-purple-500" />
                        <strong>Status:</strong>
                        <span
                          className={`ml-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                            statusColor[task.status ?? ""] || "bg-gray-500"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Flag size={14} className="text-yellow-500" />
                        <strong>Priority:</strong>
                        <span
                          className={`ml-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            task.priority === "Urgent"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "High"
                                ? "bg-yellow-100 text-yellow-700"
                                : task.priority === "Medium"
                                  ? "bg-green-100 text-green-700"
                                  : task.priority === "Low"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default HomePage;
