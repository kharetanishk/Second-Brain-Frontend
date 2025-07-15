import type { ReactElement } from "react";

type VariantStyles = "primary" | "secondary";

export interface ButtonPropsType {
  variant: VariantStyles;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onclick: () => void;
}

const variantStyles: Record<VariantStyles, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-800 shadow-md hover:shadow-lg cursor-pointer",
  secondary:
    " border-blue-800 text-blue-700 hover:bg-blue-50 hover:shadow-sm cursor-pointer font-medium",
};
const defaultStyles = "rounded-[6px] flex font-roboto w-fit ";

const sizeStyles: Record<ButtonPropsType["size"], string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-2.5 py-1.5 text-base",
  lg: "px-3 py-2 text-lg",
};

const Button = (props: ButtonPropsType) => {
  return (
    <>
      <button
        className={`${variantStyles[props.variant]} ${
          sizeStyles[props.size]
        } ${defaultStyles}`}
      >
        {props.startIcon ? <div className="pr-1">{props.startIcon}</div> : null}{" "}
        <span>{props.text}</span>
      </button>
    </>
  );
};

export default Button;
