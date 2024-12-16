import React from "react";
import {NavLink, Link} from "react-router";

const Navbar = () => {


    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink
                    to="/">
                    <h1 className="text-white text-4xl font-bold">LocalVibes</h1>
                </NavLink>

                <div className="flex space-x-4 text-lg">
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive ? "text-amber-100" : "text-white"
                        }
                    >
                        Event List
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({isActive}) =>
                            isActive ? "text-amber-100" : "text-white"
                        }
                    >
                        Favorites
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
