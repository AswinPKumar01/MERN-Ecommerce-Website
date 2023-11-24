import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for eye and eye-slash
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/userRedux";
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
  width: 40%;
  padding: 20px;
  background-color: #c0c0c0;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const IconContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Icon = styled.div`
  position: absolute;
  top: 70%;
  right: 30px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888; /* Grey color */
`;

const PasswordInput = styled(Input)`
  padding-right: 335px; /* Adjust padding to accommodate the icon */
`;
const Button = styled.button`
  width: 30%;
  border: none;
  border-radius: 8px;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #333;
  }
`;

const Error = styled.span`
  color: red;
  margin-top: 5px;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for showing password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    // Dispatch the register action
    register(dispatch, { username, email, password });
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <MainContainer>
      <Navbar />

      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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

            <Input
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleClick} disabled={isFetching}>
              CREATE
            </Button>
            {error && (
              <Error>Registration Unsuccessful! Something went wrong...</Error>
            )}
          </Form>
        </Wrapper>
      </Container>
    </MainContainer>
  );
};

export default Register;
