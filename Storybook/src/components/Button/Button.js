import React from "react";
import * as S from "./Button.style";

const Button = ({
  color = "primary",
  size = "medium",
  isBorder = false,
  borderWeight = 1,
  radius = "primary",
  label,
  onClick,
  ...props
}) => {
  return (
    <S.Button
      type="button"
      color={color}
      size={size}
      isBorder={isBorder}
      borderWeight={borderWeight}
      radius={radius}
      onClick={onClick}
      {...props}
    >
      {label}
    </S.Button>
  );
};

export default Button;

Button.defaultProps = {
  color: "primary",
  size: "medium",
  isBorder: false,
  radius: "primary",
  label: "This is an Input",
};
