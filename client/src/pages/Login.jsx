import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for eye and eye-slash

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";

const MainContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/premium-vector/set-hand-drawn-online-shopping-doodle_563464-55.jpg")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 30px;
  background-color: #c0c0c0;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const IconContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888; /* Grey color */
`;

const PasswordInput = styled(Input)`
  padding-right: 210px; /* Adjust padding to accommodate the icon */
`;
const Button = styled.button`
  width: 30%;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out; /* Add smooth transition effect */

  &:hover {
    background-color: #333; /* Use a smooth grey color for hover state */
  }

  &:disabled {
    color: black;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
  margin-top: 5px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUSername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for showing password

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <MainContainer>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="Username"
              onChange={(e) => setUSername(e.target.value)}
            />
            <IconContainer>
              <PasswordInput
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Icon onClick={handleTogglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </Icon>
            </IconContainer>
            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            {error && (
              <Error>Login Unsuccessful! Something went wrong...</Error>
            )}

            <br />
            <Link>Forgot Password?</Link>
            <Link>New? Create a new account</Link>
          </Form>
        </Wrapper>
      </Container>
    </MainContainer>
  );
};

export default Login;
