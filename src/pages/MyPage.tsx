import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CardLists } from "../components/mypage/CardLists";
import { EditAccount } from "../components/mypage/EditAccount";

const MyPage = () => {
  const [section, setSection] = useState("card-lists");

  const changeSection = (event: any) => {
    setSection(event.target.className);
  };

  const changeSetSection = () => {
    setSection("card-lists");
  };

  return (
    <Container>
      <div className="fixed">
        <div className="title">
          <div className="text">마이페이지</div>
        </div>
        <div className="category">
          <div
            className="card-lists"
            id={section === "card-lists" ? "primary" : "basic"}
            onClick={changeSection}
          >
            나의 카드
          </div>
          <div className="y-line"></div>
          <div
            className="edit-account"
            id={section === "edit-account" ? "primary" : "basic"}
            onClick={changeSection}
          >
            회원정보 수정
          </div>
        </div>
        <div className="line"></div>
      </div>
      {section === "card-lists" ? (
        <CardLists />
      ) : (
        <EditAccount changeSetSection={changeSetSection} />
      )}
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;
  width: 100%;
  #primary {
    color: var(--color-primary);
  }
  #basic {
    color: var(--color-gray);
    &:hover {
      color: var(--color-primary);
    }
  }
  .fixed {
    width: 500px;
    top: 65px;
    height: auto;
    background-color: var(--color-white);
    position: fixed;
    z-index: 3;
    .title {
      width: var(--width-inner);
      margin: auto;
      padding: 50px 0;
      font-size: 28px;
      font-weight: 300;
      .text {
        margin-top: 5px;
      }
      img {
        padding: 0 5px;
        width: 100px;
      }
    }
    .category {
      display: flex;
      justify-content: center;
      font-size: 15px;
      font-weight: 600;
      align-items: center;
      justify-content: space-evenly;
      cursor: pointer;
      .card-lists,
      .edit-account {
        width: 50%;
        height: 100%;
        text-align: center;
        cursor: pointer;
      }
      .y-line {
        border-right: 1px solid var(--color-lightgray);
        height: 40px;
      }
    }
  }
  .line {
    height: 7px;
    background-color: var(--color-lightgray);
  }
  .myaccount {
    display: flex;
    flex-direction: column;
    width: var(--width-inner);
    margin: 0 auto;
    padding-top: 200px;
    .editTitle {
      display: flex;
      justify-content: space-between;
    }
    .toggle-title {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      h4 {
        font-weight: 600;
      }
      .icon {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .delete {
      font-size: 14px;
      color: var(--color-gray);
      font-weight: 600;
      cursor: pointer;
      align-self: center;
      &:hover {
        color: var(--color-primary);
      }
    }
  }
  .user-name {
    font-size: 18px;
    font-weight: 600;
    margin: 20px 0;
  }
  .cards {
    color: var(--color-gray);
    margin-bottom: 20px;
    span {
      margin-right: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      &:hover {
        color: var(--color-primary) !important;
      }
    }
  }
  .cancle {
    display: inline-block;
    font-size: 14px;
    color: var(--color-gray);
    position: relative;
    top: -25px;
    left: 330px;
    cursor: pointer;
    :hover {
      color: var(--color-primary);
    }
  }
  .inputWrap {
    padding-top: 50px;
    padding-bottom: 20px;
    width: 100%;
    font-size: 14px;
    .group {
      display: flex;
      width: 100%;
      margin-bottom: 20px;
      align-items: center;
      border-bottom: 1px solid var(--color-gray);
      .inputTitle {
        width: 30%;
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
`;
