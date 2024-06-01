import { ConfigProvider, DatePicker } from 'antd';
import React, { useState } from 'react';
import { MdOutlineCalendarMonth } from 'react-icons/md';

const FloatingLabelInput = ({ label, placeholder, id, type = "text", className, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {type === "desc" &&
        <div className={`${className} relative mt-2`}>
          <textarea
            id={id}
            rows={3}
            type={type}
            value={value}
            onChange={onChange}
            className={`block w-full px-3 py-3 text-base leading-6 text-black placeholder:text-black/[0.38] border border-black/[0.23] rounded-[4px] focus:outline-none`}
            placeholder={placeholder}
          />
          <label
            htmlFor={id}
            className="absolute left-3 text-black/60 transition-all duration-200 ease-in-out rounded-full top-[-8px] text-sm bg-white px-1"
          >
            {label}
          </label>
        </div>
      }

      {type === 'text' &&
        <div className={`${className} relative mt-2`}>
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`block w-full px-3 py-3 text-base leading-6 text-black placeholder:text-black/[0.38] border border-black/[0.23] rounded-[4px] focus:outline-none`}
            placeholder={placeholder}
          />
          <label
            htmlFor={id}
            className="absolute left-3 text-black/60 transition-all duration-200 ease-in-out rounded-full top-[-8px] text-sm bg-white px-1"
          >
            {label}
          </label>
        </div>
      }

      {type === 'date' &&
        <div className={`${className} relative mt-2`}>
          <ConfigProvider
            theme={{
              components: {
                DatePicker: {
                  colorTextPlaceholder: "rgb(0 0 0 / 0.38)",
                  colorText: "black",
                  fontSize: "",
                  hoverBorderColor: "",
                  activeBorderColor: "",
                  activeShadow: ""
                },
              }
            }}>
            <DatePicker
              id={id}
              value={value}
              onChange={onChange}
              format={"DD/MM/YYYY"}
              suffixIcon={<MdOutlineCalendarMonth className='text-dark-800 text-lg' />}
              styles={{
                popup: {
                  accentColor: "red"
                }
              }}
              className={`block w-full px-3 py-3 text-base leading-6 border border-black/[0.23] rounded-[4px] focus:outline-none focus:border-none`}
              placeholder={placeholder}
            />
          </ConfigProvider>
          <label
            htmlFor={id}
            className="absolute left-3 text-black/60 transition-all duration-200 ease-in-out rounded-full top-[-8px] text-sm bg-white px-1"
          >
            {label}
          </label>
        </div>
      }

    </>
  );
};

export default FloatingLabelInput;
