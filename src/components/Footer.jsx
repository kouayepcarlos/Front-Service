import React,{useState} from "react";
import "../assets/css/footer.css";
import { authAPINewsletter } from "../fecths/fetchNewsletter";
import { toast } from "react-toastify";
import LoaderTransparent from "./LoadersCompoments/LoaderTransparent";

const Footer = () => {

     const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSend = async () => {
    console.log(email)
    if (email.trim() === "") {
      toast.warning("Veuillez renseigné votre email.");

      return;
    }
    setLoading(true);
    try {
      const res = await authAPINewsletter.subscribe({ email });

      if (res?.status == 200) {
        toast.success(res?.message);
        return;
      }
      toast.error(res?.message);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
    return (
        <footer id="footer" className="footer mt-5">
            {loading && <LoaderTransparent/>}
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
                           Nilservice est une plateforme tout-en-un qui vous met en relation avec des professionnels pour tous types de services, du plus simple au plus complexe, où que vous soyez au Cameroun.
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
                            {/* <strong>Phone:</strong> +237 6 97 72 30 63 / 6 79 80
                            76 75
                            <br /> */}
                            <strong>Email:</strong> contact@nilservices.com
                            <br />
                            <strong> Nos horaires: </strong>
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
                        <div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    required
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Votre Email"
                                />
                            </div>
                            <button className="btn btn-primary" onClick={handleSend}>
                                Souscrit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="copyright">
                    © Copyright Nilservice. All Rights Reserved
                </div>
                <div className="credits">Design & Developed By <a href="https://www.linkedin.com/in/laurainefongang?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Lauraine Fongang</a></div>
            </div>
        </footer>
    );
};

export default Footer;
