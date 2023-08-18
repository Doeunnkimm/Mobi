import { Controller } from "react-hook-form";
import styled from "styled-components";
import { replacePhone } from "../../utils/replacePhone";

const InputBox = ({ name, label, control, ...rest }) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <S.Label htmlFor={name}>{label}</S.Label>
            <S.Input
              name={name}
              placeholder={name}
              onChange={onChange}
              value={name !== "phoneNum" ? value : replacePhone(value)}
              {...rest}
            />
            {error && <S.ERROR role="alert">{error.message}</S.ERROR>}
          </div>
        )}
      />
    </div>
  );
};

export default InputBox;

const Label = styled.label`
  color: darkcyan;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 30px;
  width: 300px;
  height: 50px;
  border: none;
  border-bottom: 1px solid gray;
  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

const ERROR = styled.div`
  color: salmon;
  margin-bottom: 5px;
`;

const S = { Label, Input, ERROR };
