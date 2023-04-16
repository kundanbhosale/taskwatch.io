import styled from 'styled-components'

export const ColorSwatch = styled.div<{ color: string; size?: string }>`
  display: inline-flex;
  width: ${({ size }) => (size ? size : '20px')};
  height: ${({ size }) => (size ? size : '20px')};
  border-radius: 0.4em;
  background-color: ${({ color }) => color || 'red'};
  margin: auto;
  border: 1px solid ${({ theme }) => theme.shades.dark[200]};
  position: relative;
  &:hover {
    outline: 3px solid ${({ theme }) => theme.shades.primary[300]};
  }
  &.active::after {
    content: '';
    display: block;
    position: absolute;
    width: ${({ size }) => (size ? `calc((${size} / 2) + 5px)` : '5px')};
    height: ${({ size }) => (size ? `calc((${size} / 2) + 5px)` : '5px')};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'  %3E%3Cpath  d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'/%3E%3C/svg%3E");
    background-repeat: none;
    background-position: center;
  }
`
