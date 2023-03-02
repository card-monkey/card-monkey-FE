import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getTokenApi from "../../api/monkeyGetToken";
import { Benefits } from "../../pages/Suggest";
import CardSkeleton, { SkeletonItem } from "./CardSkeleton";
import CardItem from "../searchProduct/CardItem";

type Props = {};

const SuggestCard = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [suggestCards, setSuggestCards] = useState<Array<Card>>([]);

  const benefits: Benefits = {
    coffee: "커피",
    transportation: "교통",
    movie: "영화",
    delivery: "배달",
    phone: "통신",
    gas: "주유",
    simplePayment: "간편결제",
    tax: "공과금",
    shopping: "쇼핑",
  };

  const suggestCardList = suggestCards.map((card) => {
    return (
      <CardItemWrapper key={card.id}>
        <BtnBenefit className="benefit-title">
          #{benefits[card.benefit!]}
        </BtnBenefit>
        <CardItem card={card} />
      </CardItemWrapper>
    );
  });
  const skeletonCardList = (
    <>
      <CardItemWrapper>
        <SkeletonBenefit></SkeletonBenefit>
        <CardSkeleton />
      </CardItemWrapper>
      <CardItemWrapper>
        <SkeletonBenefit></SkeletonBenefit>
        <CardSkeleton />
      </CardItemWrapper>
      <CardItemWrapper>
        <SkeletonBenefit></SkeletonBenefit>
        <CardSkeleton />
      </CardItemWrapper>
    </>
  );
  const getSuggestCard = async () => {
    setIsLoading(true);
    const data = await getTokenApi.benefitCard();
    setSuggestCards(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getSuggestCard();
  }, []);

  return (
    <Wrapper>
      <CardListContainer>
        {isLoading ? skeletonCardList : suggestCardList}
      </CardListContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  background-color: var(--color-white);
  padding: 30px 50px 50px;
  .head {
    .title {
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 15px;
    }
    margin-bottom: 30px;
  }
`;
const CardItemWrapper = styled.div`
  display: inline-block;
  .benefit-title {
    margin-bottom: 20px;
  }
`;

const CardListContainer = styled.div`
  padding: 10px 0;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const BtnBenefit = styled.button`
  display: inline-block;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  background-color: #ffffff;
  height: 34px;
  line-height: 22px;
  padding: 0 15px;
  color: var(--color-primary);
  font-size: 17px;
  font-weight: bold;
`;

const SkeletonBenefit = styled(SkeletonItem)`
  width: 76px;
  height: 34px;
  border-radius: 15px;
  margin-bottom: 20px;
  &.top {
    margin-bottom: 0;
  }
`;

export default SuggestCard;
