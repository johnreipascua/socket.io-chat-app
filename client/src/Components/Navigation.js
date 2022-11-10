import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
import { FiGithub, FiLogOut } from "react-icons/fi";

export default function Navigation({joined, setJoined}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar expand='lg' container='lg' className='shadow-sm'>
                <NavbarBrand href="/">Chat App</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/johnreipascua/socket.io-chat-app" target='_blank'>
                                <FiGithub /> GitHub
                            </NavLink>
                        </NavItem>
                        {joined ? <NavItem>
                            <NavLink onClick={setJoined}>
                                <FiLogOut /> Leave Room
                            </NavLink>
                        </NavItem> : <></>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
