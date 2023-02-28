import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import styled from "styled-components";
import Back from "../components/ui/Back";

type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();
  const clickButton = () => {
    navigate(-1);
  };
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 403) {
      return <div>403 error</div>;
    }
    if (error.status === 404) {
      return (
        <Container>
          <h2>404 Not Found</h2>
          <img src="/monkey_notfound.png" alt="" />
          <button onClick={clickButton}>뒤로 가기</button>
        </Container>
      );
    }
    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }
  }
  return (
    <Container>
      <h2>404 Not Found</h2>
      <img src="/monkey_notfound.png" alt="" />
      <button onClick={clickButton}>뒤로 가기</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 200px;
  justify-content: center;
  h2 {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    padding: 20px 0;
    color: var(--color-black);
  }
  img {
    padding: 40px 0;
    width: 50%;
  }
  button {
    width: var(--width-inner);
    height: 55px;
    border: none;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    color: var(--color-white);
    background-color: var(--color-white);
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    &:hover {
      transition: 0.3s;
      color: var(--color-white);
      background-color: var(--color-primary);
    }
  }
`;

export default NotFound;
