import { User } from "@/state/api";
import Image from "next/image";
import React from "react";
import { Mail } from "lucide-react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1">
      {/* Profile Image */}
      {user.profilePictureUrl && (
        <div className="shrink-0">
          <Image
            src={`https://pm-mvp-s3-images.s3.eu-north-1.amazonaws.com/${user.profilePictureUrl}`}
            alt={`${user.username}'s profile picture`}
            width={56}
            height={56}
            className="rounded-full border border-gray-300 shadow-sm"
          />
        </div>
      )}

      {/* User Info */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
        <p className="flex items-center gap-2 text-sm text-gray-600">
          <Mail size={16} className="text-blue-500" />
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserCard;