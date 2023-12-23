import React from "react";

const SavedPosts = (props) => {

    const convertText = props?.conversion_type?.toUpperCase()
  return (
    <div className="grid font-space-mono gap-2 text-gray-10">
      <div className="border-2 text-sm bg-gray-70 p-2 w-64 sm:w-80 h-64 overflow-y-scroll">{props.content}</div>
      <div className="grid ">
        <span className="text-base font-bold font-orbitron">
          {convertText} post conversion
        </span>
        <span className="text-sm font-bold font-space-mono bg-transparent">
          Last edited on {props.currentDate} at {props.currentTime}
        </span>
      </div>
    </div>
  );
};

export default SavedPosts;


