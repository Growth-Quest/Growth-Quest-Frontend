import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./index.css";

function LoadingScreen() {
  const loading = true;

  return (
    <div
      className="LoadingScreen"
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PuffLoader color={"#36d7b7"} size={100} loading={loading} />
      </div>
    </div>
  );
}

export default LoadingScreen;

