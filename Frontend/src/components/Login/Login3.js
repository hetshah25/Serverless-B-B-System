import React, { useState, useEffect } from "react";
import { verifyCaesarCipher } from "../../services/login";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import "../../App.css";
import { logUserLoginActivity } from "../../services/login";

export default function Login3() {
  const location = useLocation();
  const user = location.state.user;
  const history = useHistory();
  const randomKey = Math.floor(Math.random() * 25) + 1;

  const [emailId, _e] = useState(user.emailId);
  const [accessToken, _a] = useState(user.accessToken);
  const [firstName, _f] = useState(user.firstName);
  const [lastName, _l] = useState(user.lastName);
  const [customerNo, _cn] = useState(user.customerNo);
  const [caesarPlain, _cp] = useState(user.caesarPlain);
  const [caesarKey, _ck] = useState(randomKey);
  const [isAdmin, _ia] = useState(user.isAdmin);

  const [caesarCipherInput, setCaesarCipherInput] = useState("");
  const [caesarCipherInputError, setCaesarCipherInputError] = useState("");
  const [caesarCipherInputHasError, setCaesarCipherInputHasError] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const responseFromVerifyCipher = await verifyCaesarCipher(
        caesarPlain,
        caesarKey,
        caesarCipherInput,
      );

      if (responseFromVerifyCipher) {
        setIsLoading(false);
        console.log("responseFromVerifyCipher", responseFromVerifyCipher);

        toast.success("Caesar verified", {
          position: "top-center",
          autoClose: 800,
        });

        setTimeout(() => {
          toast.info("Taking you to our amazing app.....", {
            position: "top-center",
            autoClose: 1200,
          });
        }, 1500);

        setTimeout(async () => {
          // redirect and store this to local storage
          const user = {
            emailId,
            accessToken,
            firstName,
            lastName,
            customerNo,
            isAdmin,
          };
          console.log("user", user);
          localStorage.setItem("authenticatedUser", JSON.stringify(user));

          const resFromLoginStat = await logUserLoginActivity(user.emailId);

          // Call API for storing user session
          if (isAdmin === "yes") {
            // setAuthenticatedAs(1);
            // history.push("/admin-dashboard");
            document.location.replace("/admin-dashboard");
          } else {
            // setAuthenticatedAs(2);
            // history.push("/");
            document.location.replace("/");
          }
        }, 1800);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        "Caesar plain text incorrectly ciphered!\nPlease try again!",
        {
          position: "top-center",
          autoClose: 5000,
        },
      );
    }
  };

  const handleChange = e => {
    let inputValue = e.target.value;

    switch (e.target.name) {
      case "caesarCipherInput":
        inputValue = inputValue.toUpperCase();
        setCaesarCipherInput(inputValue);

        if (inputValue === "") {
          setCaesarCipherInputError("Cipher text cannot be empty");
          setCaesarCipherInput(inputValue);
          setCaesarCipherInputHasError(true);
        } else {
          setCaesarCipherInput(inputValue);
          setCaesarCipherInputError("");
          setCaesarCipherInputHasError(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="text-center m-5-auto">
          <h2>Sign in - Step 3.</h2>
          <form>
            <div>
              <label style={{ fontWeight: "bold", textAlign: "center" }}>
                Encrypt the plain we provided you during registration using the
                key:
              </label>
              <br />
              <code style={{ fontSize: "4rem" }}>{caesarKey}</code>
              <br />
            </div>
            <br />
            <div>
              <label style={{ fontWeight: "bold" }}>Cipher Text:</label> <t></t>
              <input
                type="text"
                name="caesarCipherInput"
                value={caesarCipherInput}
                onChange={handleChange}
                onBlur={handleChange}
                required
              />
              {caesarCipherInputError && (
                <div
                  style={{
                    position: "relative",
                    color: "rgb(245, 85, 85)",
                  }}
                >
                  {caesarCipherInputError}
                </div>
              )}
            </div>
            <br />
            <div>
              <button
                id="sub_btn"
                onClick={submit}
                disabled={caesarCipherInputHasError}
              >
                Verify Cipher
              </button>
            </div>
          </form>
          <footer>
            <div>
              Don't have an account?{" "}
              <Link to="/register">Register First !</Link>.
            </div>
            <div>
              <Link to="/">Back to Home</Link>.
            </div>
          </footer>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
