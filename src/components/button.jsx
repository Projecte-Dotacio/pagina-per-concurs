import React, { useState } from "react";

const Button = () => {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-white border-2 mt-16 border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-blue-600 transition-colors w-full sm:w-auto"
        onClick={incrementCounter}
      >
        Clicla: {count}
      </button>
    </div>
  );
};

export default Button;
