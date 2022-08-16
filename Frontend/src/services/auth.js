import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { POOL_DATA, STORE_SEC_QUES_CIPHER_TO_FS_URI } from "../constants";
import { getUserFromLocalStorage } from "./getUserFromLocalStorage";

const userPool = new CognitoUserPool(POOL_DATA);

export const registerUser = (firstName, lastName, email, password) => {
  const userAttributes = [];
  const firstNameAttribute = new CognitoUserAttribute({
    Name: "custom:firstName",
    Value: firstName,
  });
  const lastNameAttribute = new CognitoUserAttribute({
    Name: "custom:lastName",
    Value: lastName,
  });
  const isAdminAttribute = new CognitoUserAttribute({
    Name: "custom:isAdmin",
    Value: "no",
  });
  userAttributes.push(firstNameAttribute);
  userAttributes.push(lastNameAttribute);
  userAttributes.push(isAdminAttribute);

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, userAttributes, [], (err, res) => {
      if (err) {
        console.log("Cannot sign up!!");
        console.log(err);
        reject(err);
      } else {
        console.log("Signed up!!");
        const cognitoUser = res.user;
        const regUserName = cognitoUser.getUsername();
        console.log("cognitoUser", cognitoUser);
        console.log(`cgUser: ${cognitoUser} ;; regUsername: ${regUserName}`);

        resolve(regUserName);
      }
    });
  });
};

export const confirmRegistration = (userToBeRegistered, verificationCode) => {
  console.log("Got user to verify::", userToBeRegistered);

  return new Promise((resolve, reject) => {
    const userToVerify = {
      Username: userToBeRegistered,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userToVerify);

    cognitoUser.confirmRegistration(verificationCode, true, (err, res) => {
      if (err) {
        console.log("Cannot verify!!");
        console.log(err);
        reject(err);
      } else {
        console.log("Verified up!!");

        resolve("verified");
      }
    });
  });
};

export const storeSecQuesAndCipherToFirestore = async (
  emailId,
  secQues1,
  secAns1,
  secQues2,
  secAns2,
  caesarPlain,
) => {
  const response = await fetch(STORE_SEC_QUES_CIPHER_TO_FS_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailId,
      secQues1,
      secAns1,
      secQues2,
      secAns2,
      caesarPlain,
    }),
  });
  return response;
};

// https://github.com/aws-amplify/amplify-js/tree/main/packages/amazon-cognito-identity-js
export const loginUser = (email, password) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) =>
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken();
        console.log("User Access Token", accessToken);
        resolve({ accessToken });
      },

      onFailure: function (err) {
        reject({ message: err.message, err });
      },
    }),
  );
};

export const logoutUser = () => {
  const user = getUserFromLocalStorage();
  const userData = {
    Username: user.emailId,
    Pool: userPool,
  };
  const cognitoUser = userPool.getCurrentUser();

  localStorage.clear();
};
