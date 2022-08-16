const generateCaesarCipherText = (plainText, key) => {
  plainText = plainText.toUpperCase();
  let cipherText = "";

  for (let i = 0; i < plainText.length; i++) {
    cipherText += String.fromCharCode(
      ((plainText.charCodeAt(i) + key - 65) % 26) + 65,
    );
  }

  return cipherText.toUpperCase();
};

const verifyCaesarCipher = async (req, res) => {
  const { plainText, key, userEncryptedCipherText } = req.body;
  let cipherText = generateCaesarCipherText(plainText, key);

  if (cipherText === userEncryptedCipherText)
    res.json({
      message: "Nicely encrypted!!",
      txt: cipherText + ":" + userEncryptedCipherText,
      isCipheredCorrectly: true,
    });
  else
    res.json({
      message: "Didn't encrypt!!",
      txt: cipherText + ":" + userEncryptedCipherText,
      isCipheredCorrectly: false,
    });
};

module.exports = {
  verifyCaesarCipher,
};
