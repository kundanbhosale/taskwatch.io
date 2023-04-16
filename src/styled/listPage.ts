import styled from 'styled-components'

export const FlexGrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1em 0;
`

export const StyledListCard = styled.div`
  display: block;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  border: 4px solid ${({ theme }) => theme.shades.dark[50]};
  padding: 0.7em;
  border-radius: 6px;
  /* min-height: 100px; */
  position: relative;
  &:hover {
    border-color: ${({ theme }) => theme.shades.primary[200]};
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .card-title,
  .card-body,
  .card-foot {
    display: flex;
  }
  .card-foot {
    margin-top: 0.7em;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 0.1rem;
    font-size: 0.75rem;
    font-weight: 500;
    span {
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.2rem;
      }
    }
  }
  .card-body {
    justify-content: flex-end;
  }
  .card-title {
    align-items: center;
    margin-bottom: 0.4em;
  }
  .card-icon {
    width: 40px;
    height: 40px;
    margin-right: 0.5em;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.shades.primary[200]};
    border: 1px solid ${({ theme }) => theme.shades.primary[100]};

    padding: 0.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      width: 25px;
      height: 25px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }

  p {
    margin-bottom: 0;
  }

  .card-opt {
    position: absolute;
    top: 5px;
    right: 5px;
    margin: 0;
  }
`
