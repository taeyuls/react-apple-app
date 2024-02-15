import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../../firebase";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {}
  );
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        navigate("/main");
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        localStorage.removeItem("userData");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <NavWrapper $show={show}>
      <Logo>
        <img
          alt="logo"
          src="/images/apple-logo.png"
          onClick={() => navigate("/")}
        />
      </Logo>

      {pathname === "/" ? (
        <Login onClick={handleAuth}>로그인</Login>
      ) : (
        <input
          type="text"
          className="nav__input"
          value={searchValue}
          onChange={handleChange}
          placeholder="영화를 검색해주세요."
        />
      )}

      {pathname !== "/" && userData.photoURL && (
        <SignOut onClick={handleOut}>
          <UserImg src={userData.photoURL} alt={userData.displayName} />
          <DropDown>로그아웃</DropDown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: 1px solid lightgray;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;
const Logo = styled.a`
  padding: 0;
  width: 70px;
  font-size: 0;
  display: inline-block;
  margin-bottom: 10px;

  img {
    display: block;
    width: 100%;
  }
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) =>
    props.$show === "true" ? "#090b13" : "#000000"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const UserImg = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Nav;
