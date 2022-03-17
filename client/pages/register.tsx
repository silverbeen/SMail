import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import { InputBox, SignBtn, SignForm, SignFormContainer } from "./login";

const Register = () => {
  const [btnColor, setBtnColor] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    userId: "",
    userPassword: "",
    userName: "",
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputs);

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

  return (
    <SignFormContainer>
      <Header />
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
    </SignFormContainer>
  );
};

export default Register;
