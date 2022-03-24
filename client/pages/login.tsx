import styled from "@emotion/styled";
import { NextPage } from "next";
import { HomeConrainer } from "./index";
import Header from "../components/header";
import LoginLayout from "../components/auth/login";

const Login: NextPage = () => {
  return (
    <SignFormContainer>
      <Header />
      <LoginLayout />
    </SignFormContainer>
  );
};

export const SignFormContainer = styled(HomeConrainer)`
  margin: 0 auto;
  align-items: center;
`;

export default Login;
