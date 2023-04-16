import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
  // const navigate = useNavigate()

  const handleScroll = () => {
    const offset = (window.scrollY || 0) - 55
    const navbar = document.getElementById('primary-navbar')
    if (!navbar) return
    if (offset <= 0) navbar.classList.remove('sticky-nav')
    if (offset > 55) {
      navbar.classList.add('sticky-nav')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Wrapper id="primary-navbar">
      <div>
        {/*  */}
        {/* <Button
          className="hover-color-primary"
          size="lg"
          onClick={() => navigate(-1)}
        >
          <Icon
            type="arrow"
            height={'25px'}
            width={'25px'}
            style={{ transform: 'rotateZ(90deg)' }}
            className="mr"
          />
          Back
        </Button> */}
      </div>
      <div className="navbar-links">
        <NavLink className={`primary-border-bottom`} to="/boards">
          {/* <Icon type="work" /> */}
          Boards
        </NavLink>
        <NavLink to="/" className={`logo primary-border-bottom`}>
          <img
            src={`/icon-192x192.png`}
            alt="task-watch-kanban-tool"
            width={20}
            height={20}
          />
          TASKWATCH
        </NavLink>
        <NavLink className={`primary-border-bottom`} to="/my-notes">
          {/* <Icon type="emoji" /> */}
          My Notes
        </NavLink>
      </div>
      {/* <div className="navbar-items">
        <div className="item notification has-badge">
          <Icon type="bell" width={'22px'} height={'22px'} />
        </div>
        <div
          className="avatar item"
          style={{ backgroundImage: `url(${user && user.photoURL})` }}
        />
      </div> */}
      <div></div>
    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 2em;
  align-items: center;
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 100;
  position: relative;
  border-bottom: 1.5px solid ${({ theme }) => theme.shades.dark[50]};
  &.sticky-nav {
    box-shadow: ${({ theme }) => theme.shades.dark[50]} 0px 2px 10px 0px;
    position: fixed;
    top: 0;
    left: 0;
  }
  .logo {
    font-weight: 900;
  }
  .navbar-links {
    display: flex;
    column-gap: 1.5em;
    a {
      svg {
        margin-right: 0.2em;
        width: 18px;
        height: 18px;
      }
    }
  }
  .navbar-items {
    display: flex;
    .item {
      width: 35px;
      height: 35px;
      padding: 0.5em;
      /* background: ${({ theme }) => theme.shades.dark[100]}; */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }
  .notification {
    position: relative;
    z-index: 5;
    height: 55px;
    &:hover {
      background-color: ${({ theme }) => theme.shades.primary[100]};
      svg {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      border-radius: 50%;
    }
    &:before {
      outline: 3px solid ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.primary};
      width: 6px;
      height: 6px;
      z-index: 1;
      top: 11px;
      right: 8px;
    }
  }
  .avatar {
    background-position: center;
    background-size: contain;
  }
`
