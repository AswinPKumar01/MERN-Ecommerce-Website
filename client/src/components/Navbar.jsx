import { ShoppingCartOutlined } from "@mui/icons-material";
import { PersonOutlineOutlined, Search } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/apiCalls";

const Container = styled.div`
  padding: 25px;
  background-color: black;
  color: white;
  height: 55px;
  ${mobile({ padding: "10px" })}
`;

const Wrapper = styled.div`
  padding: 3px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0", flexDirection: "column" })}
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
`;

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
`;

const commonLinkStyles = css`
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const SiteName = styled(Link)`
  ${commonLinkStyles}
  font-size: 30px;
  text-decoration: none;
  font-weight: bold;
  ${mobile({ fontSize: "24px", marginBottom: "10px" })}
  &:hover {
    transform: none;
`;

const LinkOption = styled(Link)`
  ${commonLinkStyles}
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 15px;
  margin-right: 10px; /* Added margin-right to reduce space */
  ${mobile({ padding: "10px", fontSize: "16px" })}
`;

const SearchCont = styled.div`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  margin: 15px 25px 15px 10px;
  padding: 5px;
  ${mobile({ margin: "10px 0" })}
`;

const Input = styled.input`
  width: 70px;
  border: none;
  padding: 5px;
  margin-right: 10px;
  ${mobile({ width: "30px" })}
`;

const IconBadgeLink = styled(Link)`
  ${commonLinkStyles}
  margin-left:20px;
  font-size: 14px;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  ${mobile({ fontSize: "12px" })}
`;

const AuthOptions = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const AuthLink = styled(Link)`
  ${commonLinkStyles}
  font-size: 14px;
  margin-left: 10px;
  ${mobile({ fontSize: "16px", margin: "0 10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("Logging out...");
    logoutUser(dispatch); // Assuming you have a logout function in your Redux actions
  };

  const handleUserIconClick = () => {
    navigate("/profile"); // Replace 'id' with the actual user ID
  };

  return (
    <Container>
      <Wrapper>
        <LeftDiv>
          <SiteName to="/">QuinTech Ecom</SiteName>
        </LeftDiv>

        <CenterDiv>
          <LinkOption to="/">HOME</LinkOption>
          <LinkOption to="/buy">BUY</LinkOption>
          <LinkOption to="/crud">PRODUCT</LinkOption>
          <LinkOption to="/about">ABOUT US</LinkOption>
        </CenterDiv>

        <RightDiv>
          <AuthOptions>
            <AuthLink to="/register">REGISTER</AuthLink>
            <AuthLink to="/login">SIGN IN</AuthLink>
            <AuthLink to="#" onClick={handleLogout}>
              LOGOUT
            </AuthLink>
          </AuthOptions>

          <IconBadgeLink onClick={handleUserIconClick}>
            <Badge>
              <PersonOutlineOutlined />
            </Badge>
          </IconBadgeLink>

          <IconBadgeLink to="/cart">
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconBadgeLink>
        </RightDiv>
      </Wrapper>
    </Container>
  );
};
export default Navbar;
