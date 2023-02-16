import React, { useState } from "react";
import { SearchCard } from "../../pages/Search";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import getTokenApi from "../../api/monkeyGetToken";
import { addFavor, deleteFavor } from "../../store/favorSlice";

type CardItemPropsType = {
  card: SearchCard;
};

const CardItem = ({ card }: CardItemPropsType) => {
  const navigate = useNavigate();
  const favorList = useSelector((state: RootState) => state.favor.favorList);
  const dispatch = useDispatch<AppDispatch>();

  const cardImage = new Image();
  cardImage.src = card.image;

  const toggleFavor = async (e: any) => {
    e.stopPropagation();
    const data = await getTokenApi.toggleFavor(card.id); // 이거 관심상품 추가, 삭제 api가 똑같아서 하나로 합침(추가, 삭제 api 함수 아직 있긴 함)
    if (data === "찜하기 완료") {
      /* 서버에서 관심상품 추가되면 우리도 추가 
         원래는 다시 전체 관심상품 조회해서 가져오는게 더 정확한데 일단은 이렇게 (어제 소재헌이 멘토님한테 질문한거 참고) */
      dispatch(addFavor(card));
    } else if (data === "찜하기 취소 완료") {
      /* 서버에서 관심상품 삭제되면 우리도 삭제 
         원래는 다시 전체 관심상품 조회해서 가져오는게 더 정확한데 일단은 이렇게 (어제 소재헌이 멘토님한테 질문한거 참고) */
      dispatch(deleteFavor(card.id));
    } else {
      // 일단 지금은 무조건 요기 조건으로 들어옴, 밑에 둘 중 하나만 실행
      // dispatch(addFavor(card));
      dispatch(deleteFavor(card.id));
    }
  };

  return (
    <CardContainer
      onClick={() => {
        navigate(`/detail/${card.id}`);
      }}
    >
      <CardImageWrapper cardImage={cardImage}>
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

const CardImageWrapper = styled.div<{ cardImage: HTMLImageElement }>`
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
    width: ${(props) =>
      props.cardImage.width >= props.cardImage.height ? "110px" : "75px"};
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