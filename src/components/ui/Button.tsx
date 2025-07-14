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
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border border-blue-600 text-blue-600 hover:bg-blue-50",
};
const defaultStyles = "rounded-[10px] flex";

const sizeStyles: Record<ButtonPropsType["size"], string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const Button = (props: ButtonPropsType) => {
  return (
    <>
      <button
        className={`${variantStyles[props.variant]} ${
          sizeStyles[props.size]
        } ${defaultStyles}`}
      >
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{" "}
        {props.text}
      </button>
    </>
  );
};

export default Button;
