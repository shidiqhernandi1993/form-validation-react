import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function FormValidation() {
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  let usernameRegex = new RegExp("^[a-zA-Zs]*$");

  const [alertText, setAlertText] = useState("");
  const alertTextArray = alertText.split(",");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError((value) => ({
      ...value,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }));
    const form = event.currentTarget;

    if (form.username.value.length < 5) {
      setError((value) => ({
        ...value,
        username: "username must be at lest 5 character",
      }));
    }

    if (!usernameRegex.test(form.username.value)) {
      setError((value) => ({
        ...value,
        username: "username not allowed symbol and number",
      }));
    }

    if (!regex.test(form.email.value)) {
      setError((value) => ({ ...value, email: "Your Email not valid" }));
    }

    if (form.password.value.length < 8) {
      setError((value) => ({
        ...value,
        password: "Your password must be at lest 8 character",
      }));
    }

    if (form.confirmPassword.value.length < 8) {
      setError((value) => ({
        ...value,
        confirmPassword: "Your confirm password must be at lest 8 character",
      }));
    }

    if (form.confirmPassword.value !== form.password.value) {
      setError((value) => ({
        ...value,
        confirmPassword: "Your password not match",
      }));
    }

    if (
      usernameRegex.test(form.username.value) &&
      form.username.value.length >= 5 &&
      regex.test(form.email.value) &&
      form.password.value.length >= 8 &&
      form.confirmPassword.value.length >= 8 &&
      form.confirmPassword.value === form.password.value
    ) {
      setAlertText(`${form.username.value},${form.email.value},${form.password.value}`);
    }
  };

  return (
    <Container className="bg-dark py-5 min-vh-100 position-relative" id="contact" fluid>
      {alertText && (
        <Alert
          className="position-absolute top-0 w-100 start-0"
          variant="success"
          onClose={() => setAlertText("")}
          dismissible
        >
          <Alert.Heading>Register Succesfully</Alert.Heading>
          <p>
            Welcome, {alertTextArray[0]}, <br />
            Your Email is, {alertTextArray[1]}, <br />
            Your Password is, {alertTextArray[2]}
          </p>
        </Alert>
      )}
      <Container>
        <Form noValidate onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "800px" }}>
          <h1 className="fw-bold text-white text-center ">Register</h1>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" md="12" controlId="username">
              <Form.Label className="text-white">Username</Form.Label>
              <Form.Control required type="text" placeholder="Username" name="username" />
              {error.username && <p className="text-danger my-0">{error.username}</p>}
            </Form.Group>
            <Form.Group as={Col} className="mb-3" md="12" controlId="email">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control required type="text" placeholder="Email" name="email" />
              {error.email && <p className="text-danger my-0">{error.email}</p>}
            </Form.Group>
            <Form.Group as={Col} className="mb-3" md="12" controlId="password">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
              />
              {error.password && <p className="text-danger my-0">{error.password}</p>}
            </Form.Group>
            <Form.Group as={Col} className="mb-3" md="12" controlId="confirm password">
              <Form.Label className="text-white">Confirm Password</Form.Label>
              <Form.Control
                required
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Your Password"
                name="confirmPassword"
              />
              {error.confirmPassword && <p className="text-danger my-0">{error.confirmPassword}</p>}
            </Form.Group>
            <Form.Group as={Col} className="mb-3" md="12" controlId="show_password">
              <Form.Check
                value={showPassword}
                onChange={() => setShowPassword((value) => !value)}
                className="text-white"
                type={"checkbox"}
                label="Show Password"
              />
            </Form.Group>
          </Row>
          <Button type="submit">Register</Button>
        </Form>
      </Container>
    </Container>
  );
}