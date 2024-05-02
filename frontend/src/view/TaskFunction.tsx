import * as Yup from "yup";
import {
  showConfirm,
  showToastAlert,
  callFetch,
  unsetAssocciativeArray
} from "../CommonFunctions";

const controller = new AbortController();
let TaskController:any;
let enumsController:any;
let TaskShowController:any;

export interface InputFiled {
  title: any;
  description: any;
  status: any;
}

export const ErrorMessages: InputFiled = {
  title: "",
  description: "",
  status: "",
};

export async function fetchTask(params:any) {
  let queryString = "";
  queryString = params[0] !== undefined ? "search=" + params[0] : "";
  queryString +=
    params["sort_by"] !== undefined && queryString !== "" ? "&" : "";
  queryString +=
    params["sort_by"] !== undefined ? "sort_by=" + params["sort_by"] : "";
  queryString +=
    params["page"] !== undefined && queryString !== "" ? "&" : "";
  queryString +=
    params["page"] !== undefined ? "page=" + params["page"] : "";

  if(TaskController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await TaskController.abort(reason);
  }

  TaskController = new AbortController();

  return await callFetch({
    url:
      import.meta.env.VITE_API_URL +
      "tasks?" + queryString,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    controller: TaskController,
    callback: async (json) => {
      return json;
    },
  });
}

export async function fetchEnums() {
  if(enumsController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await enumsController.abort(reason);
  }

  enumsController = new AbortController();

  return await callFetch({
    url:
      import.meta.env.VITE_API_URL +
      "tasksEnums",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    controller: enumsController,
    callback: async (json) => {
      return json;
    },
  });
}

export async function fetchTaskShow(task_id:number) {
  if (task_id !== undefined && task_id != 0) {
    if(TaskShowController){
      const reason = new DOMException('signal timed out', 'TimeoutError');
      await TaskShowController.abort(reason);
    }

    TaskShowController = new AbortController();

    return await callFetch({
      url:
        import.meta.env.VITE_API_URL +
        "tasks/" + task_id,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      controller: TaskShowController,
      callback: async (json) => {
        return json;
      },
    });
  }

  return { status: "success" };
}

export const confirmDeleteTask = async (
  id: BigInteger,
  setTasksData: any,
  TasksData:any,
) => {
  await showConfirm({
    title: "Are you sure you want to delete this task?",
    message: "The task information will be deleted and can’t be undone. Click Yes, if you still want to continue.",
    type: "warning",
    confirm: async () => {
      await deleteTask(id, setTasksData,TasksData);
    },
    cancel: () => {},
  });
};

const deleteTask = async (
  id: BigInteger,
  setTasksData: any,
  TasksData:any
) => {
  return await callFetch({
    url: import.meta.env.VITE_API_URL + "tasks/" + id,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    controller: controller,
    callback: async (json) => {
      if (json.status == "success") {
        showToastAlert(json.message, 1);
        setTasksData({
          ...TasksData,
          data:unsetAssocciativeArray(TasksData["data"], "id", id)
        });
      } else {
        showToastAlert(json.message);
      }
      return json;
    },
  });
};

export const validationSchema = Yup.object({
    title: Yup.string()
    .required("Task is required")
    .min(3, "Too Short!")
    .max(254, "Too Long!"),
    description: Yup.string()
    .required("Task type is required"),
    status: Yup.string()
    .required("Status is required"),
});

export const saveTask = async (props: any) => {
  props.setIsFromSubmiting(true);
  const errorMessage = ErrorMessages;

  for(const i in errorMessage){
    errorMessage[i as keyof InputFiled] = "";
  }

  let url = import.meta.env.VITE_API_URL + "tasks";
  url =
    props.TaskData["data"] !== undefined
      ? url + "/" + props.TaskData["data"].id
      : url;

  const urlencoded = new URLSearchParams();
  for (const i in props.formData) {
    urlencoded.append(i, props.formData[i as keyof InputFiled]);
  }

  return await callFetch({
    url: url,
    method: props.TaskData["data"] !== undefined ? "PUT" : "POST",
    body: urlencoded,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    controller: controller,
    callback: async (json: any) => {
      props.setIsFromSubmiting(false);

      if (json.status == "success") {
        showToastAlert(json.message,1);
        props.navigate('/');
      } else if (json.status == "error" && json.error == "validation_errors") {
        for (const name in json.validation_errors) {
          errorMessage[name as keyof InputFiled] =
            json.validation_errors[name][0];
        }

        props.setErrorMessage(errorMessage);
      } else {
        showToastAlert(json.message);
      }

      return json;
    },
  });
};
