import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "./App";
import { Error404, Error500 } from "./components/Errors/Errors";
import Dashboard from "./view/Dashboard";
import Incident from "./view/Incident";
import Login from "./view/login/Login";
import ForgotPassword from "./view/login/ForgotPassword";
import ResetPassword from "./view/login/ResetPassword";
import Registration from "./view/login/Registration";

const options = {
  basename: "/",
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" errorElement={<Error500 />}>
        <Route
          path="registration"
          element={<GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY !== undefined?import.meta.env.VITE_RECAPTCHA_KEY:""}><Registration /></GoogleReCaptchaProvider>}
          errorElement={<Error500 />}
        ></Route>
        <Route
          path="login"
          element={<GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY !== undefined?import.meta.env.VITE_RECAPTCHA_KEY:""}><Login /></GoogleReCaptchaProvider>}
          errorElement={<Error500 />}
        ></Route>
        <Route
          path="forgot-password"
          element={<GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY !== undefined?import.meta.env.VITE_RECAPTCHA_KEY:""}><ForgotPassword /></GoogleReCaptchaProvider>}
          errorElement={<Error500 />}
        ></Route>
        <Route
          path="resetpassword/:token/:email"
          element={<GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY !== undefined?import.meta.env.VITE_RECAPTCHA_KEY:""}><ResetPassword /></GoogleReCaptchaProvider>}
          errorElement={<Error500 />}
        ></Route>
      </Route>
      <Route path="/" element={<App />} errorElement={<Error500 />}>
        <Route
          index
          path=""
          element={<Dashboard />}
          errorElement={<Error500 />}
        />
        <Route
          index
          path="Incident/*"
          element={<Incident />}
          errorElement={<Error500 />}
        />
        <Route
          path="*"
          element={<Error404 />}
          errorElement={<Error500 />}
        />
      </Route>
    </>,
  ),
  options,
);

export default Router;
