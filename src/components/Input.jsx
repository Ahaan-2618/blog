import { forwardRef, useId } from "react";

const FRInput = forwardRef(function Input(
  // eslint-disable-next-line react/prop-types
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label className="w-full inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        type={type}
        {...props}
        id={id}
      ></input>
    </div>
  );
});

export default FRInput;
