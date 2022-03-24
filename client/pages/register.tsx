import Header from "../components/header";
import { NextPage } from "next";
import { SignFormContainer } from "./login";
import SignLayout from "../components/auth/sign";

const Register: NextPage = () => {
  return (
    <SignFormContainer>
      <Header />
      <SignLayout />
    </SignFormContainer>
  );
};

export default Register;
