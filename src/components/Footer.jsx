import React from "react";
import "../assets/css/footer.css";
const Footer = () => {
    return (
        <footer id="footer" className="footer mt-5">
            <div className="container">
                <div className="row gy-2 gy-md-4">
                    <div className="col-lg-4 col-md-12 footer-info">
                        <a
                            href="index.html"
                            className="logo d-flex align-items-center"
                        >
                            <h4>Nilservice</h4>
                        </a>
                        <p className="foot">
                            Nilservice est une plateforme de solutions tout en
                            un qui vous connecte à des professionnels de divers
                            domaines allant des plus minimes services du
                            quotidien aux travaux les plus complexes où que vous
                            soyez en Afrique.
                        </p>
                        <div className="social-links d-flex mt-4">
                            <a href="/maintenance">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="/maintenance">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="/maintenance">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="/maintenance">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 footer-contact  text-start">
                        <h4>Nous Contacter</h4>
                        <p >
                            <strong>Adresse:</strong> Ange Raphael,
                            Douala-Cameroun
                            <br />
                            <strong>Phone:</strong> +237 6 97 72 30 63 / 6 79 80
                            76 75
                            <br />
                            <strong>Email:</strong> contact@nilservices.com
                            <br />
                            <strong> Nos horaires:</strong>
                            lundi-Samedi, 8h-17h
                            <br />
                        </p>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <h4>Newsletter</h4>
                        <div className="traitFooter"></div>

                        <p >
                            Restez à jour avec nos dernieres annonces et
                            services
                        </p>
                        <form>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Votre Email"
                                />
                            </div>
                            <button className="btn btn-primary">
                                Souscrit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="copyright">
                    © Copyright Nilservice. All Rights Reserved
                </div>
                <div className="credits">Design by KmerIT</div>
            </div>
        </footer>
    );
};

export default Footer;
