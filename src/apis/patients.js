import axios from "axios";

/**
 * Axios create with base URL and header configuration
 */
export default axios.create({
  baseURL: "https://lab-report-follow-up-system.el.r.appspot.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
