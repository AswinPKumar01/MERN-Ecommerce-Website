import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import axios from "axios";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

const MainContainer = styled.div``;

const Container = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const UserData = styled.div`
  margin-top: 20px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Value = styled.span`
  font-weight: 400;
`;

const Profile = () => {
  const location = useLocation();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const id = pathArray[pathArray.length - 1];

    const getUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/find/${id}`
        );
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    getUserData();
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user._id) {
    return <div>User not found</div>;
  }

  return (
    <MainContainer>
      <Navbar />
      <Banner />
      <Container>
        <Wrapper>
          <InfoContainer>
            <UserData>
              <Label>Name:</Label>
              <Value>{user.username}</Value>
            </UserData>
            <UserData>
              <Label>Email:</Label>
              <Value>{user.email}</Value>
            </UserData>
          </InfoContainer>
        </Wrapper>
      </Container>
    </MainContainer>
  );
};

export default Profile;
