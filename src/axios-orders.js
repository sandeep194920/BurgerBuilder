import axios from "axios";

// axios.create  helps us create axios instance
const instance = axios.create({
  baseURL: "https://react-my-burger-664c0.firebaseio.com/"
});

export default instance;
