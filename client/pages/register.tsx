import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import { NextPage } from "next";
import { InputBox, SignBtn, SignForm } from "../components/sign/login";
import { SignFormContainer } from "./login";
import SignLayout from "../components/sign/sign";

const Register: NextPage = () => {
  return (
    <SignFormContainer>
      <Header />
      <SignLayout />
    </SignFormContainer>
  );
};

export default Register;
