import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Formik, Form, ErrorMessage } from "formik";
import { useCookies } from 'react-cookie';
import {
  inputChangeHandler
} from "../../CommonFunctions";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import TextInput from "../../components/TextInput/TextInput";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import {
  RegistrationInputFiled as InputFiled,
  doRegistration,
  registrationValidationSchema as validationSchema,
} from "./LoginFunction";
import { Link } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const [cookie,setCookie] = useCookies(['task_session_token']);

  const formData: InputFiled = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [isFromSubmiting, setIsFromSubmiting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [reCaptchaToken, setReCaptchaToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(true);

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
    await doRegistration({
      setIsFromSubmiting: setIsFromSubmiting,
      formData: values,
      setErrorMessage: setErrors,
      setCookie:setCookie,
      cookie:cookie,
      setIsSuccess:setIsSuccess,
      setRefreshReCaptcha:setRefreshReCaptcha,
      reCaptchaToken:reCaptchaToken,
      navigate: navigate
    });
  };

  return (
    <div className="min-h-screen h-auto flex flex-col bg-gray-600 items-center">
      <div className="mt-24 mb-5 px-5 bg-white h-auto w-[35rem]">  
        <div className="h-full grid">
          {!isSuccess?
            <section className="">
              <div className="tip-wrapper">
                <Typography className="my-5" variant="h4">
                  User Registration.
                </Typography>
                <Formik
                  initialValues={formData}
                  validationSchema={validationSchema}
                  onSubmit={submitHandler}
                >
                  {({ setValues, values }) => (
                    <Form>
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-8">
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Full Name
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="name"
                            id="name"
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "name",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Full Name"
                            type="text"
                            value={values["name"]}
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 mt-4">
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Email Address
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="email"
                            id="email"
                            onChange={(event) => {
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
                      </div>
                      <div className="grid grid-cols-1 mt-4">
                        <div>
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
                      </div>
                      <div className="grid grid-cols-1 mt-4">
                        <div>
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
                      </div>
                      <div className="grid grid-cols-1 mt-4">
                        <div className="mt-4">
                          <Button
                            type="submit"
                            label={
                              isFromSubmiting ? (
                                <Spinner labal="Processing..." />
                              ) : (
                                "Registrar"
                              )
                            }
                            isDisabled={isFromSubmiting}
                            variant="primary"
                            size="large"
                            className={`w-full ${!isFromSubmiting?"!block":""}`}
                          />
                        </div>
                        <div className="mt-4 mb-7 text-center">
                          <Typography variant="p">
                            <Link to="/login" className="text-blue-100">Already Have A Account?</Link>
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
                  Login successfully.<br/><br/>
                  <Link to="/" className="text-blue-100">Dashboard</Link><br/>
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

export default Registration;
