import React, { useEffect, useState } from "react";
import getTokenApi from "../../api/monkeyGetToken";
import { CardType, Empty } from "../../pages/MainPage";
import { MyCards } from "../ui/MyCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CardLists = () => {
  const [myCard, setMyCard] = useState<Array<CardType>>([]);
  const [section, setSection] = useState("all");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const notify = () =>
    toast.success("카드 신청이 취소되었습니다.", {
      position: "top-center",
      autoClose: 2000,
    });

  useEffect(() => {
    getMyCard(userInfo.userId);
  }, []);

  const changeSection = (event: any) => {
    setSection(event.target.className);
  };

  const getMyCard = async (userId: string) => {
    const data = await getTokenApi.cardList(userId);
    setMyCard(data);
  };

  const handleClick = async (id: number) => {
    const res = await getTokenApi.deleteCard(id);
    if (res === "카드신청 취소 완료") {
      notify();
      let newData = myCard.filter((data) => data.id !== data.id);
      setMyCard(newData);
    } else {
      return console.log("오류가 발생하였습니다.");
    }
    getMyCard(userInfo.userId);
  };

  return (
    <div className="myaccount">
      <div className="user-name">{userInfo.name}님의 카드</div>
      <div className="cards">
        <span
          className="all"
          id={section === "all" ? "primary" : "basic"}
          onClick={changeSection}
        >
          전체카드
        </span>
        <span
          className="credit"
          id={section === "credit" ? "primary" : "basic"}
          onClick={changeSection}
        >
          신용카드
        </span>
        <span
          className="check"
          id={section === "check" ? "primary" : "basic"}
          onClick={changeSection}
        >
          체크카드
        </span>
      </div>
      <div className="list">
        {myCard.length > 0 ? (
          myCard
            .filter((card) =>
              section === "all"
                ? true
                : section === "credit"
                ? card.type.includes("CREDIT")
                : false || section === "check"
                ? card.type.includes("CHECK")
                : false,
            )
            .map((data) => (
              <div key={data.id}>
                <MyCards card={data} />
                <ToastContainer limit={1} />
                <div className="cancle" onClick={() => handleClick(data.id)}>
                  카드 신청 취소
                </div>
              </div>
            ))
        ) : (
          <Empty>나의 카드 정보가 없습니다.</Empty>
        )}
      </div>
    </div>
  );
};
