import { useState, useEffect } from "react";
import styled from "styled-components";
import getTokenApi from "../../api/monkeyGetToken";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

type Props = {
  changeSetSection: () => void;
};

export const EditAccount = ({ changeSetSection }: Props) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [benefitInfo, setBenefitInfo] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const navigate = useNavigate();
  const regex = /^(?=.*?[A-Za-z])(?=.*?\d)[A-Za-z\d]{8,14}$/;
  const [pwdToggle, setPwdToggle] = useState(false);
  const [benefitToggle, setBenefitToggle] = useState(false);
  const [benefit, setBenefit] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const benefits = [
    ["커피", "coffee"],
    ["교통", "transportation"],
    ["영화", "movie"],
    ["배달", "delivery"],
    ["통신", "phone"],
    ["주유", "gas"],
    ["간편결제", "simplePayment"],
    ["공과금", "tax"],
    ["쇼핑", "shopping"],
  ];

  const notify = (message: string) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
    });

  const success = (message: string) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
    });

  const handleSubmit = async (
    userId: string,
    currentPassword: string,
    newPassword: string,
    e: any,
  ) => {
    e.preventDefault();
    const data = await getTokenApi.changePassword(
      userId,
      currentPassword,
      newPassword,
    );
    if (data !== "비밀번호가 변경 되었습니다.") {
      notify("현재 비밀번호가 일치하지 않습니다.");
    } else {
      alert("비밀번호 변경이 완료되었습니다.");
      changeSetSection();
    }
  };

  // const handleChange = (event: any) => {
  //   if (regex.test(password)) {
  //     setNewPassword(event.target.value);
  //   } else {
  //     return notify("정확한 비밀번호 형식을 입력해주세요.");
  //   }
  // };

  const handlePwdToggle = () => {
    setPwdToggle(!pwdToggle);
  };
  const handleBenefitToggle = () => {
    setBenefitToggle(!benefitToggle);
  };

  useEffect(() => {
    const { userId } = JSON.parse(localStorage.getItem("userInfo") || "{}");
    setUserId(userId);
    const getSuggestCard = async () => {
      const data = await getTokenApi.benefitCard();
      setBenefitInfo(data);
    };
    getSuggestCard();
  }, []);

  const handleWithdrawal = async () => {
    confirmAlert({
      title: "",
      message: `${userInfo.name}님 ${userId} 계정 탈퇴를 하시겠습니까?`,
      buttons: [
        {
          label: "네",
          onClick: async () => {
            const res = await getTokenApi.withdrawal();
            if (res?.status === 200 || res?.data === "회원탈퇴 완료") {
              localStorage.removeItem("userInfo");
              navigate("/login", { replace: true });
            } else {
              alert("회원탈퇴 실패");
            }
          },
        },
        {
          label: "아니오",
        },
      ],
    });
  };

  const handleBenefit = (item: string) => {
    if (benefit.length === 3) {
      if (benefit.includes(item)) {
        setBenefit(benefit.filter((icon) => icon != item));
      }
      return;
    }
    if (!benefit.includes(item)) {
      setBenefit((prev) => [...prev, item]);
    } else {
      setBenefit(benefit.filter((icon) => icon != item));
    }
  };

  useEffect(() => {
    if (benefit.length === 3) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [benefit]);

  const submitBenefit = async (benefit: string[]) => {
    const res = await getTokenApi.changeBenefit(benefit);
    alert("관심혜택 변경이 완료되었습니다.");
    changeSetSection();
  };

  return (
    <div className="myaccount">
      <div className="editTitle">
        <div className="user-name">{userInfo.name}님의 정보 수정</div>
        <div className="delete" onClick={handleWithdrawal}>
          회원탈퇴하기
        </div>
      </div>
      <div className="toggle-title">
        <h4>비밀번호 변경</h4>
        {pwdToggle ? (
          <FaToggleOn className="icon" onClick={handlePwdToggle} />
        ) : (
          <FaToggleOff className="icon" onClick={handlePwdToggle} />
        )}
      </div>
      <Form
        className={pwdToggle ? "inputWrap" : "close"}
        onSubmit={(e) =>
          handleSubmit(userInfo.userId, currentPassword, newPassword, e)
        }
      >
        <div className="group">
          <div className="inputTitle">현재 비밀번호</div>
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="group">
          <div className="inputTitle">비밀번호</div>
          <input
            type="password"
            placeholder="새 비밀번호 (8~12자 영문 숫자 조합)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="group">
          <div className="inputTitle">비밀번호 확인</div>
          <input
            type="password"
            disabled={!regex.test(password)}
            placeholder="새 비밀번호 확인"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {!regex.test(password) && password.length !== 0 ? (
          <div className="wrong">정확한 비밀번호 형식을 입력해주세요.</div>
        ) : password !== newPassword ? (
          <div className="wrong">비밀번호가 일치하지 않습니다.</div>
        ) : null}
        <ToastContainer limit={1} />
        <button
          type="submit"
          disabled={
            password !== newPassword ||
            newPassword === "" ||
            currentPassword === ""
              ? true
              : false
          }
        >
          비밀번호 변경하기
        </button>
      </Form>
      <div className="toggle-title">
        <h4>관심혜택 수정</h4>
        {benefitToggle ? (
          <FaToggleOn className="icon" onClick={handleBenefitToggle} />
        ) : (
          <FaToggleOff className="icon" onClick={handleBenefitToggle} />
        )}
      </div>
      <Wrap className={benefitToggle ? "display" : "none"}>
        <BenefitWrap>
          {benefits.map((item, idx) => {
            return (
              <Icon
                key={idx}
                className={benefit.includes(item[1]) ? "select" : "basic"}
                onClick={() => {
                  handleBenefit(item[1]);
                }}
              >
                <img src={`/benefit_${item[1]}.png`} alt="" />
                <p>{item[0]}</p>
              </Icon>
            );
          })}
        </BenefitWrap>
        <button disabled={!complete} onClick={() => submitBenefit(benefit)}>
          관심혜택 변경하기
        </button>
      </Wrap>
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  button {
    background-color: white;
    border: none;
    font-weight: 700;
    align-self: flex-end;
    cursor: pointer;
  }
  .wrong {
    margin-bottom: 10px;
    font-size: 12px;
    color: red;
    align-self: flex-end;
  }
  &.inputWrap {
    transition: 0.3s;
  }
  &.close {
    display: none;
    transition: 0.3s;
  }
`;

const Wrap = styled.div`
  &.display {
    padding-bottom: 50px;
  }
  &.none {
    display: none;
  }
  button {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 30px;
    font-weight: 600;
    background-color: var(--color-primary);
    color: var(--color-white);
    &:hover {
      color: var(--color-brown);
    }
    &:disabled {
      background-color: var(--color-lightgray);
      color: var(--color-white);
    }
  }
`;

const BenefitWrap = styled.div`
  display: grid;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  gap: 20px;
  grid-template-columns: repeat(3, 130px);
  grid-template-rows: repeat(3, 100px);
  place-items: center;
`;

const Icon = styled.div`
  width: 110px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 15px 0;
  cursor: pointer;
  img {
    width: 38px;
    padding-bottom: 10px;
  }
  p {
    width: 100%;
    text-align: center;
    color: var(--color-gray);
  }
  &.basic:hover {
    border: 1px solid var(--color-primary);
    border-radius: 20px;
  }
  &.select {
    border: 1px solid var(--color-primary);
    border-radius: 20px;
    &:hover {
      border: 2px solid var(--color-primary);
    }
  }
`;
