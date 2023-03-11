import { Container } from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";
import logo from "../../assets/images/Logo.svg";
import "./header.scss";

const Header = () => {
  return (
    <header className="mainHeader">
      <Container maxWidth="lg">
        <Link href="/" className="mainHeader__logo">
          <img src={logo} alt="siteLogo" className="img-fluid" />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
