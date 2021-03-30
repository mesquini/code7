import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background-color: #dddd;
`;

export const Header = styled.div`
  padding: 30px 0;
  background: #111C29;
`;

export const HeaderContent = styled.div`
  display: flex;
  max-width: 1120px;
  margin: 0 auto;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    margin-right: 10px;
    border: 0;

    svg {
      color: #81878E;
      width: 20px;
      height: 20px;
      transition: all 0.5s;

      &:hover {
        color: #135B7B;
      }
    }
  }

  @media (max-width: 700px) {

  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #81878E;
    }

    strong {
      color: #135B7B;
    }

    a {
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  padding: 0 20px;
`;

export const Buttons = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;

  button {
    background: #135B7B;
    border-color: #135B7B;
    width: 20vh;
    height: 5vh;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;

    &:hover {
      background: ${darken(0.1, '#135B7B')};
      border-color: ${darken(0.1, '#135B7B')};
    }
  }

  @media (max-width: 500px) {
    display: grid;
    margin: 25px 0 25px;
    justify-content: center;

    div {
      svg {
        left: 6px;
        top: 6px;
      }
    }

    a {
      text-align: center;
      margin-top: 10px;
    }
  }
`;

export const Empty = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15%;

  strong {
    font-size: 24px;
  }
`;

export const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;

export const Dividends = styled.div`
  margin-top: 5%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;

  button {
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    text-align: justify;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &:hover {
      background-color: ${darken(0.1, '#fff')};
    }
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);

    button {
      div {
        display: grid;
      }
    }
  }

  @media (max-width: 700px) {

  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Label = styled.div`
  margin-top: 18px;
  margin-bottom: 10px;

  label {
    margin-left: 10px;
  }

`;

export const ModalButtons = styled.div`
  div {
    display: flex;
    margin: 0;

    button {
      width: 10vh;
    }
  }
`;
