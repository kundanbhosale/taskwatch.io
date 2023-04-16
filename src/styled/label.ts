import styled from 'styled-components'

export const StyledLabel = styled.span<{ size?: 'xs' | 'sm'; color?: string }>`
  width: fit-content;
  font-size: ${({ size }) => (size === 'xs' ? '0.7rem' : '0.75rem')};
  padding: 0.3em 0.7em;
  overflow: hidden;
  fill: ${({ theme }) => theme.colors.dark};
  border-radius: 0.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  background-color: ${({ theme, color }) => color || theme.shades.dark[100]};

  svg {
    width: 15px;
    height: 15px;
    fill: ${({ theme }) => theme.colors.dark};
    margin-right: 0.2em;
  }
  &:not(:last-child) {
    margin-right: 1em;
  }
  position: relative;
`

export const StyledLabelLG = styled(StyledLabel)`
  font-size: 0.8rem;
  padding: 0.5em 1em;
`

export const ReadyOnlyValue = styled.p`
  padding: 0.7em 0;
`
