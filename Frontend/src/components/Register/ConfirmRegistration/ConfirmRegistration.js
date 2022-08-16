import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import styles from "./ConfirmRegistration.module.css";
import { confirmRegistration } from "../../../services/auth";
import { useLocation, useHistory } from "react-router-dom";

/**
 * Code reused from tutorial-3 for the course CSCI-5709
 * Author: Saurabh Jayeshbhai Das <sr850847@dal.ca>
 * Link:  https://git.cs.dal.ca/sjdas/saurabh-das-csci5709/-/blob/tutorial3/src/pages/UserRegistration/UserRegistration.tsx
 * Why I used: To pull up a confirm verification code form
 */
const ConfirmRegistration = () => {
  const location = useLocation();
  const history = useHistory();

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [verificationCodeHasError, setVerificationCodeHasError] =
    useState(true);
  const [userToBeRegistered, setUserToBeRegistered] = useState(
    location.state.userToBeRegistered,
  );

  const handleChange = e => {
    let inputValue = e.target.value;

    switch (e.target.name) {
      case "verificationCode":
        if (inputValue === "") {
          setVerificationCodeError("Invalid (Cannot be empty).");
          setVerificationCode(inputValue);
          setVerificationCodeHasError(true);
        } else {
          setVerificationCode(inputValue);
          setVerificationCodeError("");
          setVerificationCodeHasError(false);
        }
        break;
      default:
        break;
    }
  };

  const submit = async e => {
    console.log(e);
    try {
      const res = await confirmRegistration(
        userToBeRegistered,
        verificationCode,
      );
      console.log(res);

      // redirect
      history.push({
        pathname: "/getAdditionalUserDetails",
        state: {
          userRegisteredEmail: userToBeRegistered,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.ConfirmRegistration}>
      {console.log("userToBeRegistered", userToBeRegistered)}
      <h1 style={{ color: "steelblue" }}>Registration Form</h1>
      <Box
        className={styles.RegisterForm}
        component="form"
        noValidate={false}
        autoComplete="off"
      >
        <TextField
          required
          id="verificationCode"
          name="verificationCode"
          label="Verification Code"
          variant="filled"
          className={styles.InputField}
          value={verificationCode}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {verificationCodeError && (
          <span
            style={{ position: "relative", bottom: "20px" }}
            className="error"
          >
            {verificationCodeError}
          </span>
        )}

        <Button
          className="SubmitButton"
          variant="contained"
          //   disabled={
          //     firstNameHasError ||
          //     lastNameHasError ||
          //     emailHasError ||
          //     passwordHasError ||
          //     confirmPasswordHasError
          //   }
          onClick={submit}
          style={{ margin: "2rem auto" }}
        >
          Submit
        </Button>
      </Box>
    </section>
  );
};

export default ConfirmRegistration;
