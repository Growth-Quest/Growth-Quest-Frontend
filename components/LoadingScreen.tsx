import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

function LoadingScreen() {
  const loading = true;

  return (
    <div className="LoadingScreen">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PuffLoader color={"#36d7b7"} size={50} loading={loading} />
      </div>
    </div>
  );
}

export default LoadingScreen;
