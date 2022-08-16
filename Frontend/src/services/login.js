import {
  GET_SEC_QUES_CIPHER_FROM_FS_URI,
  VERIFY_CAESAR_CIPHER_LAMBDA_URI,
  GET_USER_LAMBDA_URI,
  LOG_STATS_URI,
} from "../constants";

export const getSecQuesAndCipherFromFirestore = async emailId => {
  const response = await fetch(
    `${GET_SEC_QUES_CIPHER_FROM_FS_URI}/${emailId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

export const verifyCaesarCipher = async (
  plainText,
  key,
  userEncryptedCipherText,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(VERIFY_CAESAR_CIPHER_LAMBDA_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plainText,
          key,
          userEncryptedCipherText,
        }),
      });
      const cipherEncryptionResult = await response.json();

      if (cipherEncryptionResult.isCipheredCorrectly) {
        resolve(cipherEncryptionResult.isCipheredCorrectly);
      } else {
        reject(cipherEncryptionResult.isCipheredCorrectly);
      }
    } catch (error) {
      console.log("Error when calling the verifyCaesar lambda");
      console.log(error.message);
    }
  });
};

export const getUser = async emailId => {
  const response = await fetch(`${GET_USER_LAMBDA_URI}/${emailId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const logUserLoginActivity = async emailId => {
  const response = await fetch(LOG_STATS_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailId,
    }),
  });
  return response;
};
