import styled, { css } from "styled-components";

const shapeCSS = {
  pill: css`
    border-radius: 1rem;
  `,
  brick: css`
    border-radius: 0;
  `,
};

const sizeCSS = {
  small: css`
    width: 3rem;
    height: 3rem;
  `,
  medium: css`
    width: 5rem;
    height: 5rem;
  `,
  large: css`
    width: 6rem;
    height: 6rem;
  `,
  relative: css`
    width: inherit;
    height: inherit;
  `,
};

const spacingCSS = {
  divided: css``,
  cozy: css`
    padding: 0 3rem;
  `,
  comfy: css`
    padding: 0 5rem;
  `,
};

const weightCSS = {
  ghost: css`
    border: none;
  `,
  solid: css`
    background-color: ${({ theme }) => theme.COLOR.main};
  `,
  outlined: css`
    border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
  `,
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  ${({ shape }) => shapeCSS[shape]}
  ${({ weight }) => weightCSS[weight]}
  overflow: hidden;
  display: flex;
  justify-content: space-between;
`;

export const PageBtn = styled.button`
  background-color: ${({ isThisPage = false, theme }) =>
    isThisPage ? `${theme.COLOR.hover}` : `transparent`};
  ${({ size }) => sizeCSS[size]}
  ${({ space }) => spacingCSS[space]}
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, disabled }) =>
      !disabled && theme.COLOR.hover};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    transition: all 0.2s ease-in-out;
  }
`;
