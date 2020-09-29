import Cookies from "js-cookie";

const cookies = Cookies.withAttributes({
  path: "/",
  domain: location.hostname,
  secure: location.protocol === "https",
  sameSite: "strict"
});

export default cookies;
