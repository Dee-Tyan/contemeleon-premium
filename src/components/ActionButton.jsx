import React from "react";
import Link from "next/link";

const ActionButton = () => {
  return (
    <Link
      href="/create"
      className="rounded-md bg-pink-10 hover:bg-white ext-center p-4 w-full lg:w-1/2 h-14 flex items-center justify-center font-space-mono font-bold"
    >
      Convert Content
    </Link>
  );
};

export default ActionButton;
