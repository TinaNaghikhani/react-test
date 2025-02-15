
import { Ref } from "react";

interface IProps {
  name: string,
  onChange?: Function,
  placeholder?: string,
  label?: string,
  className: string,
  id?: string,
  type: string,
  error?: string,
  value?: number ,
  ref?: Ref<HTMLInputElement> | undefined
}

export default function Input({
  id,
  type = "text",
  name,
  onChange,
  placeholder,
  label,
  className,
  error,
  ref,
} : IProps) {
  return (
    <div>
      {label && <label className="text-pink-800" htmlFor={id}>{label}</label>}
      <div className="flex flex-col gap-2 flex-1 ">
        <input
          type={type}
          name={name}
          onChange={()=>{}}
          id={id}
          placeholder={placeholder}
          className={`${className} outline-none border-none p-1`}
          ref={ref}
        />
        <span className="text-xs text-red-500 tracking-tight">{error}</span>
      </div>
    </div>
  );
}
