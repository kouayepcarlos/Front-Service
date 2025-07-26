import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../../assets/css/admin/navadmin.css";

function Navbaradmin() {
  return (
      <section className="navadm ">
          <Navbar className="">
              <Container>
                  <Navbar.Brand
                      style={{
                          color: "white",
                          fontSize: "1.9vmax",
                          fontWeight: "bolder",
                      }}
                  >
                      Nilservice
                  </Navbar.Brand>
                  <span style={{ fontWeight: "bolder" }}>
                      Espace pour la gestion des sujets
                  </span>
                  <span>
                      {" "}
                      <i className="fa-solid fa-user"> </i>{" "}
                      {sessionStorage.getItem("user")}
                  </span>
              </Container>
          </Navbar>
      </section>
  );
}

export default Navbaradmin;
