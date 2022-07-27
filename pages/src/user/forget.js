import * as React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { GoogleLoginButton } from "react-social-login-buttons";
import styles from "../../../styles/loginForm.module.css";
import { Row, Col } from "react-bootstrap";

export default function SignIn() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    try {
      const email = result.get("email");

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(`/api/user/forget`, { email }, config);
      console.log(data.message);
      router.push("/login");
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  return (
    <Container className={styles.container}>
      
      <Row className="justify-content-md-center">
        <Col>
          <h2 className={styles.title}>Password Reset</h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label htmlFor="email">Enter your Email</Form.Label>
          <Form.Control
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={styles.btn}>
          Submit
        </Button>
        {/* <GoogleLoginButton onClick={() => signIn("google")} /> */}
      </Form>
      {/* <Link href="/src/user/login" variant="body2">
        Have an account ? Login
      </Link>
      <Link href="/src/user/register" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link> */}
    </Container>
  );
}
