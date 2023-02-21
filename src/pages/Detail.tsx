import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import getTokenApi from "../api/monkeyGetToken";
import CardDetail from "../components/Detail/CardDetail";
import Back from "../components/ui/Back";

type Props = {};

const Detail = (props: Props) => {
  const [cardInfo, setCardInfo] = useState<Array<CardInfo>>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const splitUrl = pathname?.split("/") ?? null;
    const location = splitUrl?.length > 1 ? splitUrl[splitUrl.length - 1] : "";
    const getCardInfo = async () => {
      const data = await getTokenApi.cardDetail(location);
      setCardInfo(data);
    };
    getCardInfo();
  }, [pathname]);

  return (
    <Wrapper>{cardInfo && <CardDetail card={cardInfo}></CardDetail>}</Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: var(--margin-bottom);
`;

export default Detail;
