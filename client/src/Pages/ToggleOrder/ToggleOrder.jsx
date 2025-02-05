"use client";

import { useEffect, useState } from "react";

const ToggleOrder = () => {
  const [nidCopy, setNidCopy] = useState(false);

  useEffect(() => {
    fetch("/api/apply/toggle-order")
      .then((res) => res.json())
      .then((data) => {
        setNidCopy(data.nidCopy);
      });
  });

  const toggleSwitch = (setter) => {
    setter((prev) => !prev);
  };

  const ToggleButton = ({ isOn, label, onClick }) => (
    <div className="flex items-center space-x-4">
      <span className="text-white">{label}</span>
      <button
        onClick={onClick}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          ${isOn ? "bg-green-600" : "bg-gray-600"}
          transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ease-in-out
            ${isOn ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
      <span className="text-white">{isOn ? "On" : "Off"}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-gray-900">
      <h1 className="mb-8 text-3xl font-bold text-white">Turn On/Off Order</h1>
      <ToggleButton
        label="Sign/Nid Copy"
        isOn={nidCopy}
        onClick={async () => {
          await fetch("/api/apply/toggle-order", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              toggleName: "nidCopy",
              status: !nidCopy,
            }),
          });
          toggleSwitch(setNidCopy);
        }}
      />
    </div>
  );
};

export default ToggleOrder;
