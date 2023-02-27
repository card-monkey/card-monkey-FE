import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import { SlArrowUp } from "react-icons/sl";
import throttle from "lodash.throttle";
import styled from "styled-components";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", throttle(handleScroll, 300));
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  return (
    <>
      <Header />
      <Main>
        <Outlet />
        {scroll ? (
          <BtnTop
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="active">
              <div className="arrow">
                <SlArrowUp size={30} className={"svg"} />
              </div>
            </div>
          </BtnTop>
        ) : (
          <BtnTop
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={"hidden"}
          >
            <div>
              <div className="arrow">
                <SlArrowUp size={30} className={"svg"} />
              </div>
            </div>
          </BtnTop>
        )}{" "}
      </Main>
      <Navbar />
    </>
  );
};

const Main = styled.main`
  position: relative;
`;

const BtnTop = styled.div`
  &.hidden {
    opacity: 0;
  }

  transition: all 0.3s ease-in-out;
  position: fixed;
  bottom: 70px;
  margin-left: 530px;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 25px;
  text-align: center;
  border: 2px solid var(--color-primary);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  color: var(--color-primary);
  cursor: pointer;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    bottom: 15px;
    opacity: 1;
    transition: opacity 500ms, visibility 500ms;
    &.arrow {
      transform: translateY(-50%) translateX(-50%);
      opacity: 1;
    }
  }
  &:hover {
    opacity: 1;
    cursor: pointer;
    background: darken(#222, 15%);
    box-shadow: 0 10px 5px rgba(0, 0, 0, 0.1);
  }
`;

export default App;
