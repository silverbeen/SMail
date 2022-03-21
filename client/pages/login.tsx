import styled from "@emotion/styled";
import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { HomeConrainer } from ".";
import Header from "../components/header";
import { MAIN_URL } from "../lib/api/common";
import { ToastError, ToastSuccess } from "../lib/function/toast";
import { mintBlueColor } from "../styles/color";

const Login = () => {


  return (
    <SignFormContainer>
      <Header />
      <Login />
    </SignFormContainer>
  );
};

export const SignFormContainer = styled(HomeConrainer)`
  margin: 0 auto;
  align-items: center;
`;

export default Login;
