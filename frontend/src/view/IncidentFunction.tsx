import * as Yup from "yup";
import {
  showConfirm,
  showToastAlert,
  callFetch,
  unsetAssocciativeArray
} from "../CommonFunctions";

const controller = new AbortController();
let incidentController:any;
let enumsController:any;
let incidentShowController:any;

export interface InputFiled {
  incident_details: any;
  incident_type: any;
  priority: any;
  status: any;
  reported_date: any;
}

export const ErrorMessages: InputFiled = {
  incident_details: "",
  incident_type: "",
  priority: "",
  status: "",
  reported_date: ""
};

export async function fetchIncident(params:any) {
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

  if(incidentController){
    const reason = new DOMException('signal timed out', 'TimeoutError');
    await incidentController.abort(reason);
  }

  incidentController = new AbortController();

  return await callFetch({
    url:
      import.meta.env.VITE_API_URL +
      "incidents?" + queryString,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    controller: incidentController,
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
      "incidentEnums",
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

export async function fetchIncidentShow(incident_id:number) {
  if (incident_id !== undefined && incident_id != 0) {
    if(incidentShowController){
      const reason = new DOMException('signal timed out', 'TimeoutError');
      await incidentShowController.abort(reason);
    }

    incidentShowController = new AbortController();

    return await callFetch({
      url:
        import.meta.env.VITE_API_URL +
        "incidents/" + incident_id,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      controller: incidentShowController,
      callback: async (json) => {
        return json;
      },
    });
  }

  return { status: "success" };
}

export const confirmDeleteIncident = async (
  id: BigInteger,
  setIncidentsData: any,
  incidentsData:any,
) => {
  await showConfirm({
    title: "Are you sure you want to delete this incident?",
    message: "The incident information will be deleted and can’t be undone. Click Yes, if you still want to continue.",
    type: "warning",
    confirm: async () => {
      await deleteIncident(id, setIncidentsData,incidentsData);
    },
    cancel: () => {},
  });
};

const deleteIncident = async (
  id: BigInteger,
  setIncidentsData: any,
  incidentsData:any
) => {
  return await callFetch({
    url: import.meta.env.VITE_API_URL + "incidents/" + id,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    controller: controller,
    callback: async (json) => {
      if (json.status == "success") {
        showToastAlert(json.message, 1);
        setIncidentsData({
          ...incidentsData,
          data:unsetAssocciativeArray(incidentsData["data"], "id", id)
        });
      } else {
        showToastAlert(json.message);
      }
      return json;
    },
  });
};

export const validationSchema = Yup.object({
    incident_details: Yup.string()
    .required("Incident is required")
    .min(3, "Too Short!")
    .max(254, "Too Long!"),
    incident_type: Yup.string()
    .required("Incident type is required"),
    priority: Yup.string()
    .required("Priority is required"),
    status: Yup.string()
    .required("Status is required"),
    reported_date: Yup.string()
    .required("Reported date is required"),
});

export const saveIncident = async (props: any) => {
  props.setIsFromSubmiting(true);
  const errorMessage = ErrorMessages;

  for(const i in errorMessage){
    errorMessage[i as keyof InputFiled] = "";
  }

  let url = import.meta.env.VITE_API_URL + "incidents";
  url =
    props.incidentData["data"] !== undefined
      ? url + "/" + props.incidentData["data"].id
      : url;

  const urlencoded = new URLSearchParams();
  for (const i in props.formData) {
    urlencoded.append(i, props.formData[i as keyof InputFiled]);
  }

  return await callFetch({
    url: url,
    method: props.incidentData["data"] !== undefined ? "PUT" : "POST",
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
