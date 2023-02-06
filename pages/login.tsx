import React, { useState, useEffect } from "react";
import MyHead from "../components/custom/head";
import Main from "../components/custom/main";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Alert from "../components/custom/elements/alert";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [otp, setOtp] = useState(null);
  const [isOtp, setIsOtp] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  /*
  useEffect(() => {
    let localJWT = localStorage.getItem("jwt");
    setLoading(true);
    let validateJwtFD = new FormData();
    validateJwtFD.append("public_api_key", process.env.PUBLIC_API_KEY);
    validateJwtFD.append("jwt", localJWT);
    axios({
      url:
        process.env.SERVER_DOMAIN +
        process.env.RAD_API_BREAKPOINT +
        "check-jwt",
      method: "post",
      data: validateJwtFD,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        if (res.data) router.push("/panel/dashboard");
      })
      .catch((err) =>
        console.log(
          "Error validate jwt: " +
            localJWT +
            "and errr code: " +
            err.response.data.message
        )
      )
      .then(() => setLoading(false));
  }, []);
  */

  const validateEmail = (mail) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail);
  };

  const loginWithPassword = () => {
    setLoading(true);
    console.log("loading...");

    let fd = new FormData();
    fd.append("login", email);
    fd.append("password", password);
    fd.append("public_api_key", process.env.PUBLIC_API_KEY);

    axios({
      method: "post",
      url:
        process.env.SERVER_DOMAIN +
        process.env.RAD_API_BREAKPOINT +
        "login-with-password",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          localStorage.setItem("jwt", res.data);
          router.push("/panel/dashboard");
        }
      })
      .catch((err) => console.log("Error: "))
      .then(() => {
        setLoading(false);
        console.log("loading stopped...");
      });
  };

  const sendOtp = () => {
    if (!validateEmail(email)) {
      console.log("email is wrong");
      return;
    }

    let fd = new FormData();
    fd.append("email", email);
    fd.append("public_api_key", process.env.PUBLIC_API_KEY);

    setLoading(true);
    axios({
      method: "post",
      url:
        process.env.SERVER_DOMAIN +
        process.env.RAD_API_BREAKPOINT +
        "send-mail-otp",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log(res.data);
        }
      })
      .catch((err) => console.log("Error: "))
      .then(() => {
        setLoading(false);
        console.log("loading stopped...");
      });
  };

  const loginWithOTP = () => {
    if (!validateEmail(email)) {
      console.log("email is wrong");
      return;
    }

    let fd = new FormData();
    fd.append("email", email);
    fd.append("otp", otp);
    fd.append("public_api_key", process.env.PUBLIC_API_KEY);

    setLoading(true);
    axios({
      method: "post",
      url:
        process.env.SERVER_DOMAIN +
        process.env.RAD_API_BREAKPOINT +
        "login-with-mail-otp",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log(res.data);
        }
      })
      .catch((err) => console.log("Error: " + err?.response?.data?.message))
      .then(() => {
        setLoading(false);
        console.log("loading stopped...");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Alert />
      <div className="w-8/12 md:w-3/12">
        <div>
          <label class="block">
            <input
              type="email"
              name="email"
              class="mt-1 mb-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isOtp && (
              <input
                type="password"
                name="password"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
            {isOtp && (
              <input
                type="number"
                name="otp"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Enter code here"
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
          </label>
          <div className="my-2">
            <span
              onClick={() => setIsOtp(!isOtp)}
              className="text-sm hover:cursor-pointer"
            >
              {isOtp ? "Login with Password" : "Login with OTP"}
            </span>
          </div>
          {!isOtp && (
            <button
              type="button"
              onClick={loginWithPassword}
              className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          )}
          {isOtp && (
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={loginWithOTP}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>

              <button
                type="button"
                onClick={sendOtp}
                className="bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Send Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
