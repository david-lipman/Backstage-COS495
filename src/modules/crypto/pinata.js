const axios = require("axios");
// require("dotenv").config();
// const key = process.env(REACT_APP_PINATA_KEY);
// const secret = process.env(REACT_APP_PINATA_SECRET);
const key = "854ee79364ed57e3e25e";
const secret =
  "81c93d3de7f90be0c868c7408d8ae7e7c7024762bfbd36d0ab63284f79c3b1ef";

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then((response) => {
      return {
        success: true,
        metadataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const pinFiletoIPFS = async (file, name) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const fileMetadata = JSON.stringify({
    name: name,
  });

  // convert to formdata type to include in HTTP request
  let fileData = new FormData();
  fileData.append("file", file);
  fileData.append("pinataMetadata", fileMetadata);

  //make an axios post request to Pinata
  return axios
    .post(url, fileData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${fileData._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then((response) => {
      return {
        success: true,
        assetURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
