import styles from "../styles/Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={`${styles.container} page-footer font-small pt-4`}>
        <div className="container-fluid text-center text-md-left">
            <div className="row">
                <div className="col-md-6 mt-md-0 mt-3">
                    <h5 className="text-uppercase">Make Your Own Dish</h5>
                    <p>This is a project for food recipe ordering that enables ability to order raw ingredients of the food recipe by the system online</p>
                </div>

                <hr className="clearfix w-100 d-md-none pb-0"/>

                <div className="col-md-3 mb-md-0 mb-3">
                    <h5 className="text-uppercase"></h5>
                    <ul className="list-unstyled">
                        <li><a href="#!"></a></li>
                        <Image src="/img/logo.png" alt="" width="100" height="100"/>
                        <li><a href="#!"></a></li>
                        <li><a href="#!"></a></li>
                        <li><a href="#!"></a></li>
                    </ul>
                </div>

                <div className="col-md-3 mb-md-0 mb-3">
                    <h5 className="text-uppercase">About Us</h5>
                    <ul className="list-unstyled">
                        <li>Contact- +94 7671 717 717</li>
                        <li>Address- 717, jakartha, Colombo, Sri Lanka. 10850</li>
                        <li>email- admin@food.com</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="footer-copyright text-center py-3">© 2022 Copyright:
            <a href="#"> MiniProject.com</a>
        </div>

    </footer>
  );
};

export default Footer;
