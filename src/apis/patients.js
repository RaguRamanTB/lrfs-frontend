import axios from "axios";

/**
 * Axios create with base URL and header configuration
 */
export default axios.create({
  baseURL: "http://labreportfollowupsystem-env.eba-rys6r3jq.ap-south-1.elasticbeanstalk.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
