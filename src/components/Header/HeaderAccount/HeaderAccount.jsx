import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { fetchAuth, setLogout } from "../../../redux/authSlice";
import user from "../../../asset/image/user.svg";
import online from "../../../asset/image/online.svg";

const User = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
`;
const LogoUser = styled.img`
  width: 25px;
  margin: 0 10px;
`;
const DropDownAccount = styled.div`
  position: relative;
`;

const DropDownContainer = styled.div`
  margin: 0 auto;
`;

const DropDownHeader = styled.div``;

const DropDownList = styled.form`
  cursor: pointer;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
`;

const ListItem = styled.li`
  list-style: none;
  font-size: 12px;
  width: 50px;
  cursor: pointer;
  text-align: center;
  color: gray;
  margin-bottom: 0.8em;
  &:hover {
    color: white;
  }
`;

const Text = styled.p`
  font-size: 14px;
  color: gray;
`;
const SuccesLogin = styled.div`
  display: flex;
  gap: 10px;
`;
const AvatarUser = styled.img`
  position: relative;
  width: 30px;
  border-radius: 50%;
  height: 40px;
`;
const OnlineImage = styled.img`
  position: absolute;
  width: 20px;
  top: 40%;
  left: 30%;
`;
const DropDownListContainer = styled.ul`
  padding: 0;
  position: absolute;
  top: 50px;
  left: -35px;
  background-color: #2a2a2a;
  z-index: 12;
  padding: 0 30px;
  border-radius: 4px;
`;
function HeaderAccount() {
  const { account, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => {
    setIsOpen(!isOpen);
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("auth"));
    if (items) {
      setItems(items);
    }
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("auth");
    dispatch(setLogout());
  };

  return (
    <User>
      {!isLogin && (
        <Link to="/signin" className="d-flex">
          <LogoUser src={user} alt="" />
          <p>Sign In</p>
        </Link>
      )}
      {isLogin && (
        <DropDownAccount>
          <DropDownContainer>
            <DropDownHeader onClick={toggling}>
              <SuccesLogin>
                <div>
                  <AvatarUser
                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/277739598_1805644129628896_1458345998357600728_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5o3SFs5gI_oAX8qOelR&tn=eJtxndjvgf3N5-5A&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAg8TozRTlcu2gT1Hg1Maejy3rIjrvKmOuHNJnydhRMoA&oe=6377D2C0"
                    alt=""
                  />
                  <OnlineImage src={online} alt="" />
                </div>
                <Text>{account.LastName}</Text>
              </SuccesLogin>
            </DropDownHeader>
            {isOpen && (
              <DropDownListContainer>
                <DropDownList>
                  <ListItem>
                    <Link to={"/profile"}>Account</Link>
                  </ListItem>
                  <ListItem>
                    <Link to={"/wishlist"}>Wishlist</Link>
                  </ListItem>
                  <ListItem>
                    <Link to={"/history"}>History</Link>
                  </ListItem>
                  <ListItem onClick={handleLogOut}>Sign Out</ListItem>
                </DropDownList>
              </DropDownListContainer>
            )}
          </DropDownContainer>
        </DropDownAccount>
      )}
    </User>
  );
}

export default HeaderAccount;
