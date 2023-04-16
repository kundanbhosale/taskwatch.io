import styled from 'styled-components'

export const PrimaryLoader = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  margin: auto;
  &:before,
  &:after {
    content: '';
    background: ${({ theme }) => theme.colors.primary};
    transform-origin: left;
    animation: sp4 2s infinite;
  }
  &:before {
    transform-origin: right;
    --s: -1;
  }

  @keyframes sp4 {
    0%,
    10% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(calc(var(--s, 1) * 50%), 0) scale(1);
    }
    66% {
      transform: translate(calc(var(--s, 1) * 50%), calc(var(--s, 1) * -50%))
        scale(1);
    }
    90%,
    100% {
      transform: translate(calc(var(--s, 1) * 50%), calc(var(--s, 1) * -50%))
        scale(0.5, 2);
    }
  }
`
