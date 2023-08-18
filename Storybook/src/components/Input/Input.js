import { forwardRef } from "react";

import * as S from "./Input.style";

const Input = (
  { icon, label, status = "default", message, onChange, ...rest },
  ref
) => {
  return (
    <S.Label hasMessage={!!message} hasLabel={!!label}>
      {icon && <S.Icon>{icon}</S.Icon>}
      {label && <S.LabelText>{label}</S.LabelText>}
      <S.Input
        ref={ref}
        status={status}
        hasIcon={!!icon}
        onChange={onChange}
        {...rest}
      />
      {message && <S.Message status={status}>{message}</S.Message>}
    </S.Label>
  );
};

export default forwardRef(Input);
