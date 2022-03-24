import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { MAIN_URL } from "../../../lib/api/common";
import { ToastError, ToastSuccess } from "../../../lib/function/toast";
import { InputBox, SignBtn, SignForm } from "../login";

const SignLayout = () => {
  const router = useRouter();
  const [btnColor, setBtnColor] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    userId: "",
    userPassword: "",
    userName: "",
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    signMutation();
    setInputs({ userId: "", userPassword: "", userName: "" });
  };

  const inputChangeHandle = (e: any) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    inputs.userId.length !== 0 &&
    inputs.userPassword.length !== 0 &&
    inputs.userName.length !== 0
      ? setBtnColor(true)
      : setBtnColor(false);
  }, [inputs]);

  const { mutate: signMutation } = useMutation(
    "sign",
    () => axios.post(`${MAIN_URL}/user`, inputs),
    {
      onSuccess: () => {
        ToastSuccess("회원가입에 성공했습니다.");
        setTimeout(() => {
          router.replace("/login");
        }, 1000);
      },
      onError: () => {
        ToastError("회원가입에 실패하셨습니다.");
      },
    }
  );

  return (
    <SignForm onSubmit={(e) => onSubmit(e)}>
      <h2>SIGN UP</h2>
      <InputBox>
        <span>Name</span>
        <input
          type="text"
          placeholder="사용하실 이름을 입력해주세요."
          required
          onChange={(e) => inputChangeHandle(e)}
          name="userName"
        />
        <div className="border_circle" />
      </InputBox>
      <InputBox>
        <span>ID</span>
        <input
          type="text"
          placeholder="ID를 입력해주세요."
          required
          onChange={(e) => inputChangeHandle(e)}
          name="userId"
        />
        <div className="border_circle" />
      </InputBox>
      <InputBox>
        <span>Password</span>
        <input
          type="password"
          placeholder="Password를 입력해주세요."
          required
          onChange={(e) => inputChangeHandle(e)}
          name="userPassword"
        />
        <div className="border_circle" />
      </InputBox>

      <Link href="/register">계정이 있으신가요?</Link>

      <SignBtn type="submit" btnColor={btnColor}>
        SIGN UP
      </SignBtn>
    </SignForm>
  );
};

export default SignLayout;
