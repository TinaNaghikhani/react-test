// import { Ref } from "react";

// interface IProps {
//   name?: string,
//   onChange?: ()=> void,
//   placeholder?: string,
//   label?: string,
//   className: string,
//   id?: string,
//   type: string,
//   error?: string,
//   value?: number | string ,
//   ref?: Ref<HTMLInputElement> | undefined
// }

// export default function Input({
//   id,
//   type = "text",
//   name,
//   onChange,
//   placeholder,
//   label,
//   className,
//   error,
//   ref,
// } : IProps) {
//   return (
//     <div>
//       {label && <label className="text-pink-800" htmlFor={id}>{label}</label>}
//       <div className="flex flex-col gap-2 flex-1">
//         <input
//           type={type}
//           name={name}
//           onChange={onChange}
//           id={id}
//           placeholder={placeholder}
//           className={`${className} focus:outline-none border-none p-1`}
//           ref={ref}
//         />
//         <span className="text-xs text-red-500 tracking-tight">{error}</span>
//       </div>
//     </div>
//   );
// }

import React, { forwardRef } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  className?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ id, type = "text", name, onChange, placeholder, label, className = "", error, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label className="text-pink-800" htmlFor={id}>
            {label}
          </label>
        )}
        <div className="flex flex-col gap-2 flex-1">
          <input
            type={type}
            name={name}
            onChange={onChange}
            id={id}
            placeholder={placeholder}
            className={`${className} focus:outline-none border-none p-1`}
            ref={ref} // ✅ `ref` اینجا به `input` متصل می‌شود
            {...rest}
          />
          {error && <span className="text-xs text-red-500 tracking-tight">{error}</span>}
        </div>
      </div>
    );
  }
);

export default Input;
