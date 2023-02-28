import { useEffect, useState } from "react";
import styled from "styled-components";
import setTokenApi from "../api/monkeySetToken";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { resetForm } from "../store/signUpSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchFavor } from "../store/favorSlice";
import { getCookie } from "../utils/cookie";

type Props = {};

const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fail, setFail] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { pathname } = useLocation();


  const login = async () => {
    const res = await setTokenApi.signIn({ userId, password });
    if (res?.loginStatus === "로그인 완료") {
      dispatch(fetchFavor());
      navigate(`/`, { replace: true });
    } else {
      setFail(true);
      setTimeout(() => {
        setFail(false);
      }, 1000);
    }
  };

  const onCheckEnter = (e: any) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <Container>
      <Inner>
        <div className="titleWrap">
          <h3>로그인</h3>
          <div className="logo">
            <img src="./monkeycard_white.png" alt="" />
          </div>
          <h2>
            안녕하세요.
            <br />
            카드몽키입니다.
          </h2>
          <p>회원 서비스 이용을 위해 로그인 해주세요.</p>
        </div>
        <form
          className="inputWrap"
          onKeyUp={(e) => {
            onCheckEnter(e);
          }}
        >
          <div className="group">
            <div className="inputTitle">아이디</div>
            <input
              type="text"
              id="id"
              placeholder="아이디를 입력하세요."
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </div>
          <div className="group">
            <div className="inputTitle">비밀번호</div>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Message className={fail ? "failError" : "basic"}>
            <p>아이디 또는 비밀번호가 일치하지 않습니다.</p>
          </Message>
        </form>
        <div className="buttonWrap">
          <button className="logIn" type="submit" onClick={login}>
            로그인
          </button>
          <Link to={"/signup"}>
            <button
              className="signUp"
              type="submit"
              onClick={() => dispatch(resetForm())}
            >
              계정이 없으신가요? 회원가입하기
            </button>
          </Link>
        </div>
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    width: 100%;
    height: 30%;
    position: absolute;
    background-image: url("./monkeycard_face.png");
    background-repeat: no-repeat;
    background-size: 55%;
    background-position: top right -10px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
  }
`;

const Inner = styled.div`
  z-index: 4;
  margin: auto;
  width: var(--width-inner);
  min-height: 100vh;
  h3 {
    padding-top: 72px;
    padding-bottom: 43px;
    font-size: 28px;
    font-weight: 300;
  }
  .logo {
    color: var(--color-black);
    width: 120px;
    height: 87px;
    border-radius: 20px;
    img {
      width: 100%;
      margin-left: -15px;
      cursor: pointer;
    }
  }
  h2 {
    color: var(--color-black);
    padding: 22px 0;
    font-size: 28px;
    line-height: 1.3;
    font-weight: 700;
  }
  p {
    font-size: 16px;
    color: var(--color-black);
  }
  .inputWrap {
    padding-top: 72px;
    padding-bottom: 93px;
    width: 100%;
    font-size: 14px;
    position: relative;
    .group {
      display: flex;
      width: 100%;
      margin-bottom: 40px;
      align-items: center;
      border-bottom: 1px solid var(--color-gray);
      .inputTitle {
        width: 20%;
        font-weight: 600;
        padding-right: 20px;
      }
      input {
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
        background-color: transparent;
      }
    }
  }
  .buttonWrap {
    padding-bottom: 100px;
    button {
      width: 100%;
      height: 55px;
      border: none;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
    }
    .logIn {
      background-color: var(--color-primary);
      color: var(--color-white);
      &:hover {
        transition: 0.3s;
        color: var(--color-brown);
      }
    }
    .signUp {
      background-color: var(--color-white);
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      margin-top: 15px;
      &:hover {
        transition: 0.3s;
        color: var(--color-brown);
      }
    }
  }
`;

const Message = styled.div`
  width: 100%;
  position: absolute;
  p {
    text-align: center;
    color: red;
    font-size: 14px;
  }
  &.failError {
    display: block;
    transition: ease-in 0.1s;
  }
  &.basic {
    opacity: 0;
    transition: ease-in-out 0.2s;
  }
`;

export default Login;
