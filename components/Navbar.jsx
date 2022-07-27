import Image from "next/image";
import styles from "../styles/Navbar.module.css";
// import { useSelector } from "react-redux";
// import Link from "next/link";
import { FaBeer, FaRegUserCircle, FaCartPlus } from "react-icons/fa";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/userAction";
import {
  Navbar,
  Form,
  Container,
  Nav,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";

const Navbar1 = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  console.log("co", quantity);

  const cookies = parseCookies();
  const router = useRouter();
  const [userState, setUserState] = useState("");

  const { data: session } = useSession();
  console.log(session, cookies.token);
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const { loading, error, dbUser } = profile;

  const user = dbUser
    ? dbUser
    : cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : "";

  console.log(userState);
  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user);

    if (user) {
      // console.log("header", user)
      dispatch(loadUser(user.email));
    }
  }, [router, setUserState]);

  const logoutHandler = async () => {
    if (session) {
      signOut();
    }
    cookie.remove("token");
    cookie.remove("user");
    setUserState("");
  };

  return (
    <Navbar className={styles.container} expand="lg">
      <Container className="flex-grow-1 pe-3">
        <Navbar.Brand href="/">
          <Image src="/img/logo.png" alt="" width="45" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 my-lg-0 justify-content-end flex-grow-1 pe-3"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              {/* <div className={styles.list}>
                Login <FaRegUserCircle className="mx-2" />
                {userState && userState.name}
              </div> */}
              <Link href="/src/user/profile" className={styles.name}>
                <Button variant="outline-warning">
                  <FaRegUserCircle className="mx-2" />
                  {userState && userState.name}
                </Button>
              </Link>

              {userState ? (
                <>
                  <Button variant="outline-warning" onClick={logoutHandler}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/src/user/login">
                    <Button
                      variant="outline-success"
                      className="mx-2"
                      size="sm"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/src/user/register">
                    <Button variant="outline-success" size="sm">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </Nav.Link>
            <Nav.Link>
              <Link href="/cart" passHref>
                <div className={styles.cart}>
                  Cart
                  <FaCartPlus className="mx-2" />
                  <div className={styles.counter}>{quantity}</div>
                </div>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
