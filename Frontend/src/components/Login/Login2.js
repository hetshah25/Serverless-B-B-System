import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSecQuesAndCipherFromFirestore } from "../../services/login";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "../../App.css";

export default function Login2() {
  const location = useLocation();
  const user = location.state.user;
  const history = useHistory();

  const [emailId, _e] = useState(user.emailId);
  const [accessToken, _a] = useState(user.accessToken);
  const [firstName, _f] = useState(user.firstName);
  const [lastName, _l] = useState(user.lastName);
  const [customerNo, _c] = useState(user.customerNo);
  const [isAdmin, _ia] = useState(user.isAdmin);

  const [secQues1, setSecQues1] = useState("");
  const [secAns1Input, setSecAns1Input] = useState("");
  const [secAns1Check, setSecAns1Check] = useState("");

  const [secQues2, setSecQues2] = useState("");
  const [secAns2Input, setSecAns2Input] = useState("");
  const [secAns2Check, setSecAns2Check] = useState("");

  const [caesarPlain, setCaesarPlain] = useState("");

  const [isLoading, setIsLoading] = useState(
    secQues1 === "" ||
      secAns1Check === "" ||
      secQues2 === "" ||
      secAns2Check === "" ||
      caesarPlain === "",
  );

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await getSecQuesAndCipherFromFirestore(emailId);
        const { userData: userDetails } = await res.json();
        if (userDetails) {
          console.log(userDetails);
          setSecQues1(userDetails.secQues1);
          setSecAns1Check(userDetails.secAns1);
          setSecQues2(userDetails.secQues2);
          setSecAns2Check(userDetails.secAns2);
          setCaesarPlain(userDetails.caesarPlain);

          setIsLoading(prev => !prev);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, [emailId]);

  const submit = async e => {
    e.preventDefault();
    if (secAns1Input === secAns1Check && secAns2Input === secAns2Check) {
      toast.success("Security questions answered correctly!", {
        position: "top-center",
        autoClose: 500,
      });

      toast.info("Taking you to the security questions page.....", {
        position: "top-center",
        autoClose: 1000,
      });

      setTimeout(() => {
        // redirect
        history.push({
          pathname: "/login3",
          state: {
            user: {
              emailId,
              accessToken,
              firstName,
              lastName,
              customerNo,
              caesarPlain,
              isAdmin,
            },
          },
        });
      }, 1800);
    } else {
      toast.error("Answers to security questions incorrect!", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const handleChange = e => {
    let inputValue = e.target.value;

    switch (e.target.name) {
      case "secAns1Input":
        setSecAns1Input(inputValue);
        break;
      case "secAns2Input":
        setSecAns2Input(inputValue);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="text-center m-5-auto">
          <h2>Sign in - Step 2.</h2>
          <form>
            <div>
              <label style={{ fontWeight: "bold" }}>Security Question 1:</label>
              <text>{secQues1}</text>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Answer:</label> <t></t>
              <input
                type="text"
                name="secAns1Input"
                value={secAns1Input}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Security Question 2:</label>
              <text>{secQues2}</text>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Answer:</label> <t></t>
              <input
                type="text"
                name="secAns2Input"
                value={secAns2Input}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button id="sub_btn" type="submit" onClick={submit}>
                Proceed to Next Step 👉
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
