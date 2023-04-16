import styled from 'styled-components'

export const Button = styled.button<{
  size?: 'sm' | 'lg' | 'xl'
  width?: string
  center?: boolean
}>`
  appearance: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: ${({ size }) =>
    size === 'xl' ? '1rem' : size === 'lg' ? '0.875rem' : '0.8rem'};
  width: ${({ width }) => width || 'fit-content'};
  font-weight: 500;
  height: ${({ size }) =>
    size === 'xl' ? '48px' : size === 'lg' ? '38px' : '32px'};
  padding: 1em 1.5em;
  transition: ease-in-out 0.2s;
  justify-content: ${({ center }) => (center ? 'center' : 'space-between')};
  svg {
    width: 18px;
    height: 18px;
    line-height: 1;
    transition: ease-in-out 0.2s;
  }
`
export const PrimaryButton = styled(Button)`
  background: ${({ theme }) => theme.shades.primary[900]};
  color: ${({ theme }) => theme.colors.white};
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`

export const SecondaryButton = styled(Button)`
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.primary};

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`

export const DarkButton = styled(Button)`
  background: ${({ theme }) => theme.colors.dark};
  box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.dark};
    svg {
      fill: ${({ theme }) => theme.colors.dark};
    }
  }
`

export const LightButton = styled(Button)`
  box-shadow: inset 0px 0px 0px 1.7px ${({ theme }) => theme.shades.dark[300]};
  color: ${({ theme }) => theme.shades.dark[700]};
  &:hover {
    color: ${({ theme }) => theme.shades.dark[700]};
    background-color: ${({ theme }) => theme.shades.dark[50]};
    svg {
      fill: ${({ theme }) => theme.shades.dark[700]};
    }
  }
`
export const DangerButton = styled(Button)`
  box-shadow: inset 0px 0px 0px 1.7px ${({ theme }) => theme.shades.danger[500]};
  color: ${({ theme }) => theme.colors.danger};
  &:hover {
    background-color: ${({ theme }) => theme.shades.danger[100]};
  }
`
export const IconButton = styled.button`
  background-color: transparent;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* outline: 1px solid ${({ theme }) => theme.shades.dark[200]}; */
  border: none;
  svg {
    fill: ${({ theme }) => theme.shades.dark[500]};
    width: 20px;
    width: 20px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.shades.primary[200]};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`
