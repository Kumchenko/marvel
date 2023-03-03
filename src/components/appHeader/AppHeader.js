import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            style={getStyle}
                            to="/">
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            style={getStyle} to="/comics">
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

const getStyle = ({ isActive }) => {
    if (isActive) {
        return { color: '#9f0013' }
    }
    return { color: 'inherit' }
}

export default AppHeader;