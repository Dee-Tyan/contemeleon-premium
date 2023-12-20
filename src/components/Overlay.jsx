import React from "react";

const Overlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // Adjust the z-index based on your layout
      }}
    >
      <div style={{ color: "white", fontSize: "20px" }}>Loading...</div>
    </div>
  );
};

export default Overlay;
