// import React from "react";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../assets/css/navbar.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Contexts/AppProvider";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";
import { useState } from "react";
import logo from "../../assets/images/logoatlas.png";

const Navbaracademie = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deconnexion = async () => {
    setLoading(true);
    await logout();
    navigate("/");
    // setLoading(false)
  };
  const handleNavigation = () => {
    navigate("/configuration");
  };

  return (
    <section className="nav">
      {loading && <LoaderTransparent />}
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="mt-3 d-flex px-3 px-md-4 flex-sm-column w-100 "
        >
          <Container
            fluid
            className="d-none d-md-flex flex-md-row gap-4 justify-content-between mb-sm-3 px-5"
          >
            <Navbar.Brand style={{ fontSize: 34 + "px" }} href="/">
              <img className="image-logo" src={logo} />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Nilservice
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-none d-md-flex flex-md-row body-nav justify-content-between ">
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
                    <button style={{ border: "none" }} className="border-none ">
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
                    navigate("/maintenance_academie");
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
                    navigate("/maintenance_academie");
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
                  onClick={handleNavigation}
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ fontSize: 1.3 + "vmax" }}
                >
                  {" "}
                  <i
                    className="fa-regular fa-user"
                    style={{
                      fontSize: 1.55 + "vmax",
                      cursor: "pointer",
                    }}
                  ></i>
                  {<span>{user.nom}</span>}
                </a>
                <a
                  onClick={deconnexion}
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{
                    fontSize: 1.3 + "vmax",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <i
                    className="fa-regular fa-user"
                    style={{ fontSize: 1.55 + "vmax" }}
                  ></i>
                  <span>deconnexion</span>
                </a>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>

          <Container fluid>
            <Navbar.Brand href="/" className="d-block d-md-none">
              <img className="image-logo" src={logo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
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
                  <Nav.Link href="/homeacademy">Accueil</Nav.Link>
                  {user.serie != null && <Nav.Link href="/chat">Chat</Nav.Link>}

                     {user.concours != "true" && <Nav.Link href="/bibliotheque">Ajout fichier</Nav.Link>}
               {user.concours != "true" && <Nav.Link href="/allfichier">Bibliotheque</Nav.Link>}

                 

                  <Nav.Link href="/contact">
                                        Contact
                                    </Nav.Link>
                </Nav>
                <div className="d-md-none">
                  <a
                    href="/avantage"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {" "}
                    Avantages de la plateforme
                  </a>
                  <br />
                  <br />
                  <a
                    onClick={handleNavigation}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {" "}
                    <i className="fa-regular fa-user"></i>
                    {<span>{user.nom}</span>}
                  </a>
                  <br />
                  <br />
                  <a
                    onClick={deconnexion}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {" "}
                    <span>deconnexion</span>
                  </a>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <hr />
    </section>
  );
};

export default Navbaracademie;
