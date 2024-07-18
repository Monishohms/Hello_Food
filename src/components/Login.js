import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../utils/Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState(true);
  const [otp, setOtp] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [verify, setVerify] = useState(false);

  const [phone, setPhone] = useState();
  console.log(phone);

  const handleOtp = () => {
    setOtp(!otp);
    appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "normal",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        const recaptchaResponse = grecaptcha.getResponse("recaptcha-container");

        signInWithPhoneNumber(auth, phone, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
          })
          .catch((error) => {
            // Error; SMS not sent
          });
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
      },
    });
  };

  const handleVerify = () => {};

  const handleForm = () => {
    setFormType(!formType);
    if (otp === true) setOtp(false);
    if (resendOtp === true) setResendOtp(false);
    if (verify === true) setVerify(false);
  };
  return (
    <div className="shadow-2xl w-2/6   m-auto  my-10 border pb-10 shadow-orange-500">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center justify-between">
          <div>
            {formType == true ? (
              <p className="font-semibold text-3xl ml-10">Sign up</p>
            ) : (
              <p className="font-semibold text-3xl ml-10">Login</p>
            )}
            <p className="text-sm ml-10 flex items-center mt-2">
              or
              <p
                className="text-orange-500 ml-1 font-semibold cursor-pointer"
                onClick={handleForm}
              >
                {formType === true
                  ? "login to your account"
                  : "create an account"}
              </p>
            </p>
          </div>

          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
            className="w-24 h-24 mt-10 mr-16"
          />
        </div>

        <div>
          <PhoneInput
            className="ml-10"
            country={"in"}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            value={phone}
            onChange={(phone) => setPhone("+" + phone)}
          />

          {formType && (
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-[60%] ml-10 mt-2 rounded-lg shadow-xl p-2 border"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-[60%] ml-10 mt-2 rounded-lg shadow-xl p-2 border"
              />

              {otp === true ? (
                <input
                  type="password"
                  placeholder="Enter OTP"
                  className="w-[60%] ml-10 mt-2 rounded-lg shadow-xl p-2 border"
                />
              ) : null}
            </div>
          )}

          {otp && (
            <button
              className="rounded-lg shadow-xl border p-2 cursor-pointer ml-10 mt-6 w-[60%] bg-orange-500 font-semibold text-white text-sm"
              onClick={handleVerify}
            >
              Verify OTP
            </button>
          )}

          {otp == true ? (
            <button className="rounded-lg shadow-xl border p-2 cursor-pointer ml-10 mt-6 w-[60%] bg-orange-500 font-semibold text-white text-sm">
              Resend OTP
            </button>
          ) : (
            <button
              className="rounded-lg shadow-xl border p-2 cursor-pointer ml-10 mt-6 w-[60%] bg-orange-500 font-semibold text-white text-sm"
              onClick={handleOtp}
            >
              Send OTP
            </button>
          )}

          <p className="text-xs ml-10 w-[60%] mt-2">
            By clicking on Login, I accept the
            <span className="text-xs font-semibold ml-1 cursor-pointer">
              Terms & Conditions & Privacy Policy
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
