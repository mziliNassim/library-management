import React from "react";
import Lottie from "react-lottie";
import animationData from "../../animation/loader.json"; // Adjust the path to your Lottie JSON file

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Your Lottie animation JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie
        options={defaultOptions}
        height={200} // Adjust the height as needed
        width={200} // Adjust the width as needed
      />
    </div>
  );
};

export default Loader;
