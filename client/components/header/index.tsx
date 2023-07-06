import styled from "@emotion/styled";
import {useRouter} from "next/router";
import {FC, useEffect, useRef, useState} from "react";
import {blueColor, mainColor, redColor} from "../../styles/color";
import {useGetUser} from "../../service/query-hooks/user";

const menuData = [
  {id: "menu0", name: "메일 작성", path: "/?id=15"},
  {id: "menu2", name: "메일 작성 가이드", path: "/guide"},
];

type Props = {
  changeColor?: boolean;
};

const Header: FC<Props> = ({changeColor}) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isToken, setToken] = useState<any>();
  const userIdRef = useRef<string>("");
  const usernameRef = useRef<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId") ?? "";
    const username = localStorage.getItem("username") ?? "";

    userIdRef.current = userId;
    usernameRef.current = username;
  }, []);

  const {data: userData} = useGetUser(userIdRef.current);

  const openMenuHandle = () => {
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };

  const logoutHandle = () => {
    openMenuHandle();

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  const handleClick = (path: string) => {
    router.push(`/${path}`);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("access-token");
    setToken(token);
  }, []);

  return (
    <HeaderContainer changeColor={changeColor}>
      <img src="/assets/icon/smail_logo.png" alt="logo" />
      <MenuContainer>
        {menuData.map((menu) => (
          <li key={menu.id}>
            <a
              onClick={() => handleClick(menu.path)}
              style={{
                color: menu.path === router.pathname ? `${mainColor}` : "",
              }}
            >
              {menu.name}
            </a>
          </li>
        ))}
        {isToken ? (
          <ProfileContainer>
            <div className="profile_box" onClick={openMenuHandle}>
              <div className="profile_circle" />
              <span>{usernameRef.current}</span>
              <img src="/assets/icon/ArrowIcon.svg" alt="더보기 아이콘" />
            </div>
            <MoreMenu onClick={logoutHandle} openMenu={openMenu}>
              로그아웃
            </MoreMenu>
          </ProfileContainer>
        ) : (
          <li>
            <a onClick={() => handleClick("login")}>로그인</a>
          </li>
        )}
      </MenuContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header<{changeColor?: boolean}>`
  > img {
    height: 40px;
  }

  padding: 0 7.5%;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100%;
  height: 55px;
  background: ${({changeColor}) => (changeColor ? "#ffffffb8" : "#ffffff")};
  box-shadow: 0px 7px 14px rgba(214, 214, 214, 0.25);
  display: flex;
  flex-direction: row;
  transition: all 0.5s;
`;

const MenuContainer = styled.ul`
  display: flex;
  gap: 45px;
  height: 30px;

  & li {
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: ${blueColor};
    font-size: 14px;
    background: white;
    border-radius: 5px;

    > a {
      font-weight: 500;
      transition: all 0.5s;
      cursor: pointer;
    }
  }
`;

const ProfileContainer = styled.div`
  cursor: pointer;
  flex-direction: column;
  display: flex;
  color: ${blueColor};
  font-size: 14px;
  height: 85px;

  .profile_box {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .profile_circle {
    width: 25px;
    height: 25px;
    border-radius: 30px;
    background: #8d92f2;
  }
`;

const MoreMenu = styled.div<{openMenu: boolean}>`
  display: flex;
  opacity: ${({openMenu}) => (openMenu ? 1 : 0)};
  transition: all 0.2s;
  position: relative;
  top: 16px;
  width: 100%;
  height: 45px;
  background: #ffffff;
  box-shadow: 0px 5px 25px rgba(103, 103, 103, 0.25);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  color: ${redColor};
  font-size: 14px;
`;
