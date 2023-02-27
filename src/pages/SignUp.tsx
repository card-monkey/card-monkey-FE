import { useState, useEffect } from "react";
import Agreement from "../components/signUp/Agreement";
import Benefit from "../components/signUp/Benefit";
import Complete from "../components/signUp/Complete";
import Id from "../components/signUp/Id";
import Name from "../components/signUp/Name";
import Password from "../components/signUp/Password";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { getCookie } from "../utils/cookie";

type Props = {};

const SignUp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const token = getCookie();
    if (token) {
      navigate("/");
    }
  }, []);

  if (step === 0) {
    navigate("/login");
  }

  return (
    <Container>
      <Inner>
        {step !== 6 ? (
          <IoIosArrowBack
            className="back"
            onClick={() => {
              setStep(step - 1);
            }}
          ></IoIosArrowBack>
        ) : (
          <div className="header"></div>
        )}
        <h3>회원가입</h3>
        <ProgressBar>
          <div style={{ width: `${step * 70.83}px` }}></div>
        </ProgressBar>
        {step === 1 && <Agreement setStep={setStep} />}
        {step === 2 && <Name setStep={setStep} />}
        {step === 3 && <Id setStep={setStep} />}
        {step === 4 && <Password setStep={setStep} />}
        {step === 5 && <Benefit setStep={setStep} />}
        {step === 6 && <Complete />}
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  position: relative;
  width: 100%;
  justify-content: center;
  h3 {
    padding-top: 52px;
    padding-bottom: 43px;
    font-size: 28px;
    font-weight: 300;
  }
`;

const Inner = styled.div`
  width: var(--width-inner);
  height: auto;
  margin: auto;
  .back {
    margin-left: -5px;
    padding-top: 20px;
    font-size: 28px;
    cursor: pointer;
    color: var(--color-gray);
    &:hover {
      color: var(--color-primary);
    }
  }
  .header {
    height: 51px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  margin-bottom: 40px;
  background-color: var(--color-lightgray);
  div {
    height: 100%;
    background-color: var(--color-primary);
  }
`;

export default SignUp;
