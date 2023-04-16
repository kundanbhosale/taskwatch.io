import styled from 'styled-components'

export const customBorder = (color: string) => `repeating-linear-gradient(
    -19deg,
    ${color},
    ${color} 6px,
    transparent 6px,
    transparent 12px,
    ${color} 12px
  ),
  repeating-linear-gradient(
    71deg,
    ${color},
    ${color} 6px,
    transparent 6px,
    transparent 12px,
    ${color} 12px
  ),
  repeating-linear-gradient(
    161deg,
    ${color},
    ${color} 6px,
    transparent 6px,
    transparent 12px,
    ${color} 12px
  ),
  repeating-linear-gradient(
    251deg,
    ${color},
    ${color} 6px,
    transparent 6px,
    transparent 12px,
    ${color} 12px
  )`

export const BorderBox = styled.div<{ active?: boolean }>`
  width: 100%;

  background-image: ${({ theme }) => customBorder(theme.shades.dark[400])};
  background-size: 1.5px 100%, 100% 1.5px, 1.5px 100%, 100% 1.5px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  transition: ease 0.2s;
  &.active,
  &:hover {
    background-image: ${({ theme }) => customBorder(theme.colors.primary)};
  }
`
