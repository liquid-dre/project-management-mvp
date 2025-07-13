import Header from "@/components/Header";
import React from "react";
import { Mail, User, Users, BadgeCheck } from "lucide-react";

const Settings = () => {
  const userSettings = {
    username: "johndoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  const labelStyles = "block text-sm font-semibold text-gray-600 mb-1";
  const boxStyles =
    "flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition";

  return (
    <div className="p-8">
      <Header name="Settings" />

      <div className="mt-6 space-y-6">
        {/* Username */}
        <div>
          <label className={labelStyles}>Username</label>
          <div className={boxStyles}>
            <User className="text-blue-500" size={18} />
            <span className="text-gray-800 text-sm">{userSettings.username}</span>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelStyles}>Email</label>
          <div className={boxStyles}>
            <Mail className="text-blue-500" size={18} />
            <span className="text-gray-800 text-sm">{userSettings.email}</span>
          </div>
        </div>

        {/* Team */}
        <div>
          <label className={labelStyles}>Team</label>
          <div className={boxStyles}>
            <Users className="text-blue-500" size={18} />
            <span className="text-gray-800 text-sm">{userSettings.teamName}</span>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className={labelStyles}>Role</label>
          <div className={boxStyles}>
            <BadgeCheck className="text-blue-500" size={18} />
            <span className="text-gray-800 text-sm">{userSettings.roleName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;