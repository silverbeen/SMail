import styled from "@emotion/styled";
import {NextPage} from "next";
import Header from "../components/header";
import LoginLayout from "../components/auth/login";
import {HomeContainer} from ".";

const Login: NextPage = () => {
  return (
    <SignFormContainer>
      <Header />
      <LoginLayout />
    </SignFormContainer>
  );
};

export const SignFormContainer = styled(HomeContainer)`
  margin: 0 auto;
  align-items: center;
`;

export default Login;
