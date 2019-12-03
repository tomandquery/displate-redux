import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="navbar-nav mr-auto">
                <NavLink className={'nav-item'} to="/" activeClassName={'active'} exact>
                    <span className={'nav-link'}>Home</span>
                </NavLink>
                <NavLink className={'nav-item'} to="/plates" activeClassName={'active'}>
                    <span className={'nav-link'}>Plates</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Header;
