import React, { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import { tokenUpdate } from "./Token";
import store from "./store";
import { useCookies } from "react-cookie";
import { callFetch } from "./CommonFunctions";
import { updateUser } from "./User";

interface AuthenticateProps {
  children: React.ReactNode;
}

export const Authenticate = ({ children }: AuthenticateProps) => {
  const [cookies] = useCookies(['incident_session_token']);

  const [authenticateData,setAuthenticateData] = useState();

  const location = window.location.pathname
  const pathname = location.split("/");

  let authenticateController:any = "";

  const doLogin = async () => {
    window.location.href = "/login";
  }

  const assessToken = cookies["incident_session_token"] !== undefined && cookies["incident_session_token"] !== "" && cookies["incident_session_token"] !== null?cookies["incident_session_token"]:"";
  if(assessToken === "" && pathname[1] !== "login" && pathname[1] !== "forgot-password" && pathname[1] !== "resetpassword" && pathname[1] !== "registration"){
    doLogin();
  }

  store.dispatch(
    tokenUpdate({
      token: assessToken,
    })
  );

  const authenticateToken = async () => {
    if(authenticateController){
      const reason = new DOMException('signal timed out', 'TimeoutError');
      await authenticateController.abort(reason);
    }

    authenticateController = new AbortController();
    
    const url = import.meta.env.VITE_API_URL + "authenticate";

    await callFetch({
      url: url,
      method: "GET",
      headers: {},
      controller: authenticateController,
      callback: async (json: any) => {
        store.dispatch(
          updateUser({
            name: json["data"]["first_name"]+" "+json["data"]["last_name"],
          })
        );
        setAuthenticateData(json);
      },
    });
  }

  useEffect(()=>{
    if(authenticateData === undefined && assessToken !== "" && pathname[1] !== "login" && pathname[1] !== "forgot-password" && pathname[1] !== "resetpassword" && pathname[1] !== "registration"){
      authenticateToken();
    }
  },[authenticateData]);

  return (
    <>
      {authenticateData === undefined?
        <div className="min-h-screen w-full bg-gray-400">
          <Loader />
        </div>
      :children}
    </>
  );
};

export default Authenticate;