import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import getTokenApi from "../api/monkeyGetToken";
import CardDetail from "../components/detail/CardDetail";
import NotFound from "./NotFound";

type Props = {};

const Detail = (props: Props) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({} as CardInfo);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getCardInfo = async () => {
      const data = await getTokenApi.cardDetail(id);
      setCardInfo(data);
    };
    getCardInfo();
  }, [id]);

  if (cardInfo === undefined) return <NotFound />;

  return (
    <Wrapper>{cardInfo && <CardDetail card={cardInfo}></CardDetail>}</Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: var(--margin-bottom);
`;

export default Detail;
