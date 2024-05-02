import { useCallback,useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Formik, Form, ErrorMessage } from "formik";
import {
  inputChangeHandler,
  ShowPageLoader,
  HidePageLoader
} from "../../CommonFunctions";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import TextInput from "../../components/TextInput/TextInput";
import Spinner from "../../components/Spinner/Spinner";
import {
  InputFiled,
  sendLink,
  validationForgotPassordSchema
} from "./LoginFunction";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formData: InputFiled = {
    email: "",
  };

  const [isFromSubmiting, setIsFromSubmiting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [reCaptchaToken, setReCaptchaToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(true);

  useEffect(()=>{
    if(refreshReCaptcha){
      setTokenFunc();
    }
  },[refreshReCaptcha,executeRecaptcha]);

  const setTokenFunc = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('Login');

    setReCaptchaToken(token);
    setRefreshReCaptcha(false);
  },[executeRecaptcha]);

  const submitHandler = async (values: InputFiled, { setErrors }: any) => {
    await sendLink({
      setIsFromSubmiting: setIsFromSubmiting,
      formData: values,
      setErrorMessage: setErrors,
      setIsSuccess: setIsSuccess,
      setRefreshReCaptcha:setRefreshReCaptcha,
      reCaptchaToken:reCaptchaToken,
    });
  };

  return (
    <div className="min-h-screen h-auto flex flex-col bg-gray-600 items-center">
      <div className="mt-32 p-10 bg-white h-92 w-92">  
        <div className="h-full grid">
          {!isSuccess?
            <section className="">
              <div className="tip-wrapper">
                <Typography className="my-5" variant="h4">
                  Reset your password!<br></br>
                </Typography>
                <Formik
                  initialValues={formData}
                  validationSchema={validationForgotPassordSchema}
                  onSubmit={submitHandler}
                >
                  {({ setValues, values }) => (
                    <Form>
                      <div className="grid grid-cols-1">
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Email Address
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="email"
                            id="email"
                            onChange={(event) => {
                              setEmail(event.target.value);
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "email",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Email Address"
                            type="text"
                            value={values["email"]}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                        <div className="mt-2">
                          <Button
                            type="submit"
                            label={
                              isFromSubmiting ? (
                                <Spinner labal="Processing..." />
                              ) : (
                                "Send Password Reset Link"
                              )
                            }
                            isDisabled={isFromSubmiting}
                            variant="primary"
                            size="large"
                            className={`w-full ${!isFromSubmiting?"!block":""}`}
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <Typography variant="p">
                            <Link to="/login" className="text-blue-100">Login</Link>
                          </Typography>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </section>
          :
            <section className="">
              <div className="tip-wrapper animate__animated animate__fadeIn">
                <div className="flex justify-center content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#c8e6c9" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path>
                    <polyline fill="none" stroke="#4caf50" stroke-miterlimit="10" stroke-width="4" points="14,24 21,31 36,16"></polyline>
                  </svg>
                </div>
                <Typography className="my-5 text-green-100" variant="h4">
                  A fresh verification link has been sent to your email address<br/>
                  Before proceeding, please check your email for a verification link.<br />
                  If you did not receive the email <a href="#" onClick={async ()=>{
                    ShowPageLoader();
                    await sendLink({
                      setIsFromSubmiting: setIsFromSubmiting,
                      formData: {"email":email},
                      setIsSuccess: setIsSuccess,
                    });
                    HidePageLoader();
                  }} className="text-blue-100" >click here</a> to request another.
                </Typography>
              </div>
            </section>
          }
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
