import axios from "axios";

const UPLOAD_PROFILE_URL = "/api/upload-profile";
const UPLOAD_NFT_URL = "/api/upload-nft";

export const uploadFileRequest = async (formData: FormData) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const response = await axios.post(UPLOAD_PROFILE_URL, formData, config);
  return response.data;
};

export const uploadNftRequest = async (formData: FormData) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const response = await axios.post(UPLOAD_NFT_URL, formData, config);
  return response.data;
};
