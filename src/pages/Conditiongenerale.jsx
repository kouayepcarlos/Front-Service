import React from "react";
import Chat from "../components/Chat";
import Publicite from "../components/Publicite";
import Redirection from "../components/Redirection";
import Footer from "../components/Footer";
import NavBar from "../components/navbar/NavBar";
import "../assets/css/homepage.css";
import "../assets/css/politique.css";

const Conditiongenerale = () => {
    return (
        <div className="general">
            <Publicite />
            <div className="my-custom-div">
                <NavBar />
                <section className="mb-5 ">
                    <Redirection
                        texte={
                            "Conditions Générales d'Utilisation de la plateforme Nilservice"
                        }
                    />
                    <div className="condition">
                        <p> 1. Acceptation des conditions</p>

                        <p>
                            En vous inscrivant sur Nilservice.net, vous acceptez
                            de vous conformer à l’ensemble des conditions
                            d’utilisation de la plateforme. Toute violation de
                            ces conditions peut entraîner la suspension ou la
                            suppression de votre compte.
                        </p>

                        <p>2. Responsabilité des utilisateurs</p>

                        <p>
                            Chaque utilisateur est responsable des services
                            qu’il propose ou des transactions qu’il effectue sur
                            la plateforme. Nilservice.net ne pourra être tenu
                            responsable des litiges ou problèmes liés aux
                            services offerts.
                        </p>

                        <p> 3. Authenticité des informations</p>

                        <p>
                            Les informations fournies lors de l’inscription et
                            des offres doivent être exactes et complètes. Toute
                            fausse information ou tentative de fraude entraînera
                            l’exclusion de la plateforme.
                        </p>

                        <p>4. Respect des lois</p>

                        <p>
                            Les utilisateurs s’engagent à respecter toutes les
                            lois et réglementations applicables dans leur pays,
                            notamment en matière de droit du travail, de
                            propriété intellectuelle, de confidentialité, et des
                            transactions financières.
                        </p>

                        <p>5. Contenu et services</p>

                        <p>
                            Les services et contenus proposés sur Nilservice.net
                            doivent respecter les règles de bienséance et ne pas
                            inclure de contenus illicites, diffamatoires, ou
                            offensants. Nilservice.net se réserve le droit de
                            supprimer tout contenu jugé inapproprié ou
                            contrevenant aux lois en vigueur.
                        </p>

                        <p>6. Protection des données personnelles</p>

                        <p>
                            Nilservice.net s’engage à protéger les informations
                            personnelles des utilisateurs conformément à sa
                            politique de confidentialité. Les utilisateurs
                            doivent également prendre des mesures pour protéger
                            leurs données de compte, notamment leur mot de
                            passe.
                        </p>

                        <p>7. Paiement et facturation</p>

                        <p>
                            Le seul paiement effectué sur Nilservice.net est
                            l’abonnement utilisateur, fixé à 1 500 FCFA, payable
                            via Orange Money ou MTN Money. Nilservice.net ne
                            prélève aucune autre somme pour l’utilisation des
                            services proposés sur la plateforme. Les
                            utilisateurs doivent discuter directement avec les
                            prestataires pour les modalités de paiement des
                            services ou des articles. Toute transaction
                            financière entre utilisateurs relève de leur entière
                            responsabilité. Nilservice.net ne sera en aucun cas
                            responsable des paiements ou des litiges liés à ces
                            transactions.
                        </p>

                        <p> 8. Propriété intellectuelle</p>

                        <p>
                            Tous les contenus, services et éléments graphiques
                            présents sur Nilservice.net sont protégés par des
                            droits de propriété intellectuelle. Toute
                            reproduction ou utilisation non autorisée de ces
                            éléments est strictement interdite. Les utilisateurs
                            accordent à Nilservice.net une licence non exclusive
                            pour utiliser leurs contenus dans le cadre de la
                            mise en relation entre eux.
                        </p>

                        <p> 9. Mise en relation et transactions</p>

                        <p>
                            Nilservice.net facilite uniquement la mise en
                            relation entre les utilisateurs. La plateforme ne
                            prend pas part à l’exécution des transactions. Les
                            utilisateurs sont responsables de toutes les
                            négociations et accords relatifs à la vente, l’achat
                            ou les services fournis. En cas de fraude ou de
                            conflit, Nilservice.net se réserve le droit de
                            suspendre ou de supprimer l’accès au compte des
                            utilisateurs impliqués.
                        </p>

                        <p>10. Récompenses et commissions</p>

                        <p>
                            Les utilisateurs peuvent recevoir des récompenses
                            sous forme de commissions pour avoir recommandé la
                            plateforme à d’autres personnes. Ces récompenses
                            seront versées uniquement via le numéro de téléphone
                            enregistré sur la plateforme (soit Orange Money ou
                            MTN Money). Assurez-vous que le numéro associé à
                            votre compte ait un compte valide sur ces
                            plateformes pour pouvoir recevoir les récompenses.
                        </p>

                        <p>11. Confidentialité et sécurité des informations</p>

                        <p>
                            Le mot de passe de votre compte est confidentiel.
                            Vous devez prendre toutes les précautions
                            nécessaires pour protéger l’accès à votre compte.
                            Nilservice.net ne saurait être responsable en cas de
                            perte ou de vol du mot de passe de votre compte.
                        </p>

                        <p>12. Modification des conditions</p>

                        <p>
                            Nilservice.net se réserve le droit de modifier les
                            présentes conditions d’utilisation à tout moment,
                            sans préavis. Les utilisateurs seront informés des
                            modifications par notification sur la plateforme.
                            Pour continuer à utiliser les services après
                            modification des conditions, vous devrez accepter
                            les nouvelles conditions.
                        </p>

                        <p>13. Exclusion de responsabilité</p>

                        <p>
                            Nilservice.net ne peut être tenu responsable des
                            défauts ou dysfonctionnements techniques de la
                            plateforme, ni des dommages directs ou indirects
                            résultant de l’utilisation des services de la
                            plateforme. Nous ne serons responsables d’aucune
                            transaction réalisée autre que celle liée à
                            l’abonnement à la plateforme.
                        </p>

                        <p>14. Utilisation éthique de la plateforme</p>

                        <p>
                            Les utilisateurs s’engagent à utiliser
                            Nilservice.net dans un cadre respectueux et éthique,
                            en évitant tout comportement nuisible, frauduleux ou
                            portant atteinte à l’intégrité de la plateforme ou
                            de ses membres. Toute infraction à cette règle peut
                            entraîner des sanctions allant jusqu’à l’exclusion
                            du service.
                        </p>

                        <p>15. Accès à la plateforme</p>

                        <p>
                            Nilservice.net se réserve le droit de restreindre
                            l’accès à la plateforme à tout utilisateur qui
                            violerait gravement les conditions d’utilisation. Le
                            respect des règles et des engagements pris lors de
                            l’inscription est primordial pour garantir une
                            expérience de qualité à tous les utilisateurs.
                        </p>

                        <p>Conclusion</p>

                        <p>
                            En validant ces conditions, vous reconnaissez avoir
                            lu, compris et accepté l’intégralité des règles
                            d’utilisation de Nilservice.net. Nous vous
                            encourageons à consulter régulièrement ces
                            conditions pour rester informé des mises à jour.
                        </p>
                    </div>
                </section>
                <Chat />
                <Footer />
            </div>

           
        </div>
    );
};

export default Conditiongenerale;
