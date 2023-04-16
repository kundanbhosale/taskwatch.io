import styled from 'styled-components'

export const Table = styled.div`
  display: table;
  border-collapse: collapse;
  width: 100%;
  font-size: 0.875rem;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.shades.dark[100]};
  border-radius: 6px;
  .thead {
    display: table-header-group;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 500;
    height: 40px;
    /* background-color: ${({ theme }) => theme.shades.dark[50]}; */
  }

  .tbody {
    display: table-row-group;
    .tr:hover {
      background-color: ${({ theme }) => theme.shades.dark[50]};
    }
  }
  .tfoot {
    display: table-footer-group;
  }

  .tr {
    display: table-row;
    /* border-bottom: 1px solid ${({ theme }) => theme.shades.dark[100]}; */
  }
  .td {
    border: 1px solid ${({ theme }) => theme.shades.dark[100]};
    display: table-cell;
    padding: 0.7em 0.5em;
    vertical-align: middle;
  }
`
