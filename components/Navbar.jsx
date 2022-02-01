import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaBeer, FaRegUserCircle, FaCartPlus } from 'react-icons/fa';
import { Navbar, Form, Container, Nav, NavDropdown, FormControl,Button } from "react-bootstrap";

const Navbar1 = () => {
    const quantity = useSelector((state)=>state.cart.quantity);

    return (  
        <Navbar className={styles.container} expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">
                    <Image src="/img/logo.png" alt="" width="45" height="45"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Form className="me-auto d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-warning">Search</Button>
                </Form>
                <Nav
                    className="my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/admin/login" >
                        <div className={styles.list}>
                        Login <FaRegUserCircle className="mx-2"/>
                        </div> 
                    </Nav.Link>
                    <Nav.Link>
                        <Link href="/cart" passHref>
                        <div className={styles.cart}>
                            Cart
                            <FaCartPlus className="mx-2"/>
                            {/* <Image src="/img/cart.png" alt="" width="30px" height="30px" /> */}
                            <div className={styles.counter}>
                                {quantity}
                            </div>
                        </div>
                        </Link>
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    );
}
 
export default Navbar1;
