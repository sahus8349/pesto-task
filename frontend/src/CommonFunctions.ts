import { ShowLoader,ShowToast,ShowAlert } from "./components/Errors/Errors";
import { CustomAlert } from "./components/Alert/Alert";
import { SelectOption } from "./components/DropDown/DropDown";
import store from "./store";

export const convertParamsToArr = (params: any) => {
  if (params["*"] !== undefined && params["*"].length > 0) {
    const data = params["*"].split("/");
    for (const i in data) {
      params[i] = data[i];
    }
  }
  return params;
};

export const showToastAlert = (message: string, type?: number) => {
  type ToastType = "info" | "success" | "warning" | "error";
  let variant: ToastType;
  if (type === 1) {
    variant = "success";
  } else if (type === 2) {
    variant = "warning";
  } else if (type === 3) {
    variant = "info";
  } else {
    variant = "error";
  }

  ShowToast.fire({
    variant: variant,
    message: message,
  });
};

export const showAlert = (message: string, type?: number) => {
  type ToastType = "info" | "success" | "warning" | "error";
  let variant: ToastType;
  if (type === 1) {
    variant = "success";
  } else if (type === 2) {
    variant = "warning";
  } else if (type === 3) {
    variant = "info";
  } else {
    variant = "error";
  }

  ShowAlert.fire({
    variant: variant,
    message: message,
  });
};

export const showConfirm = (props: any) => {
  CustomAlert.fire({
    title: props.title,
    message: props.message,
    type: props.type,
    confirmText: "Yes, I am sure",
    cancelText: "No, Cancel it",
    onConfirm: async () => {
      props.confirm();
    },
    onCancel: async () => {
      props.cancel();
    },
  });
};

export const ShowPageLoader = () => {
  ShowLoader.fire();
};

export const HidePageLoader = () => {
  ShowLoader.close();
};

export const selectChangeHandler = (
  newValue: SelectOption | SelectOption[] | null,
  props: any,
) => {
  let value:any = "";
  if (newValue !== null) {
    if (Array.isArray(newValue)) {
      value = newValue.map((option) => option.value);
    } else {
      value = newValue.value;
    }
  }

  props.formData[props.key] = value;
  props.setValues(props.formData);
};

export const inputChangeHandler = (value: any, props: any) => {
  props.formData[props.key] = value;
  props.setValues(props.formData);
};

function getCookie(key:string) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export const getToken = async () => {
  const state = store.getState();
  let token = state.token.token;
  return token?token:getCookie("task_session_token");
};

export interface callFetchProps {
  url: string;
  method: string;
  controller: any;
  body?: any;
  headers?: any;
  withToken?: boolean;
  callback: (json: FetchData) => {};
}

export interface FetchData {
  status?: any | undefined;
  data?: any | undefined;
  error?: any | undefined;
  message?: any | undefined;
  meta?: any | undefined;
}

export const callFetch = async ({
  url,
  method,
  body,
  headers,
  controller,
  callback,
  withToken = true,
}: callFetchProps) => {
  headers["Accept"] = "application/json";
  if(withToken){
    headers["Authorization"] = "Bearer " + await getToken();
  }
  return await fetch(url, {
    method: method,
    body: body,
    headers: headers,
    signal: controller.signal,
  })
    .then(async (res) => res.json())
    .then(async (json) => {
      if(json.message === "Unauthenticated."){
        document.cookie = "task_session_token=";
      }else{
        return await callback(json);
      }
    })
    .catch((e) => {
      if (e !== "TimeoutError: signal timed out") {
        return {status:"error","error":"abort"};
      } else {
        return e;
      }
    });
};

export const pushArray = (array: any, arr: any) => {
  array.push(arr);
  return array;
};

export const unsetAssocciativeArray = (
  array: [],
  key: string | number,
  n: string | number | BigInteger,
) => {
  const newArray: [] = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i][key] !== n) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

export async function logout() {
  return await callFetch({
    url:
      import.meta.env.VITE_API_URL +
      "logout",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    controller: "",
    callback: async () => {
      document.cookie = "task_session_token=";
    },
  });
}