import axios from "axios";

export const GET_POST_REQUEST = "GET_POST_REQUEST";
const getPostRequest = () => {
  return { type: GET_POST_REQUEST };
};
