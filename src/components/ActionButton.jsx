import React from "react";
import Link from "next/link";

const ActionButton = () => {
  return (
    <Link
      href="/premium"
      className="rounded-md bg-pink-10 hover:bg-white hover:text-pink-10 text-sm lg:text-lg font-bold lg:text-lg text-center p-4 w-full lg:w-1/2 h-14 flex items-center justify-center font-semibold leading-7"
    >
      Convert Content
    </Link>
  );
};

export default ActionButton;
