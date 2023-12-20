import React from "react";
import Link from "next/link";

const ActionButton = () => {
  return (
    <Link
      href="/create"
      className="rounded-md bg-pink-10 hover:bg-purple-10 text-sm lg:text-lg text-center p-4 w-full lg:w-1/2 h-14 flex items-center justify-center font-orbitron font-semibold leading-7"
    >
      Convert Content
    </Link>
  );
};

export default ActionButton;
