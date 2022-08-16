import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import styles from "./UserRegistration.module.css";
import { registerUser } from "../../../services/auth";
import { useHistory } from "react-router-dom";

/**
 * Code reused from tutorial-3 for the course CSCI-5709
 * Author: Saurabh Jayeshbhai Das <sr850847@dal.ca>
 * Link:  https://git.cs.dal.ca/sjdas/saurabh-das-csci5709/-/blob/tutorial3/src/pages/UserRegistration/UserRegistration.tsx
 * Why I used: To pull up a registration form
 */

const UserRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [firstNameHasError, setFirstNameHasError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [lastNameHasError, setLastNameHasError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordHasError, setConfirmPasswordHasError] = useState(false);

  const history = useHistory();

  const handleChange = e => {
    let inputValue = e.target.value;
    const invalidNameRegex = /\d/;
    const validEmailRegex =
      /^[a-z_\.\+\-\_]+([a-z_\.\+\-\_]|[0-9])*@{1}[a-z]+\.(com|net|org|gov|co\.[a-z]{2,3}|[a-z]{2,3})$/;

    switch (e.target.name) {
      case "firstName":
        if (inputValue === "") {
          setFirstNameError("Invalid (Cannot be empty).");
          setFirstName(inputValue);
          setFirstNameHasError(true);
        } else if (invalidNameRegex.test(inputValue)) {
          setFirstNameError("Invalid (Cannot contain numbers).");
          setFirstNameHasError(true);
        } else {
          setFirstName(inputValue);
          setFirstNameError("");
          setFirstNameHasError(false);
        }
        break;
      case "lastName":
        if (inputValue.length === 0) {
          setLastNameError("Invalid (Cannot be empty).");
          setLastName(inputValue);
          setLastNameHasError(true);
        } else if (invalidNameRegex.test(inputValue)) {
          setLastNameError("Invalid (Cannot contain numbers).");
          setLastNameHasError(true);
        } else {
          setLastName(inputValue);
          setLastNameError("");
          setLastNameHasError(false);
        }
        break;
      case "email":
        inputValue = inputValue.toLowerCase();
        setEmail(inputValue);

        if (validEmailRegex.test(inputValue)) {
          setEmail(inputValue);
          setEmailError("");
          setEmailHasError(false);
        } else {
          setEmailError("Invalid email.");
          setEmailHasError(true);
        }
        break;
      case "password":
        setPassword(inputValue);
        let anyCaps = false;
        for (let i = 0; i < inputValue.length; i++) {
          if (
            inputValue.charCodeAt(i) >= 65 &&
            inputValue.charCodeAt(i) <= 90
          ) {
            anyCaps = true;
            break;
          }
        }

        if (
          inputValue.length < 8 ||
          !anyCaps ||
          !invalidNameRegex.test(inputValue)
        ) {
          setPasswordError(
            "Password too weak (min. 8 characters, must contain capital letters and numbers).",
          );
          setPasswordHasError(true);
        } else {
          setPasswordError("");
          setPasswordHasError(false);
        }
        break;
      case "confirmPassword":
        setConfirmPassword(inputValue);

        if (inputValue !== password) {
          setConfirmPasswordError("Does not match the password above.");
          setConfirmPasswordHasError(true);
        } else {
          setConfirmPasswordError("");
          setConfirmPasswordHasError(false);
        }
        break;
      default:
        break;
    }
  };

  const submit = async e => {
    console.log(e);
    try {
      const userEmailId = await registerUser(
        firstName,
        lastName,
        email,
        password,
      );
      console.log(userEmailId);

      // redirect
      history.push({
        pathname: "/confirmRegistration",
        state: {
          userToBeRegistered: email,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Error while registering - UserRegistration!!");
    }
  };

  return (
    <section className={styles.UserRegistration}>
      <h1 style={{ color: "steelblue" }}>Registration Form</h1>
      <Box
        className={styles.RegisterForm}
        component="form"
        noValidate={false}
        autoComplete="off"
      >
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          variant="filled"
          className={styles.InputField}
          value={firstName}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {firstNameError && (
          <span
            style={{ position: "relative", bottom: "20px" }}
            className="error"
          >
            {firstNameError}
          </span>
        )}
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          variant="filled"
          className={styles.InputField}
          value={lastName}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {lastNameError && (
          <span
            style={{ position: "relative", bottom: "20px" }}
            className="error"
          >
            {lastNameError}
          </span>
        )}

        <TextField
          required
          id="email"
          name="email"
          label="Email"
          variant="filled"
          className={styles.InputField}
          value={email}
          onChange={handleChange}
        />
        {emailError && (
          <span
            style={{ position: "relative", bottom: "20px" }}
            className="error"
          >
            {emailError}
          </span>
        )}

        <TextField
          required
          id="password"
          name="password"
          label="Password"
          variant="filled"
          type="password"
          className={styles.InputField}
          value={password}
          onChange={handleChange}
        />
        {passwordError && (
          <span
            style={{ position: "relative", bottom: "20px" }}
            className="error"
          >
            {passwordError}
          </span>
        )}

        <TextField
          required
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          variant="filled"
          type="password"
          className={styles.InputField}
          value={confirmPassword}
          onChange={handleChange}
        />
        {confirmPasswordError && (
          <span
            style={{ position: "relative", bottom: "20px" }}
            className="error"
          >
            {confirmPasswordError}
          </span>
        )}

        <Button
          className="SubmitButton"
          variant="contained"
          disabled={
            firstNameHasError ||
            lastNameHasError ||
            emailHasError ||
            passwordHasError ||
            confirmPasswordHasError
          }
          onClick={submit}
          style={{ margin: "2rem auto" }}
        >
          Submit
        </Button>
      </Box>
    </section>
  );
};

export default UserRegistration;
