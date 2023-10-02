import {withRouter, Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="nav-container">
      <li>
        <Link className="link-text" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
      </li>
      <li>
        <ul className="nav-text-card">
          <Link className="link-text" to="/">
            <li className="nav-text">Home</li>
          </Link>
          <Link className="link-text" to="/jobs">
            <li className="nav-text">Jobs</li>
          </Link>
        </ul>
      </li>
      <li>
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
      <div className="header-icons">
        <Link className="link-text" to="/">
          <li>
            <AiFillHome className="icons" size={30} />
          </li>
        </Link>
        <Link className="link-text" to="/jobs">
          <li>
            <BsFillBriefcaseFill className="icons" size={30} />
          </li>
        </Link>
        <li>
          <button
            className="logout-button-sm"
            type="button"
            onClick={onClickLogout}
          >
            <FiLogOut className="icons" size={30} />
          </button>
        </li>
      </div>
    </ul>
  )
}

export default withRouter(Header)
