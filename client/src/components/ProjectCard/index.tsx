import { Project } from "@/state/api";
import React from "react";
import { CalendarDays, Rocket } from "lucide-react"; // Using lucide icons for flair

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="relative group rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:border-blue-500">
      <div className="absolute -top-5 -left-5 bg-blue-500 text-white p-2 rounded-full shadow-md group-hover:rotate-12 transition-transform">
        <Rocket size={20} />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
        {project.name}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-col gap-1 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-blue-400" size={16} />
          <span>
            <span className="font-medium text-gray-700">Start:</span> {project.startDate}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="text-red-400" size={16} />
          <span>
            <span className="font-medium text-gray-700">End:</span> {project.endDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;