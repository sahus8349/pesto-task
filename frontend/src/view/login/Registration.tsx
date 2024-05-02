import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Formik, Form, ErrorMessage } from "formik";
import { useCookies } from 'react-cookie';
import {
  inputChangeHandler,
  selectChangeHandler,
} from "../../CommonFunctions";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import TextInput from "../../components/TextInput/TextInput";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import {
  RegistrationInputFiled as InputFiled,
  doRegistration,
  fetchCountries,
  fetchPicode,
  registrationValidationSchema as validationSchema,
} from "./LoginFunction";
import { Link } from "react-router-dom";
import { Dropdown, SelectOption } from "../../components/DropDown/DropDown";
import RadioButton from "../../components/Radio button/RadioButton";

const Registration = () => {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const [cookie,setCookie] = useCookies(['incident_session_token']);

  const formData: InputFiled = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    country_code: "",
    mobile: "",
    fax: "",
    phone: "",
    password: "",
    password_confirmation: "",
    user_type: ""
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFromSubmiting, setIsFromSubmiting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [reCaptchaToken, setReCaptchaToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(true);
  const [countriesData, setCountriesData] = useState<SelectOption[]>([]);
  const [countriesDialData, setCountriesDialData] = useState<SelectOption[]>([]);

  useEffect(()=>{
    if(isLoading){
      loadCountries();
    }
  },[isLoading]);

  const loadCountries = async() => {
    const data = await fetchCountries();
    for(const i in data){
      var option = {
        label:data[i]["name"]["common"],
        value:data[i]["cca2"]
      };
      countriesData.push(option)

      var option2 = {
        label: data[i]["name"]["common"]+" ("+data[i]["idd"]["root"]+data[i]["idd"]["suffixes"][0]+")",
        value:data[i]["idd"]["root"]+data[i]["idd"]["suffixes"][0]
      };
      countriesDialData.push(option2);
    }

    setCountriesData(countriesData);
    setCountriesDialData(countriesDialData);
    setIsLoading(false);
  }

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
      <div className="mt-5 mb-5 px-5 bg-white h-auto w-[35rem]">  
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
                      <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-8">
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            First Name
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="first_name"
                            id="first_name"
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "first_name",
                                formData: values,
                              });
                            }}
                            placeholder="Enter First Name"
                            type="text"
                            value={values["first_name"]}
                          />
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Last Name
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="last_name"
                            id="last_name"
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "last_name",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Last Name"
                            type="text"
                            value={values["last_name"]}
                          />
                          <ErrorMessage
                            name="last_name"
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
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Address
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="address"
                            id="address"
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "address",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Address"
                            type="text"
                            value={values["address"]}
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 mt-4 sm:grid-cols-1 gap-x-8">
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Country
                            <span className="text-primary-100">*</span>
                          </label>
                          <Dropdown
                            name="country"
                            id="country"
                            options={countriesData}
                            isClearable={false}
                            onChange={async (value:SelectOption | SelectOption[] | null) => {
                              selectChangeHandler(value, {
                                setValues: setValues,
                                key: "country",
                                formData: values,
                              });

                              const data = await fetchPicode(values['pincode'],values['country']);

                              if(data.status === true){
                                inputChangeHandler(data["result"][0]["state"], {
                                  setValues: setValues,
                                  key: "state",
                                  formData: values,
                                });
                                inputChangeHandler(data["result"][0]["district"], {
                                  setValues: setValues,
                                  key: "city",
                                  formData: values,
                                });
                              }else{
                                inputChangeHandler("", {
                                  setValues: setValues,
                                  key: "state",
                                  formData: values,
                                });
                                inputChangeHandler("", {
                                  setValues: setValues,
                                  key: "city",
                                  formData: values,
                                });
                              }
                            }}
                            placeholder="Select Country"
                            type="box"
                            defaultValue={null}
                            isLoading={isLoading}
                          />
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            State
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="state"
                            id="state"
                            onChange={() => {
                              
                            }}
                            placeholder="Enter State"
                            type="text"
                            value={values["state"]}
                            disabled={true}
                          />
                          <ErrorMessage
                            name="state"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 mt-4 sm:grid-cols-1 gap-x-8">
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            City
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="city"
                            id="city"
                            onChange={() => {
                            }}
                            placeholder="Enter City"
                            type="text"
                            value={values["city"]}
                            disabled={true}
                          />
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Pincode
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="pincode"
                            id="pincode"
                            onChange={async (event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "pincode",
                                formData: values,
                              });

                              const data = await fetchPicode(event.target.value,values['country']);

                              if(data.status === true){
                                inputChangeHandler(data["result"][0]["state"], {
                                  setValues: setValues,
                                  key: "state",
                                  formData: values,
                                });
                                inputChangeHandler(data["result"][0]["district"], {
                                  setValues: setValues,
                                  key: "city",
                                  formData: values,
                                });
                              }else{
                                inputChangeHandler("", {
                                  setValues: setValues,
                                  key: "state",
                                  formData: values,
                                });
                                inputChangeHandler("", {
                                  setValues: setValues,
                                  key: "city",
                                  formData: values,
                                });
                              }
                            }}
                            placeholder="Enter Pincode"
                            type="text"
                            value={values["pincode"]}
                          />
                          <ErrorMessage
                            name="pincode"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 mt-4 sm:grid-cols-1 gap-x-8">
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Country Dail Code
                            <span className="text-primary-100">*</span>
                          </label>
                          <Dropdown
                            name="country_code"
                            id="country_code"
                            options={countriesDialData}
                            isClearable={false}
                            onChange={(value:SelectOption | SelectOption[] | null) => {
                              selectChangeHandler(value, {
                                setValues: setValues,
                                key: "country_code",
                                formData: values,
                              });
                            }}
                            placeholder="Select Country Dail Code"
                            type="box"
                            defaultValue={null}
                            isLoading={isLoading}
                          />
                          <ErrorMessage
                            name="country_code"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Mobile Number
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="mobile"
                            id="mobile"
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "mobile",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Mobile Number"
                            type="text"
                            value={values["mobile"]}
                          />
                          <ErrorMessage
                            name="mobile"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 mt-4 sm:grid-cols-1 gap-x-8">
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Fax
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="fax"
                            id="fax"
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "fax",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Fax"
                            type="text"
                            value={values["fax"]}
                          />
                          <ErrorMessage
                            name="fax"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                        <div className="">
                          <label className="text-400 font-medium text-gray-300 block mb-2">
                            Phone Number
                            <span className="text-primary-100">*</span>
                          </label>
                          <TextInput
                            name="phone"
                            id="phone"
                            onChange={(event) => {
                              inputChangeHandler(event.target.value, {
                                setValues: setValues,
                                key: "phone",
                                formData: values,
                              });
                            }}
                            placeholder="Enter Phone Number"
                            type="text"
                            value={values["phone"]}
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="error text-error text-300 mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 mt-4 xs:mt-2">
                        <label className="text-gray-300 font-medium text-400">
                          Individual/Enterprise/Government
                          <span className="text-primary-100">*</span>
                        </label>
                        <div className="mt-2 flex gap-4">
                          <RadioButton
                            name="user_type"
                            onChange={(value) => {
                              inputChangeHandler(value, {
                                setValues: setValues,
                                key: "user_type",
                                formData: values,
                              });
                            }}
                            label="Individual"
                            value="Individual"
                            selectedValue={values["user_type"]}
                          />
                          <RadioButton
                            name="user_type"
                            onChange={(value) => {
                              inputChangeHandler(value, {
                                setValues: setValues,
                                key: "user_type",
                                formData: values,
                              });
                            }}
                            label="Enterprise"
                            value="Enterprise"
                            selectedValue={values["user_type"]}
                          />
                          <RadioButton
                            name="user_type"
                            onChange={(value) => {
                              inputChangeHandler(value, {
                                setValues: setValues,
                                key: "user_type",
                                formData: values,
                              });
                            }}
                            label="Government"
                            value="Government"
                            selectedValue={values["user_type"]}
                          />
                        </div>
                        <ErrorMessage
                          name="user_type"
                          component="div"
                          className="error text-error text-300 mt-1"
                        />
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
