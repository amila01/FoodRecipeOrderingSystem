import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { GoogleLoginButton } from "react-social-login-buttons";
import { loadUser } from "../../../redux/userAction";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../../styles/Loginn.module.css";
import { Row, Col } from "react-bootstrap";
import styles from "../../../styles/loginForm.module.css";
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const cookies = parseCookies();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("Login Success");
      router.push("/");
    }

    if (cookies?.user) {
      router.push("/");
    }
  }, [router]);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/user/login`,
        { email, password },
        config
      );

      console.log(data.message);
      cookie.set("token", data?.token);
      cookie.set("user", JSON.stringify(data?.user));
      router.push("/");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <Container className={styles.container}>
      <Row className="justify-content-md-center">
        <Col>
          <h2 className={styles.title}>Log In</h2>
        </Col>
      </Row>
      <Form onSubmit={SubmitHandler}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={styles.btn}>
          Submit
        </Button>
        <Row >
          <Form.Group as={Col} >
            <Link href="/src/user/forget" variant="body2">
              Forgot password?
            </Link>
          </Form.Group>
          <Form.Group as={Col} className={styles.sec}>
            <Link href="/src/user/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Form.Group>
        </Row>

        <hr />
        <GoogleLoginButton onClick={() => signIn("google")} />
      </Form>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Login;
