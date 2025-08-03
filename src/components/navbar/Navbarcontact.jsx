import React from "react";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../assets/css/navbar.css";
import { useNavigate } from "react-router-dom";

const Navbarcontact = () => {
    const navigate = useNavigate();
    return (
        <section className="nav ">
            {["md"].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    className="mt-3 d-flex px-3 px-md-0 flex-sm-column w-100 "
                >
                    <Container
                        fluid
                        className="d-none d-md-flex flex-md-row gap-4 justify-content-between mb-sm-3 px-5"
                    >
                        <Navbar.Brand style={{ fontSize: 34 + "px" }} href="/">
                            Nilservice
                        </Navbar.Brand>

                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                        />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    Nilservice
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="d-none d-md-flex flex-md-row body-nav justify-content-between ">
                                <button
                                    style={{
                                        width: 25 + "%",
                                        border: "none",
                                        height: 55 + "px",
                                        fontSize: 1.2 + "vmax",
                                        borderRadius: 15 + "px",
                                        paddingLeft: 1 + "%",
                                        paddingRight: 1 + "%",
                                        backgroundColor: "#ef8f0a",
                                    }}
                                >
                                    <a
                                        href=""
                                        onClick={() => {
                                            navigate("/maintenance");
                                        }}
                                    >
                                        <i className="fa-solid fa-plus"></i>{" "}
                                        <span className="annonce">
                                            Déposer une annonce
                                        </span>
                                    </a>
                                </button>
                                <div
                                    style={{
                                        border: "none",
                                        width: 35 + "%",
                                        height: 55 + "px",
                                        fontSize: 1.1 + "vmax",
                                        borderRadius: 15 + "px",
                                        alignItems: "center",
                                        display: "flex",
                                        paddingLeft: 2 + "%",
                                        paddingRight: 2 + "%",
                                        backgroundColor: "#f1f2f6",
                                    }}
                                >
                                    {" "}
                                    <form action="">
                                        <input
                                            style={{
                                                border: "none",
                                                width: 80 + "%",
                                                backgroundColor: "#f1f2f6",
                                                outline: "none",
                                            }}
                                            placeholder="recherche"
                                        />{" "}
                                        <button
                                            style={{ border: "none" }}
                                            className="border-none "
                                        >
                                            <i
                                                style={{
                                                    border: "none",
                                                    backgroundColor: "#ef8f0a",
                                                    borderRadius: 50 + "px",
                                                    padding: "40% 60%",
                                                }}
                                                className="fa-solid fa-magnifying-glass"
                                            ></i>
                                        </button>
                                    </form>
                                </div>{" "}
                                <a
                                    className="d-flex flex-column justify-content-center align-items-center "
                                    style={{ fontSize: 1.3 + "vmax" }}
                                    onClick={() => {
                                        navigate("/maintenance");
                                    }}
                                >
                                    {" "}
                                    <i
                                        className="fa-regular fa-heart"
                                        style={{ fontSize: 1.55 + "vmax" }}
                                    ></i>
                                    <span>Favoris</span>
                                </a>
                                <a
                                    className="d-flex flex-column justify-content-center align-items-center"
                                    style={{ fontSize: 1.3 + "vmax" }}
                                    onClick={() => {
                                        navigate("/maintenance");
                                    }}
                                >
                                    {" "}
                                    <i
                                        className="fa-regular fa-comment-dots"
                                        style={{ fontSize: 1.55 + "vmax" }}
                                    ></i>
                                    <span>Message</span>
                                </a>
                                <a
                                    className="d-flex flex-column justify-content-center align-items-center"
                                    style={{ fontSize: 1.3 + "vmax" }}
                                    onClick={() => {
                                        navigate("/connexion/academie");
                                    }}
                                >
                                    {" "}
                                    <i
                                        className="fa-regular fa-user"
                                        style={{ fontSize: 1.55 + "vmax" }}
                                    ></i>
                                    <span>Profil</span>
                                </a>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>

                    <Container fluid>
                        <Navbar.Brand
                            href="/maintenance"
                            className="d-block d-md-none"
                        >
                            Nilservice
                        </Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                        />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    Nilservice
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className="d-md-none">
                                    <div
                                        style={{
                                            border: "none",
                                            width: 300 + "px",
                                            height: 45 + "px",
                                            borderRadius: 15 + "px",
                                            alignItems: "center",
                                            display: "flex",
                                            paddingLeft: 10 + "px",
                                            paddingRight: 10 + "px",
                                            backgroundColor: "#f1f2f6",
                                        }}
                                    >
                                        {" "}
                                        <form action="">
                                            <input
                                                style={{
                                                    border: "none",
                                                    backgroundColor: "#f1f2f6",
                                                }}
                                                className="border-none"
                                                placeholder="search"
                                            />{" "}
                                            <button
                                                style={{ border: "none" }}
                                                className="border-none "
                                            >
                                                <i
                                                    style={{ border: "none" }}
                                                    className="fa-solid fa-magnifying-glass"
                                                ></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <Nav
                                    className="justify-content-between flex-grow-1 pe-3 mb-sm-3 respons-nav"
                                    style={{
                                        color: "black !important",
                                        fontWeight: 500,
                                    }}
                                >
                                    <Nav.Link href="/">Accueil</Nav.Link>

                                    <NavDropdown
                                        title="MarketPlace Services"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/prestataire/liste?profession=plombier">
                                            Plombier
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/liste?profession=menusier">
                                            Menusier
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/liste?profession=electricien">
                                            Electricien
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/liste?profession=maçon">
                                            Maçon
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/liste?profession=peintre">
                                            Peintre
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/liste?profession=jardinier">
                                            Jardinier
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/liste?profession=frigoriste">
                                            Frigoriste
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/liste?profession=carreleur">
                                            Carreleur
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/liste?profession=répétiteur">
                                            Répétiteur
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/prestataire/liste">
                                            Autres
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="MarketPlace Produits"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/vendeur/liste?categorie=vetement">
                                            Vetement
                                        </NavDropdown.Item>

                                        <NavDropdown.Item href="/vendeur/liste?categorie=meuble">
                                            Meuble
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/vendeur/liste?categorie=electromenager">
                                            Electromenager
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/vendeur/liste?categorie=appareil">
                                            Appareil
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/vendeur/liste">
                                            Autres
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <Nav.Link href="/connexion/academie">
                                        MarketPlace Academie
                                    </Nav.Link>

                                    <NavDropdown
                                        title="Mon compte"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/vendeur/connexion">
                                            Connexion vendeur
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/connexion/academie">
                                            Connexion academie
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/connexion">
                                            Connexion prestataire
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/partenaire/connexion">
                                            Connexion partenaire
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="S'abonner"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/vendeur/step1">
                                            {" "}
                                            vendeur
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/register/step">
                                            {" "}
                                            academie
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/prestataire/step1">
                                            {" "}
                                            prestataire
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/partenaire/step1">
                                            {" "}
                                            partenaire
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link
                                        href="/contact"
                                        style={{
                                            color: "#ef8f0a",
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        Contact
                                    </Nav.Link>
                                </Nav>
                                <div className="d-md-none">
                                    <a
                                        href=""
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        {" "}
                                        déposer une annonce
                                    </a>
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </section>
    );
};

export default Navbarcontact;
