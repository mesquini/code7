import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`

`;

export const Header = styled.div`
  padding: 30px 0;
  background: #28262e;
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
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
      transition: all 0.5s;

      &:hover {
        color: #ff9000;
      }
    }
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
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
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

  div {
    position: relative;
    padding-left: 20px;

    input {
      height: 40px;
      border-radius: 4px;
      padding: 15px;
      border: 1px solid #fff;
      padding-left: 30px;
    }
    svg {
      position: absolute;
      bottom: 10px;
      left: 25px;
      top: 10px;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  button {
    background: #7156c1;
    border-color: #7156c1;
    width: 20vh;
    height: 5vh;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;

    &:hover {
      background: ${darken(0.1, '#7156c1')};
      border-color: ${darken(0.1, '#7156c1')};
    }
  }

  @media (max-width: 700px) {
    display: grid;
    margin: 25px 0 25px;
    justify-content: center;

    div {
      margin: 0;
      padding: 0;

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

  @media (max-width: 700px) {
    grid-template-columns: auto auto auto;

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
