import { useCallback,useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Formik, Form, ErrorMessage } from "formik";
import {
  inputChangeHandler,
} from "../../CommonFunctions";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import TextInput from "../../components/TextInput/TextInput";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import {
  InputFiled,
  resetPassword,
  validationPasswordSchema
} from "./LoginFunction";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formData: InputFiled = {
    email: params['email'],
    token: params['token'],
    password: "",
    password_confirmation: "",
  };

  const [isFromSubmiting, setIsFromSubmiting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
    await resetPassword({
      setIsFromSubmiting: setIsFromSubmiting,
      formData: values,
      setErrorMessage: setErrors,
      setIsSuccess: setIsSuccess,
      setRefreshReCaptcha:setRefreshReCaptcha,
      reCaptchaToken:reCaptchaToken,
      navigate:navigate,
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
                  Reset your password<br></br>
                </Typography>
                <Formik
                  initialValues={formData}
                  validationSchema={validationPasswordSchema}
                  onSubmit={submitHandler}
                >
                  {({ setValues, values }) => (
                    <Form>
                      <div className="grid grid-cols-1">
                        <div className="hidden">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Email Address
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="email"
                            id="email"
                            onChange={() => {
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
                        <div className="hidden">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Token
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="token"
                            id="token"
                            onChange={() => {
                            }}
                            placeholder="Enter Token"
                            type="text"
                            value={values["token"]}
                          />
                          <ErrorMessage
                            name="token"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                        <div className="mt-7">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Password 
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="password"
                            id="password"
                            icon={true}
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "password",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Password"
                            type="password"
                            value={values["password"]}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                        <div className="mt-7">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Confirm Password 
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="password_confirmation"
                            id="password_confirmation"
                            icon={true}
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "password_confirmation",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Confirm Password"
                            type="password"
                            value={values["password_confirmation"]}
                          />
                          <ErrorMessage
                            name="password_confirmation"
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
                                "Reset"
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
              <div className="tip-wrapper animate__animated animate__fadeIn text-center">
                <div className="flex justify-center content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#c8e6c9" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path>
                    <polyline fill="none" stroke="#4caf50" stroke-miterlimit="10" stroke-width="4" points="14,24 21,31 36,16"></polyline>
                  </svg>
                </div>
                <Typography className="my-5 text-green-100" variant="h4">
                  Password reset successfully.<br/><br/>
                  <Link to="/login" className="text-blue-100">Login</Link><br/>
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

export default ResetPassword;
