import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import getTokenApi from "../../api/monkeyGetToken";
import { addFavor, deleteFavor } from "../../store/favorSlice";
import { toast, ToastContainer } from "react-toastify";

type CardItemPropsType = {
  card: Card;
};

const loadImage = (setImageDimensions: any, imageUrl: string) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImageDimensions({
      height: img.height,
      width: img.width,
    });
  };
  img.onerror = (err) => {
    err;
  };
};

const CardItem = ({ card }: CardItemPropsType) => {
  const [imageDimensions, setImageDimensions] = useState<width>({
    width: 0,
    height: 0,
  });
  const imageUrl = card.image;
  const navigate = useNavigate();
  const favorList = useSelector((state: RootState) => state.favor.favorList);
  const dispatch = useDispatch<AppDispatch>();

  const addNotify = () => {
    toast.success("관심상품에 추가되었습니다!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  const deleteNotify = () => {
    toast.success("관심상품에서 삭제되었습니다!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    loadImage(setImageDimensions, imageUrl);
  }, []);

  const sizeCalc = () => {
    return imageDimensions.width > imageDimensions.height ? 110 : 75;
  };

  const toggleFavor = async (e: any) => {
    e.stopPropagation();
    const data = await getTokenApi.toggleFavor(card.id);
    if (data === "찜하기 완료") {
      addNotify();
      dispatch(addFavor(card));
    } else if (data === "찜하기 취소 완료") {
      deleteNotify();
      dispatch(deleteFavor(card.id));
    } else {
      alert("찜하기 실패");
    }
  };

  return (
    <CardContainer
      onClick={() => {
        location.pathname.slice(0, 7) === "/detail"
          ? navigate(`/detail/${card.id}`, { replace: true })
          : navigate(`/detail/${card.id}`);
        window.scrollTo(0, 0);
      }}
    >
      <CardImageWrapper size={sizeCalc()}>
        <div className="circle"></div>
        <img src={card.image} />
      </CardImageWrapper>
      <CardInfo>
        <div className="wrapper">
          <div className="name">{card.name}</div>
          <div className="company">{card.company}</div>
          <div
            className={card.type === "CREDIT" ? "type credit" : "type check"}
          >
            {card.type === "CREDIT" ? "신용카드" : "체크카드"}
          </div>
        </div>
      </CardInfo>
      <div
        className={
          favorList.find((item) => item.id === card.id)
            ? "favor active"
            : "favor"
        }
        onClick={toggleFavor}
      >
        <AiFillHeart />
      </div>
      <ToastContainer limit={1} />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  &:hover img {
    transform: translateY(-8px);
  }
  box-sizing: border-box;
  display: flex;
  border: 2px solid var(--color-gray);
  border-radius: 12px;
  padding: 30px;
  position: relative;
  cursor: pointer;
  .favor {
    position: absolute;
    bottom: 10px;
    right: 25px;
    svg {
      display: inline-block;
      width: 30px;
      height: 30px;
      color: var(--color-gray);
      transition: 0.6s;
    }
    &.active svg {
      color: var(--color-primary);
    }
    &:hover {
      svg {
        transform: scale(1.3);
      }
    }
  }
`;

const CardImageWrapper = styled.div<Size>`
  margin-right: 20px;
  width: 110px;
  position: relative;
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transition: 0.2s;
    filter: drop-shadow(6px 4px 4px #c3c3c3);
    width: ${(props) => props.size}px;
  }
  .circle {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: var(--color-lightgray);
  }
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  .name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .company {
    font-size: 14px;
    font-weight: 530;
    margin-bottom: 10px;
  }
  .type {
    display: inline-block;
    border-radius: 40px;
    font-size: 10px;
    font-weight: bold;
    padding: 7px;
    text-align: center;
    &.credit {
      color: #ff6b00;
      background-color: #ffeacc;
    }
    &.check {
      color: #1bbbee;
      background-color: #dbf6ff;
    }
  }
`;

export default CardItem;
