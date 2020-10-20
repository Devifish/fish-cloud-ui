import Axios from "@/library/axios";

const BASE_URL = "https://api.github.com";
const TOKEN = `token ${process.env.VUE_APP_GITHUB_TOKEN}`;
const OWNER = "Devifish";
const REPO = "fish-cloud-ui";

export default {
  getLastCommits(size: number) {
    return Axios.get(`${BASE_URL}/repos/${OWNER}/${REPO}/commits`, {
      withCredentials: false,
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: TOKEN
      },
      params: {
        per_page: size
      }
    });
  }
};
