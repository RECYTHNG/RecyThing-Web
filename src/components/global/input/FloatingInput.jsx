import { DatePicker } from 'antd';
import React, { useState } from 'react';

const FloatingLabelInput = ({ label, placeholder, id, type = "text", className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      {type === "desc" &&
        <div className={`${className} relative mt-3`}>
          <textarea
            id={id}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`block w-full px-3 py-4 text-base leading-6 placeholder:text-black/[0.38] border border-black/[0.23] rounded-[4px] focus:outline-none`}
            placeholder={placeholder}
          />
          <label
            htmlFor={id}
            className="absolute left-3 text-gray-500 transition-all duration-200 ease-in-out rounded-full top-[-8px] text-sm bg-white px-1"
          >
            {label}
          </label>
        </div>
      }

      {type === 'text' &&
        <div className={`${className} relative mt-3`}>
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`block w-full px-3 py-4 text-base leading-6 placeholder:text-black/[0.38] border border-black/[0.23] rounded-[4px] focus:outline-none`}
            placeholder={placeholder}
          />
          <label
            htmlFor={id}
            className="absolute left-3 text-gray-500 transition-all duration-200 ease-in-out rounded-full top-[-8px] text-sm bg-white px-1"
          >
            {label}
          </label>
        </div>
      }

      {type === 'date' &&
        <DatePicker
          id={id}
          value={value}
          onChange={(date, dateString) => setValue(dateString)}
          className={`block w-full px-3 py-4 text-base leading-6 placeholder:text-black/[0.38] border border-black/[0.23] rounded-[4px] focus:outline-none`}
          placeholder={placeholder}
        />
      }

    </>
  );
};

export default FloatingLabelInput;
