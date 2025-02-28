import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosClient from "../../../api/axiosClient";
import logo from "../../../asset/image/logo.png";
import { setAccountSuccess } from "../../../redux/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./style.css";

const FromLogin = styled.div`
  margin: 150px auto;
  max-width: 470px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: #202020;
`;

const Form = styled.div`
  padding: 20px;
  color: white;
`;

const Forgot = styled(Link)`
  margin: 20px 0;
  text-decoration: underline;
  text-align: right;
  color: white;
  &:hover {
    color: white;
  }
`;
const LoginButton = styled.button`
  background-color: #0074e4;
  padding: 10px;
  font-weight: 500;
`;
const Note = styled.div`
  text-align: center;
  margin: 30px 0;
`;
const Text = styled.span`
  color: #ffffffb8;
  font-size: 14px;
`;
const Logo = styled.div`
  max-width: 150px;
  margin: auto;
`;
const LogoImg = styled.img`
  width: 100%;
  height: auto;
`;
const InputForm = styled.div`
  height: 40px;
  width: 100%;
  position: relative;
`;
const Title = styled.p`
  text-align: center;
  font-size: 1.125rem;
  font-family: Brutal, sans-serif;
  font-weight: 500;
  line-height: 1.5625rem;
  letter-spacing: 0.5px;
`;
function SignIn() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { register, handleSubmit } = useForm();
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassWord, setCheckPassWord] = useState(true);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setIsFetching(false);
    }, 2000);
  }, []);

  const dispatch = useDispatch();
  if (isLogin) {
    navigate("/");
    return;
  }
  const onSubmit = async (data) => {
    const emailExist = await axiosClient(`/users?Email=${data.Email}`);
    if (emailExist.length) {
      const res = await axiosClient(
        `/users?Email=${data.Email}&Password=${data.Password}`
      );
      if (!res.length) {
        setCheckPassWord(false);
        return;
      }
      localStorage.setItem("auth", JSON.stringify(res[0]));
      dispatch(setAccountSuccess(res[0]));
      navigate("/");
    } else {
      setCheckEmail(false);
    }
  };

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
          color: "grey.500",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }
  return (
    <FromLogin>
      <Form>
        <Logo>
          <LogoImg src={logo} />
          <Title>Sign In</Title>
        </Logo>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column justify-content-around"
        >
          <InputForm className="input-form">
            <input
              type="text"
              required
              {...register("Email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <div className="underline"></div>
            <label>Email Adress</label>
            {!checkEmail && <p className="text-danger">Email incorrect</p>}
          </InputForm>
          <InputForm className="input-form">
            <input type="password" required {...register("Password")} />
            <div className="underline"></div>
            <label>Password</label>
            {!checkPassWord && (
              <p className="text-danger">Password incorrect</p>
            )}
          </InputForm>

          <Forgot>Forgot Your Password</Forgot>
          <LoginButton>Login In Now</LoginButton>
        </form>
        <Note>
          <Text>Don’t have an Augustus Games account? </Text>
          <Forgot to="/signup">Sign Up</Forgot>
          <div>
            <Text>Back to </Text>
            <Forgot to="/">Store</Forgot>
          </div>
        </Note>
      </Form>
    </FromLogin>
  );
}

export default SignIn;
