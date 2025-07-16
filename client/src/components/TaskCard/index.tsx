import { Task } from "@/state/api";
import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { ClipboardList, User, CalendarDays, Tag, Flag } from "lucide-react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const statusColor: Record<string, string> = {
    "To Do": "bg-blue-500",
    "Work In Progress": "bg-emerald-500",
    "Under Review": "bg-amber-500",
    Completed: "bg-black",
  };

  return (
    <div className="group relative mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Task Icon - Top Left */}
      <div className="absolute -top-4 -left-4 rounded-full bg-indigo-500 p-2 text-white shadow-md transition-transform group-hover:rotate-12">
        <ClipboardList size={20} />
      </div>

      {/* Floating Task ID Badge - Top Right */}
      <div className="absolute top-0 right-0 m-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 transition group-hover:bg-blue-100 group-hover:text-blue-600">
        #{task.id}
      </div>

      {/* Attachments */}
      {task.attachments && task.attachments?.length > 0 && (
        <div className="mb-4">
          <strong className="text-sm font-medium text-gray-700">
            Attachments:
          </strong>
          <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <Image
              src={`https://pm-mvp-s3-images.s3.eu-north-1.amazonaws.com/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="mb-2 text-2xl font-semibold text-gray-800 transition group-hover:text-blue-600">
        {task.title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm text-gray-600">
        <span className="font-medium text-gray-700">Description:</span>{" "}
        {task.description || "No description provided"}
      </p>

      {/* Metadata */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User size={16} className="text-blue-500" />
          <span>
            <strong>Author:</strong> {task.author?.username || "Unknown"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User size={16} className="text-green-500" />
          <span>
            <strong>Assignee:</strong> {task.assignee?.username || "Unassigned"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Flag size={16} className="text-purple-500" />
          <strong>Status:</strong>
          <span
            className={`ml-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${
              statusColor[task.status ?? ""] || "bg-gray-500"
            }`}
          >
            {task.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Flag size={16} className="text-yellow-500" />
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

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Tag size={16} className="text-gray-400" />
          <strong>Tags:</strong> <span>{task.tags || "No tags"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarDays size={16} className="text-indigo-500" />
          <strong>Start:</strong>{" "}
          <span>
            {task.startDate
              ? format(new Date(task.startDate), "PPP")
              : "Not set"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarDays size={16} className="text-rose-500" />
          <strong>Due:</strong>{" "}
          <span>
            {task.dueDate ? format(new Date(task.dueDate), "PPP") : "Not set"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
