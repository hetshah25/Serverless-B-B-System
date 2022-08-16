import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { getUser } from "../../services/login";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "../../App.css";

export default function Login1() {
  const history = useHistory();

  const [emailId, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async e => {
    setIsLoading(true);

    e.preventDefault();
    try {
      const resFromCognito = await loginUser(emailId, password);
      console.log(resFromCognito);

      if (resFromCognito) {
        setIsLoading(false);

        const resFromLogin = await getUser(emailId);
        const userData = await resFromLogin.json();
        const user = userData.user.Item;
        console.log("user after login", user);

        toast.success("Email and password authenticated", {
          position: "top-center",
          autoClose: 800,
        });

        setTimeout(() => {
          toast.info("Taking you to the security questions page.....", {
            position: "top-center",
            autoClose: 1000,
          });
        }, 1500);

        setTimeout(() => {
          // redirect;
          history.push({
            pathname: "/login2",
            state: {
              user: {
                emailId: user.emailId,
                accessToken: resFromCognito.accessToken,
                firstName: user.firstName,
                lastName: user.lastName,
                customerNo: user.customerNo,
                isAdmin: user.isAdmin,
              },
            },
          });
        }, 2200);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid login credentials", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleChange = e => {
    let inputValue = e.target.value;
    const validEmailRegex =
      /^[a-z_\.\+\-\_]+([a-z_\.\+\-\_]|[0-9])*@{1}[a-z]+\.(com|net|org|gov|co\.[a-z]{2,3}|[a-z]{2,3})$/;

    switch (e.target.name) {
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
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="text-center m-5-auto">
          <h2>Sign in - Step 1.</h2>
          <form>
            <div>
              <label>Email address</label>
              <br />
              <input
                type="text"
                name="email"
                value={emailId}
                onChange={handleChange}
                required
              />
              {emailError && (
                <div
                  style={{
                    position: "relative",
                    color: "rgb(245, 85, 85)",
                  }}
                >
                  {emailError}
                </div>
              )}
            </div>
            <div>
              <label>Password</label>
              <Link to="/forget-password">
                <label className="right-label">Forgot password?</label>
              </Link>
              <br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button id="sub_btn" onClick={submit} disabled={emailHasError}>
                Proceed to Next Step 👉
              </button>
            </div>
          </form>
          <footer>
            <p>
              Don't have an account?{" "}
              <Link to="/register">Register First !</Link>.
            </p>
            <p>
              <Link to="/">Back to Home</Link>.
            </p>
          </footer>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
