import * as React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SignIn() {
  const router = useRouter();

  const { token } = router.query;

  console.log(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    try {
      const conPassword = result.get("conPassword");
      const password = result.get("password");

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/user/reset/${token}`,
        { conPassword, password },
        config
      );
      console.log(data.message);
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  return (
    <Container>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label for="password">password</Form.Label>
          <Form.Control
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label for="conPassword">Confirm Password</Form.Label>
          <Form.Control
            margin="normal"
            required
            fullWidth
            id="conPassword"
            label="Confirm Password"
            name="conPassword"
            type="password"
            autoComplete="email"
            autoFocus
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
