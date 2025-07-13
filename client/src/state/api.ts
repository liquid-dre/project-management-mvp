import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}

// /Calling backend using redux toolkit query
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  // where we call backend endpoints from the frontend
  endpoints: (build) => ({
    // Get projetcs endpoints saying it expects the Project schema to be returned
    // Query is for get requests
    getProjects: build.query<Project[], void>({
      // Calling the endpoint from the backend
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    // Mutation is for post requests
    createProject: build.mutation<Project, Partial<Project>>({
      // Pass in the project as part of the api body for the call
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      // We use invalidates tags so that redux toolkit automatically fetches the updated list of Projects after a new on is added
      invalidatesTags: ["Projects"],
    }),

    // The second part of the method tells us what information to pass into the api
    getTasks: build.query<Task[], { projectId: number }>({
      // Calling the endpoint from the backend
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    getTasksByUser: build.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),

    createTask: build.mutation<Task, Partial<Task>>({
      // Pass in the project as part of the api body for the call
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      // We use invalidates tags so that redux toolkit automatically fetches the updated list of Projects after a new on is added
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      // Pass in the project as part of the api body for the call
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      // We use invalidates tags so that redux toolkit automatically fetches the updated list of Projects after a new on is added
      // TaskId is passed in because you want to update status for 1 task, not all of them
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),

    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useGetTasksByUserQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
} = api;
