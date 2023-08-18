import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import InputBox from "./inputBox";
import * as SCHEMA from "../../consts/schema";
import * as yup from "yup";

const SignUpFormWithController = () => {
  const { email, password, passwordConfirm, phoneNum, age } = SCHEMA;
  const schema = yup
    .object()
    .shape({ email, password, passwordConfirm, phoneNum, age });

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(`${data.email}님 환영합니다!`);
  };

  return (
    <S.Container>
      <S.Title>SIGN UP</S.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox name={"email"} label="이메일" control={control} />
        <InputBox
          name={"password"}
          label="비밀번호"
          control={control}
          type="password"
        />
        <InputBox
          name={"passwordConfirm"}
          label="비밀번호 확인"
          control={control}
          type="password"
        />
        <InputBox name={"phoneNum"} label="연락처" control={control} />
        <InputBox name={"age"} label="나이" control={control} />
        <div>
          <S.Button>SUBMIT</S.Button>
        </div>
      </form>
    </S.Container>
  );
};

export default SignUpFormWithController;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  form {
    margin-top: 20px;
  }
  font-size: 14px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  width: 100px;
  height: 50px;
  margin-left: 100px;
`;

const S = { Container, Title, Button };
