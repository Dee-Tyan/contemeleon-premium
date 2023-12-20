import React from "react";
import Link from "next/link";

const ActionButton = () => {
  return (
    <Link
      href="/create"
      className="rounded-md bg-pink-10 to-92.36% hover:purple-10 ext-center px-4 h-14 flex items-center justify-center font-space-mono font-bold"
    >
      Get Started 🪄
    </Link>
  );
};

export default ActionButton;
