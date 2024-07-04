import axios from "axios";

export default axios.create({
    baseURL: "https://test.ai-softdev.com/api/v1/",
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
});