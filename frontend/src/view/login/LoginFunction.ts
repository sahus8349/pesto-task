import * as Yup from "yup";
import store from "../../store";
import { tokenUpdate } from "../../Token";
import {
  showToastAlert,
  callFetch
} from "../../CommonFunctions";

let loginController:any;
let countriesController:any;
let picodeController:any;

export interface InputFiled {
  email: any;
  password?: any;
  password_confirmation?: any;
  token?: any;
}

export interface RegistrationInputFiled {
  name: any;
  email: any;
  password: any;
  password_confirmation: any;
}

export interface InputAuthenticatFiled {
  authenticator_code: any;
  token: any;
}

export const ErrorMessages: InputFiled = {
  email: "",
  password: "",
  password_confirmation:"",
  token: "",
};

export const RegistrationErrorMessages: RegistrationInputFiled = {
  name: "", 
  email: "", 
  password: "", 
  password_confirmation: "",
};

export const AuthenticatErrorMessages: InputAuthenticatFiled = {
  authenticator_code: "",
  token: ""
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
});

export const registrationValidationSchema = Yup.object({
  name: Yup.string().min(3).max(254)
    .required("First name is required"),
  email: Yup.string().email("Please enter a valid email address")
    .required("Email address is required"),
  password: Yup.string().min(8, "Too Short!")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm password is required").oneOf([Yup.ref('password')], 'Passwords must match')
});

export const validationForgotPassordSchema = Yup.object({
  email: Yup.string()
    .required("Username is required")
});

export const validationAuthenticatSchema = Yup.object({
  authenticator_code: Yup.string()
    .required("This filed is required")
});

export const validationPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required").min(5, "Too Short!"),
  password_confirmation: Yup.string()
    .required("Confirm password is required").oneOf([Yup.ref('password')], 'Passwords must match')
});

export async function fetchCountries() {
  if(countriesController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await countriesController.abort(reason);
  }

  countriesController = new AbortController();

  return await callFetch({
    withToken:false,
    url:"https://restcountries.com/v3.1/all?fields=name,flags,cca2,idd",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    controller: countriesController,
    callback: async (json) => {
      return json;
    },
  });
}

export async function fetchPicode(postalcode:string,countrycode:string) {
  if(picodeController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await picodeController.abort(reason);
  }

  picodeController = new AbortController();

  return await callFetch({
    withToken:false,
    url:"https://api.worldpostallocations.com/pincode?postalcode="+postalcode+"&countrycode="+countrycode,
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
    },
    controller: picodeController,
    callback: async (json) => {
      return json;
    },
  });
}

export const doLogin = async (props: any) => {
  props.setIsFromSubmiting(true);
  const errorMessage = ErrorMessages;

  for(const i in errorMessage){
    errorMessage[i as keyof InputFiled] = "";
  }

  if(loginController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await loginController.abort(reason);
  }

  loginController = new AbortController();

  const url = import.meta.env.VITE_API_URL + "login";

  const urlencoded = new URLSearchParams();
  urlencoded.append('reCaptchaToken', props.reCaptchaToken);
  for (const i in props.formData) {
    urlencoded.append(i, props.formData[i as keyof InputFiled]);
  }

  return await callFetch({
    withToken:false,
    url: url,
    method: "POST",
    body: urlencoded,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    controller: loginController,
    callback: async (json: any) => {
      props.setIsFromSubmiting(false);

      if (json.status == "success") {
        let expires = new Date();
        expires.setTime(expires.getTime() + (60*60*1000))
        props.setCookie('task_session_token', json.data.token, { path: '/',  expires});

        store.dispatch(
          tokenUpdate({
            token: json.data.token,
          })
        );
        
        props.setIsSuccess(true);
        setTimeout(function (){
          props.navigate('/');
        },1000);
      } else if (json.status == "error" && json.errors !== undefined) {
        for (const name in json.errors) {
          errorMessage[name as keyof InputFiled] =
            json.errors[name][0];
        }

        props.setErrorMessage(errorMessage);
        props.setRefreshReCaptcha(true);
      } else {
        showToastAlert(json.message);
        props.setRefreshReCaptcha(true);
      }

      return json;
    },
  });
};

export const doRegistration = async (props: any) => {
  props.setIsFromSubmiting(true);
  const errorMessage = RegistrationErrorMessages;

  for(const i in errorMessage){
    errorMessage[i as keyof RegistrationInputFiled] = "";
  }

  if(loginController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await loginController.abort(reason);
  }

  loginController = new AbortController();

  const url = import.meta.env.VITE_API_URL + "register";

  const urlencoded = new URLSearchParams();
  urlencoded.append('reCaptchaToken', props.reCaptchaToken);
  for (const i in props.formData) {
    urlencoded.append(i, props.formData[i as keyof RegistrationInputFiled]);
  }

  return await callFetch({
    withToken:false,
    url: url,
    method: "POST",
    body: urlencoded,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    controller: loginController,
    callback: async (json: any) => {
      props.setIsFromSubmiting(false);
      if (json.status === "success") {
        let expires = new Date();
        expires.setTime(expires.getTime() + (60*60*1000))
        props.setCookie('task_session_token', json.data.token, { path: '/',  expires});

        store.dispatch(
          tokenUpdate({
            token: json.data.token,
          })
        );
        
        props.setIsSuccess(true);
        setTimeout(function (){
          props.navigate('/');
        },1000);
      } else if (json.errors !== undefined) {
        for (const name in json.errors) {
          errorMessage[name as keyof RegistrationInputFiled] =
            json.errors[name][0];
        }

        props.setErrorMessage(errorMessage);
        props.setRefreshReCaptcha(true);
      } else {
        showToastAlert(json.message);
        props.setRefreshReCaptcha(true);
      }

      return json;
    },
  });
};

export const sendLink = async (props: any) => {
  props.setIsFromSubmiting(true);
  const errorMessage = ErrorMessages;

  for(const i in errorMessage){
    errorMessage[i as keyof InputFiled] = "";
  }

  if(loginController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await loginController.abort(reason);
  }

  loginController = new AbortController();

  const url = import.meta.env.VITE_API_URL + "forgotpassword";

  const urlencoded = new URLSearchParams();
  urlencoded.append('reCaptchaToken', props.reCaptchaToken);
  for (const i in props.formData) {
    urlencoded.append(i, props.formData[i as keyof InputFiled]);
  }

  return await callFetch({
    withToken:false,
    url: url,
    method: "POST",
    body: urlencoded,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    controller: loginController,
    callback: async (json: any) => {
      props.setIsFromSubmiting(false);

      if (json.status == "success") {
        props.setIsSuccess(true);
      } else if (json.status == "error" && json.errors !== undefined) {
        for (const name in json.errors) {
          errorMessage[name as keyof InputFiled] =
            json.errors[name][0];
        }

        props.setErrorMessage(errorMessage);
        props.setRefreshReCaptcha(true);
      } else {
        showToastAlert(json.message);
        props.setRefreshReCaptcha(true);
      }

      return json;
    },
  });
};

export const resetPassword = async (props: any) => {
  props.setIsFromSubmiting(true);
  const errorMessage = ErrorMessages;

  for(const i in errorMessage){
    errorMessage[i as keyof InputFiled] = "";
  }

  if(loginController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await loginController.abort(reason);
  }

  loginController = new AbortController();

  const url = import.meta.env.VITE_API_URL + "resetpassword";

  const urlencoded = new URLSearchParams();
  urlencoded.append('reCaptchaToken', props.reCaptchaToken);
  for (const i in props.formData) {
    urlencoded.append(i, props.formData[i as keyof InputFiled]);
  }

  return await callFetch({
    withToken:false,
    url: url,
    method: "POST",
    body: urlencoded,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    controller: loginController,
    callback: async (json: any) => {
      props.setIsFromSubmiting(false);

      if (json.status == "success") {
        props.setIsSuccess(true);
        setTimeout(function (){
          props.navigate('/login');
        },1000);
      } else if (json.status == "error" && json.errors !== undefined) {
        for (const name in json.errors) {
          errorMessage[name as keyof InputFiled] =
            json.errors[name][0];
        }

        props.setErrorMessage(errorMessage);
        props.setRefreshReCaptcha(true);
      } else {
        showToastAlert(json.message);
        props.setRefreshReCaptcha(true);
      }

      return json;
    },
  });
};
