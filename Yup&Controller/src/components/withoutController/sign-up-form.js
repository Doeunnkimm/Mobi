import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import InputBox from "./inputBox";
import * as SCHEMA from "../../consts/schema";
import * as yup from "yup";

const SignUpForm = () => {
  const { email, password, passwordConfirm, phoneNum, age } = SCHEMA;
  const schema = yup
    .object()
    .shape({ email, password, passwordConfirm, phoneNum, age });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

  const handleChangeVal = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
    trigger(name);
  };

  return (
    <S.Container>
      <S.Title>SIGN UP</S.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
          name={"email"}
          register={register}
          errors={errors}
          handleChange={handleChangeVal}
          value={getValues("email")}
        />
        <InputBox
          name={"password"}
          register={register}
          errors={errors}
          handleChange={handleChangeVal}
          value={getValues("password")}
        />
        <InputBox
          name={"passwordConfirm"}
          register={register}
          errors={errors}
          handleChange={handleChangeVal}
          value={getValues("passwordConfirm")}
        />
        <InputBox
          name={"name"}
          register={register}
          errors={errors}
          handleChange={handleChangeVal}
          value={getValues("name")}
        />
        <InputBox
          name={"age"}
          register={register}
          errors={errors}
          handleChange={handleChangeVal}
          value={getValues("age")}
        />

        <div>
          <S.Button>SUBMIT</S.Button>
        </div>
      </form>
    </S.Container>
  );
};

export default SignUpForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  form {
    margin-top: 20px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
`;

const Button = styled.button`
  background-color: "black";
  color: white;
  border: none;
  width: 100px;
  height: 50px;
  margin-left: 100px;
`;

const S = { Container, Title, Button };
