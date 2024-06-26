import React from 'react'
import classes from "./header.module.css"
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import logo from "../../assets/sLogo.png"
export default function Header() {
    const { user, logout } = useAuth();
    const { cart } = useCart();

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to="/" className={classes.logo}>
                    <img className="photo" src={logo} alt="logo" style={{height:70, width:70}}/>
                </Link>
                <nav>
                    <ul>
                        {
                            user ? (
                                <li className={classes.menu_container}>
                                    <Link to="/dashboard">{user.name}</Link>
                                    <div className={classes.menu}>
                                        <Link to='/profile'>Profile</Link>
                                        <Link to='/orders'>Orders</Link>
                                        <a onClick={logout}>logout</a>
                                    </div>
                                </li>
                            ) : (
                                <Link to="/login">Login</Link>
                            )
                        }
                        <li>
                            <Link to="/cart">
                                cart
                                {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
