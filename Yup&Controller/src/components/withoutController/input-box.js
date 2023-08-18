import styled from "styled-components";

const InputBox = ({ name, register, errors, handleChange, value }) => {
  return (
    <div>
      <label htmlFor={name}>{name.toUpperCase()}</label>
      <S.Input
        name={name}
        placeholder={name}
        {...register(name)}
        errors={errors[name]}
        onChange={handleChange}
        value={value}
      />
      {errors[name] && <S.ERROR role="alert">{errors[name].message}</S.ERROR>}
    </div>
  );
};

export default InputBox;

const Input = styled.input`
  display: block;
  margin: 10px 0;
  width: 300px;
  height: 50px;
  border: none;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }
`;

const ERROR = styled.div`
  color: salmon;
  margin-bottom: 20px;
`;

const S = {
  Input,
  ERROR,
};
