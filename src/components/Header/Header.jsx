import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Header.scss';
import { Logo } from '../Logo/Logo';
import { Settings } from '../Settings/Settings';
import translate from '../../api/translate.json';

export const Header = ({
    handleTheme = () => { },
    handleLanguage = () => { },
    language,
}) => {
    return (
        <header className="page__header header">
            <div className="header__content">
                <NavLink to="/" className="logo">
                    <Logo />
                </NavLink>

                <div className="header__buttons">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn('header__button', { 'is-active': isActive })
                        }
                    >
                        {translate[0][language].main}
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            cn('header__button', { 'is-active': isActive })
                        }
                    >
                        {translate[0][language].selected}
                    </NavLink>
                </div>

                <div className="header__settings">
                    <Settings
                        name="theme-settings"
                        handleChange={handleTheme}
                    />
                    <Settings
                        name="language-settings"
                        handleChange={handleLanguage}
                    />
                </div>
            </div>
        </header>
    )
}