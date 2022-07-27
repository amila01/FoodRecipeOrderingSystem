import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { GoogleLoginButton } from "react-social-login-buttons";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import styles from "../../../styles/loginForm.module.css";
import { Row, Col } from "react-bootstrap";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const { data: session } = useSession();

  const cookies = parseCookies;

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
      if (password !== conPassword) {
        console.log("passwords do not match");
        return;
      }

      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : "";

      console.log(email, password, firstName, lastName);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/user/register`,
        { email, password, firstName, lastName },
        config
      );

      console.log(data?.message);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Container className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        <Form onSubmit={SubmitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label htmlFor="firstName">first Name</Form.Label>
            <Form.Control
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="lastName">last Name</Form.Label>
            <Form.Control
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label htmlFor="email">email</Form.Label>
            <Form.Control
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">password</Form.Label>
            <Form.Control
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="confirm password">confirm password</Form.Label>
            <Form.Control
              name="confirm password"
              label="Confirm Password"
              type="password"
              id="confirm password"
              autoComplete="current-password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className={styles.btn}>
            Sign Up
          </Button>
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
export default Register;
