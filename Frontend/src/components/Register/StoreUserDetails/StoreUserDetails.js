import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import styles from "./StoreUserDetails.module.css";
import { storeSecQuesAndCipherToFirestore } from "../../../services/auth";
import { useLocation, useHistory } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import randomWords from "random-words";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

/**
 * Code reused from tutorial-3 for the course CSCI-5709
 * Author: Saurabh Jayeshbhai Das <sr850847@dal.ca>
 * Link:  https://git.cs.dal.ca/sjdas/saurabh-das-csci5709/-/blob/tutorial3/src/pages/UserRegistration/UserRegistration.tsx
 * Why I used: To pull up a registration form
 */
const StoreUserDetails = () => {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const caesarCipher = (plain, key) => {
    let cipher = "";
    for (let i = 0; i < plain.length; i++) {
      cipher += String.fromCharCode(
        ((plain.charCodeAt(i) + key - 65) % 26) + 65,
      );
    }
    return cipher.toUpperCase();
  };

  const location = useLocation();
  const history = useHistory();
  let getRandomWord = randomWords({ exactly: 1, maxLength: 8 })[0];
  getRandomWord = getRandomWord.toUpperCase();
  const randomKey = Math.floor(Math.random() * 25) + 1;
  const caesarToCheck = caesarCipher(getRandomWord, randomKey);

  const [userRegisteredEmail, setUserRegisteredEmail] = useState(
    location.state.userRegisteredEmail,
  );
  const [secQues1, setSecQues1] = useState("");
  const [secAns1, setSecAns1] = useState("");
  const [secQues2, setSecQues2] = useState("");
  const [secAns2, setSecAns2] = useState("");
  const [caesarPlain, _cp] = useState(getRandomWord);
  const [caesarKey, _ck] = useState(randomKey);
  const [caesarCipherTextCheck, _cct] = useState(caesarToCheck);
  const [caesarCipherTextInput, setCaesarCipherTextInput] = useState("");
  const [caesarCipherTextInputError, setCaesarCipherTextInputError] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    let inputValue = e.target.value;

    switch (e.target.name) {
      case "secQues1":
        setSecQues1(inputValue);
        break;
      case "secAns1":
        setSecAns1(inputValue);
        break;
      case "secQues2":
        setSecQues2(inputValue);
        break;
      case "secAns2":
        setSecAns2(inputValue);
        break;
      case "caesarCipherTextInput":
        setCaesarCipherTextInput(inputValue);
        if (inputValue !== caesarCipherTextCheck) {
          setCaesarCipherTextInputError(true);
        } else {
          setCaesarCipherTextInputError(false);
        }
        break;
      default:
        break;
    }
  };

  const submit = async e => {
    console.log(e);

    try {
      // Call GCP Cloud function to store details in Firestore
      setIsLoading(true);
      const res = await storeSecQuesAndCipherToFirestore(
        userRegisteredEmail,
        secQues1,
        secAns1,
        secQues2,
        secAns2,
        caesarPlain,
      );
      // alert("Response after storing the user::", res);

      if (res) {
        setIsLoading(false);
        toast.success("Successfully registered!", {
          position: "top-center",
          autoClose: 2000,
        });

        // redirect
        history.push("/login1");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while storing data!!");
    }
  };

  return (
    <>
      {!isLoading ? (
        <section className={styles.StoreUserDetails}>
          <h1 style={{ color: "steelblue" }}>
            Welcome {userRegisteredEmail}, please enter your additional security
            info
          </h1>
          <Box
            className={styles.RegisterForm}
            component="form"
            noValidate={false}
            autoComplete="off"
          >
            <TextField
              required
              id="userRegisteredEmail"
              label="Registered email"
              variant="filled"
              className={styles.InputField}
              value={userRegisteredEmail}
              disabled
            />
            {/* Question1-Answer1*/}
            <FormControl fullWidth>
              <InputLabel id="secQues1l">Security Question 1</InputLabel>
              <Select
                labelId="secQues1l"
                id="secQues1"
                value={secQues1}
                label="secQues1"
                name="secQues1"
                onChange={handleChange}
              >
                <MenuItem value={"Your mother's maiden name?"}>
                  Your mother's maiden name?
                </MenuItem>
                <MenuItem value={"Your first car?"}>Your first car?</MenuItem>
                <MenuItem value={"Your first school's name?"}>
                  Your first school's name?
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="secAns1"
              name="secAns1"
              label="Security Answer 1"
              variant="filled"
              className={styles.InputField}
              value={secAns1}
              onChange={handleChange}
              onBlur={handleChange}
            />
            {/* Question2-Answer2*/}
            <FormControl fullWidth>
              <InputLabel id="secQues2l">Security Question 2</InputLabel>
              <Select
                labelId="secQues2l"
                id="secQues2"
                value={secQues2}
                label="secQues2"
                name="secQues2"
                onChange={handleChange}
              >
                <MenuItem value={"Your first phone number?"}>
                  Your first phone number?
                </MenuItem>
                <MenuItem value={"Your favourite subject?"}>
                  Your favourite subject?
                </MenuItem>
                <MenuItem value={"Your favourite season?"}>
                  Your favourite season?
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id="secAns2"
              name="secAns2"
              label="Security Answer 2"
              variant="filled"
              className={styles.InputField}
              value={secAns2}
              onChange={handleChange}
              onBlur={handleChange}
            />
            <TextField
              required
              id="caesarPlain"
              label="Caesar plain text"
              variant="filled"
              className={styles.InputField}
              value={caesarPlain}
              disabled
            />
            <Div>{"Store this plain text for future logins."}</Div>
            <TextField
              required
              id="caesarKey"
              label="Caesar key"
              variant="filled"
              className={styles.InputField}
              value={caesarKey}
              disabled
            />
            <TextField
              required
              id="caesarCipherTextInput"
              name="caesarCipherTextInput"
              label="Caesar cipher of the above plain text"
              variant="filled"
              className={styles.InputField}
              value={caesarCipherTextInput}
              onChange={handleChange}
              onBlur={handleChange}
            />
            <Button
              className="SubmitButton"
              variant="contained"
              disabled={caesarCipherTextInputError}
              onClick={submit}
              style={{ margin: "2rem auto" }}
            >
              Submit
            </Button>
          </Box>
        </section>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default StoreUserDetails;
