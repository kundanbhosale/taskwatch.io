import { toast } from 'react-hot-toast'
import styled from 'styled-components'

export const restoreToast = (id: string, handleClick: (id: string) => void) =>
  toast.custom((t) => (
    <DarkToast>
      <span>Moved to trash</span>
      <button
        onClick={() => {
          handleClick(id)
          toast.dismiss(t.id)
        }}
      >
        Undo
      </button>
    </DarkToast>
  ))

const DarkToast = styled.span`
  background-color: ${({ theme }) => theme.colors.dark};
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.875rem;
  padding: 0.7em 1em;
  border-radius: 100em;
  span,
  button {
    font-size: inherit;
    color: inherit;
    line-height: 1;
    margin: 0;
  }
  button {
    font-weight: 500;
    background-color: transparent;
    padding: 0 0.5em;
    margin-left: 0.5em;
  }
`
