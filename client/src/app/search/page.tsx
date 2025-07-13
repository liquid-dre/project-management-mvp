"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-gray-300 p-3 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:w-1/2"
          onChange={handleSearch}
        />
      </div>

      <div className="p-2 sm:p-4">
        {isLoading && (
          <p className="animate-pulse text-sm text-blue-500">
            Loading results...
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            Error occurred while fetching search results.
          </p>
        )}

        {!isLoading && !isError && searchResults && (
          <div className="space-y-10">
            {/* Tasks Section */}
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <div className="space-y-4">
                <h2 className="border-b border-gray-200 pb-1 text-xl font-semibold text-gray-800">
                  Tasks{" "}
                  <span className="text-sm text-gray-500">
                    ({searchResults.tasks.length})
                  </span>
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {searchResults.projects && searchResults.projects.length > 0 && (
              <div className="space-y-4">
                <h2 className="border-b border-gray-200 pb-1 text-xl font-semibold text-gray-800">
                  Projects{" "}
                  <span className="text-sm text-gray-500">
                    ({searchResults.projects.length})
                  </span>
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Users Section */}
            {searchResults.users && searchResults.users.length > 0 && (
              <div className="space-y-4">
                <h2 className="border-b border-gray-200 pb-1 text-xl font-semibold text-gray-800">
                  Users{" "}
                  <span className="text-sm text-gray-500">
                    ({searchResults.users.length})
                  </span>
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.users.map((user) => (
                    <UserCard key={user.userId} user={user} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results Fallback */}
            {searchResults.tasks?.length === 0 &&
              searchResults.projects?.length === 0 &&
              searchResults.users?.length === 0 && (
                <div className="mt-10 text-center text-sm text-gray-500 italic">
                  No results found for your search. Try adjusting your keywords.
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
