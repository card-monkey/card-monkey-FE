import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  AiOutlineSearch,
  AiOutlineLeft,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { redirect, useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import getTokenApi from "../../api/monkeyGetToken";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchName } from "../../store/searchSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { IoIosArrowBack } from "react-icons/io";
import { removeCookie } from "../../utils/cookie";

type HeaderPropsType = {};

const Header = ({}: HeaderPropsType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchName = useSelector((state: RootState) => state.search.searchName);
  const dispatch = useDispatch<AppDispatch>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("q", e.target.value);
    setSearchParams(searchParams, { replace: true });
    dispatch(handleSearchName(e.target.value));
  };

  const handleLogout = () => {
    confirmAlert({
      title: "",
      message: "정말로 로그아웃 하시겠습니까?",
      buttons: [
        {
          label: "네",
          onClick: async () => {
            const res = await getTokenApi.signOut();
            if (res?.status === 200 || res.data === "로그아웃 완료") {
              removeCookie();
              navigate("/login", { replace: true });
            } else {
              alert("로그아웃 실패");
            }
          },
        },
        {
          label: "아니오",
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(handleSearchName(searchParams.get("q") || ""));
  }, [searchParams.get("q")]);

  // 로그인 페이지에서 header null 처리
  if (pathname === "/login") return null;
  /**상세 페이지에서도 header null 처리 */
  if (pathname.slice(0, 7) === "/detail") return null;
  return (
    <MonkeyHeader>
      {pathname !== "/search" ? (
        <NavContainer>
          <LogoWrapper onClick={() => navigate("/")}>
            <img src="/logo.png" alt="로고" />
          </LogoWrapper>
          <Icons>
            <SearchIconWrap>
              <AiOutlineSearch onClick={() => navigate("/search")} />
            </SearchIconWrap>
            <LogoutIconWrap onClick={handleLogout}>
              <TbLogout />
            </LogoutIconWrap>
          </Icons>
        </NavContainer>
      ) : (
        <SearchContainer>
          <SearchBar>
            <IoIosArrowBack
              className="icon"
              onClick={() => {
                navigate(-1);
              }}
            >
              <AiOutlineLeft />
            </IoIosArrowBack>
            <SearchInput>
              <input
                type="text"
                value={searchName}
                ref={inputRef}
                onChange={handleInput}
                placeholder="카드명으로 검색"
                autoFocus
              />
              {searchName.length === 0 ? (
                <AiOutlineSearch />
              ) : (
                <AiOutlineCloseCircle
                  onClick={() => {
                    dispatch(handleSearchName(""));
                    searchParams.set("q", "");
                    setSearchParams(searchParams, { replace: true });
                    inputRef.current?.focus();
                  }}
                />
              )}
            </SearchInput>
          </SearchBar>
        </SearchContainer>
      )}
    </MonkeyHeader>
  );
};

const MonkeyHeader = styled.header`
  position: fixed;
  width: 500px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    /* width: 60px; */
    height: 45px;
    cursor: pointer;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const SearchIconWrap = styled.div`
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: var(--color-black);
  }
`;
const LogoutIconWrap = styled.div`
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: var(--color-black);
  }
`;

const SearchContainer = styled.div`
  .icon {
    font-size: 26px;
    padding-left: 10px;
    color: var(--color-gray);
    cursor: pointer;
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 9px;
`;

// const SearchClose = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   svg {
//     width: 25px;
//     height: 25px;
//     cursor: pointer;
//     color: var(--color-black);
//     padding-left: 10px;
//   }
// `;

const SearchInput = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 5px;
  align-items: center;
  margin: 0 14px 0 10px;
  background-color: #f9f9f9;
  border-radius: 22px;
  height: 30px;
  padding: 7px 11px 7px 16px;
  font-size: 0;

  input {
    height: 28px;
    border: none;
    outline: none;
    background-color: transparent;
    background: transparent;
    width: calc(100% - 28px);
    vertical-align: top;
    font-size: 14px;
  }

  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: var(--color-gray);
    padding-right: 10px;
  }
`;

export default Header;
