import { css, styled } from "styled-components";

const btnColor = {
  primary: css`
    color: white;
    background-color: #f3c5c5;
  `,
  secondary: css`
    color: white;
    background-color: #8fbdd3;
  `,
  simple: css`
    color: black;
    background-color: white;
  `,
  gray: css`
    color: white;
    background-color: gray;
  `,
  dark: css`
    color: white;
    background-color: black;
  `,
};

const btnSize = {
  small: css`
    font-size: 12px;
    padding: 10px 16px;
  `,
  medium: css`
    font-size: 24px;
    padding: 11px 20px;
  `,
  large: css`
    font-size: 36px;
    padding: 12px 24px;
  `,
};

const btnRadius = {
  primary: css`
    border-radius: 16px;
  `,
  oval: css`
    border-radius: 50%;
  `,
  square: css`
    border-radius: 0px;
  `,
};

export const Button = styled.button`
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  ${({ color = "primary" }) => btnColor[color]}
  ${({ size = "medium" }) => btnSize[size]}
  ${({ isBorder, borderWeight }) =>
    isBorder
      ? css`
          border: solid ${borderWeight}px black;
        `
      : css`
          border: none;
        `}
  ${({ radius = "primary" }) => btnRadius[radius]}
`;
