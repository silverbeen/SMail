import styled from "@emotion/styled";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { MAIN_URL } from "../../../lib/api/common";
import { ToastError, ToastSuccess } from "../../../lib/function/toast";
import { mintBlueColor } from "../../../styles/color";

const Login = () => {
  const router = useRouter();
  const [btnColor, setBtnColor] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    userId: "",
    userPassword: "",
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    signMutation();
    setInputs({ userId: "", userPassword: "" });
  };

  const inputChangeHandle = (e: any) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    inputs.userId.length !== 0 && inputs.userPassword.length !== 0
      ? setBtnColor(true)
      : setBtnColor(false);
  }, [inputs]);

  const { mutate: signMutation } = useMutation(
    "login",
    () => axios.post(`${MAIN_URL}/user/login`, inputs),
    {
      onSuccess: (res) => {
        localStorage.setItem("access_token", res.data.access_token);
        ToastSuccess("로그인 되었습니다");
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      },
      onError: () => {
        ToastError("정보를 다시 확인해주세요.");
      },
    }
  );
  return (
    <SignForm onSubmit={(e) => onSubmit(e)}>
      <h2>LOGIN</h2>
      <InputBox>
        <span>ID</span>
        <input
          type="text"
          placeholder="ID를 입력해주세요."
          required
          onChange={(e) => inputChangeHandle(e)}
          name="userId"
          value={inputs.userId}
        />
        <div className="border_circle" />
      </InputBox>
      <InputBox>
        <span>PW</span>
        <input
          type="password"
          placeholder="PW를 입력해주세요."
          required
          onChange={(e) => inputChangeHandle(e)}
          name="userPassword"
          value={inputs.userPassword}
        />
        <div className="border_circle" />
      </InputBox>
      <Link href="/register">아직 계정이 없으신가요?</Link>

      <SignBtn type="submit" btnColor={btnColor}>
        LOGIN
      </SignBtn>
    </SignForm>
  );
};

export const SignForm = styled.form`
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  gap: 20px;

  h2 {
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 20px;
  }

  a {
    font-size: 12px;
    color: #ffffffcf;
  }
`;

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .border_circle {
    width: 100%;
    height: 2px;
    background: white;
    border-radius: 10px;
  }

  & input {
    margin: 8px 0;
    background: none;
    border: none;
    outline: none;
    color: white;
    font-size: 14px;

    ::placeholder {
      color: #ffffff94;
    }
  }
`;

export const SignBtn = styled.button<{ btnColor: boolean }>`
  font-size: 14px;
  width: 100%;
  margin-top: 20px;
  padding: 8px 0;
  color: white;
  border: none;
  box-sizing: border-box;
  background: ${({ btnColor }) =>
    btnColor ? `${mintBlueColor}` : "rgba(255, 255, 255, 0.38)"};
  border-radius: 5px;
  cursor: pointer;
  transition: all 1s;
`;

export default Login;
