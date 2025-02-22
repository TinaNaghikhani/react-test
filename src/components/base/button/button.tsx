import { MouseEvent } from "react";

interface IProps {
  className: string,
  label: string,
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ className, type, label, onClick }: IProps) {
  return (
    <button type={type} className={className} onClick={onClick}>{label}</button>
  )
}

