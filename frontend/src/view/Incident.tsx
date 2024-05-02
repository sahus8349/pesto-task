import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import store from "../store";
import { headerUpdate } from "../Header";
import {
  selectChangeHandler,
  inputChangeHandler,
  FetchData,
  convertParamsToArr,
} from "../CommonFunctions";
import { ErrorAPI500 } from "../components/Errors/Errors";
import Typography from "../components/Typography/Typography";
import Button from "../components/Button/Button";
import {
  Dropdown,SelectOption,
} from "../components/DropDown/DropDown";
import {
  fetchIncidentShow,
  fetchEnums,
  InputFiled,
  saveIncident,
  validationSchema
} from "./IncidentFunction";
import Spinner from "../components/Spinner/Spinner";
import Textarea from "../components/TextArea/Textarea";
import { CustomDateTimePicker } from "../components/DateTimePicker/DatePicker";
import CustomLoader from "../components/Loader/CustomLoader";

const Incident = () => {
    let paramsData = useParams();
    paramsData = convertParamsToArr(paramsData);

    let formData: InputFiled = {
        incident_details: "",
        incident_type: "",
        priority: "",
        status: "",
        reported_date: ""
    };

    const [isFromSubmiting, setIsFromSubmiting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [params] = useState<any>(paramsData);
    const [incident, setIncident] = useState<FetchData>();
    const [enumOptions, setEnumOptions] = useState<any>();
    const [FormData, setFormData] = useState<InputFiled>(formData);

    const navigate = useNavigate();

    useEffect(() => {
        formData = {
            incident_details: incident !== undefined && incident["data"] !== undefined
                ? incident["data"].incident_details
                : "",
            incident_type: incident !== undefined && incident["data"] !== undefined
                ? incident["data"].incident_type
                : "",
            priority: incident !== undefined && incident["data"] !== undefined
                ? incident["data"].priority
                : "",
            status: incident !== undefined && incident["data"] !== undefined
                ? incident["data"].status
                : "",
            reported_date: incident !== undefined && incident["data"] !== undefined
                ? incident["data"].reported_date
                : "",
        };

        setFormData(formData);

        if(incident !== undefined){
            setIsLoading(false);
        }
    }, [incident]);

    useEffect(() => {
        if(isLoading === true){
            const loadData = async () => {
                const data:FetchData = await loadEnum();
                if(data.status === "error" && data.error === "abort"){}
                else if(data.status === "success" && data.data !== undefined){
                    setEnumOptions(data.data);

                    if(params[0] !== 0 && params[0] !== 0){
                        const data1 = await loadIncident();
                        if(data1.status === "error" && data1.error === "abort"){}
                        else{
                            setIncident(data1);
                        }
                    }else{
                        setIncident({ status: "success" });
                    }
                }else{
                    setIncident({ status: "error" });
                }        
            };
        
            loadData();
        }
    },[isLoading]);

    const loadIncident = async () => {
        return await fetchIncidentShow(params[0]);
    };

    const loadEnum = async () => {
        return await fetchEnums();
    }

    const submitHandler = async (values: InputFiled, { setErrors }: any) => {
        await saveIncident({
            setIsFromSubmiting: setIsFromSubmiting,
            incidentData: incident,
            formData: values,
            setErrorMessage: setErrors,
            navigate: navigate,
        });
    };

    store.dispatch(
        headerUpdate({
            title: "Add Incident",
        })
    );

    return (
        <div>
            {isLoading === true ? (
              <div
                className={`w-full inset-0 h-screen flex items-center justify-center`}
              >
                <CustomLoader />
              </div>
            ): incident !== undefined && incident["status"] === "success" ? (
                <Formik
                initialValues={FormData}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
                >
                    {({ setValues, values }) => (
                        <Form>
                            <div className="overflow-auto h-auto min-h-[calc(100vh-8.47rem)]">
                                <div className="my-0 mx-auto w-2/3 relative border border-gray-100 rounded-lg shadow-300 bg-white">
                                    <div className="bg-gray-200 p-4">
                                        <Typography variant="h4" className="font-semibold">Details</Typography>
                                    </div>
                                    <div className="p-4">
                                        <div className="grid grid-cols-1 gap-8">
                                            <div className="">
                                                <label className="text-400 font-medium text-gray-300 block mb-2">
                                                    Incident
                                                    <span className="text-primary-100">*</span>
                                                </label>
                                                <Textarea
                                                    name="incident_details"
                                                    onChange={(event) => {
                                                        inputChangeHandler(event.target.value, {
                                                            setValues: setValues,
                                                            key: "incident_details",
                                                            formData: values,
                                                        });
                                                    }}
                                                    placeholder="Enter Incident"
                                                    value={values["incident_details"]}
                                                    className="rounded-lg"
                                                />
                                                <ErrorMessage
                                                    name="incident_details"
                                                    component="div"
                                                    className="error text-error text-300 mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8 mt-7">
                                            <div className="">
                                                <label className="text-400 font-medium text-gray-300 block mb-2">
                                                    Incident Type
                                                    <span className="text-primary-100">*</span>
                                                </label>
                                                <Dropdown
                                                    name="incident_type"
                                                    options={enumOptions !== undefined?enumOptions["incident_type_options"]:[]}
                                                    type="box"
                                                    onChange={(
                                                    value: SelectOption | SelectOption[] | null,
                                                    ) => {
                                                        selectChangeHandler(value, {
                                                            setValues: setValues,
                                                            key: "incident_type",
                                                            formData: values,
                                                        });
                                                    }}
                                                    className="custom-dropdown"
                                                    placeholder="Select"
                                                    defaultValue={enumOptions !== undefined? enumOptions["incident_type"][values.incident_type]:{}}
                                                />
                                                <ErrorMessage
                                                    name="incident_type"
                                                    component="div"
                                                    className="error text-error text-300 mt-1"
                                                />
                                            </div>
                                            <div className="">
                                                <label className="text-400 font-medium text-gray-300 block mb-2">
                                                    Priority
                                                    <span className="text-primary-100">*</span>
                                                </label>
                                                <Dropdown
                                                    name="priority"
                                                    options={enumOptions !== undefined?enumOptions["priority_options"]:[]}
                                                    type="box"
                                                    onChange={(
                                                    value: SelectOption | SelectOption[] | null,
                                                    ) => {
                                                        selectChangeHandler(value, {
                                                            setValues: setValues,
                                                            key: "priority",
                                                            formData: values,
                                                        });
                                                    }}
                                                    className="custom-dropdown"
                                                    placeholder="Select"
                                                    defaultValue={enumOptions !== undefined? enumOptions["priority"][values.priority]:{}}
                                                />
                                                <ErrorMessage
                                                    name="priority"
                                                    component="div"
                                                    className="error text-error text-300 mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8 mt-7">
                                            <div className="">
                                                <label className="text-400 font-medium text-gray-300 block mb-2">
                                                    Status
                                                    <span className="text-primary-100">*</span>
                                                </label>
                                                <Dropdown
                                                    name="status"
                                                    options={enumOptions !== undefined?enumOptions["status_options"]:[]}
                                                    type="box"
                                                    onChange={(
                                                    value: SelectOption | SelectOption[] | null,
                                                    ) => {
                                                        selectChangeHandler(value, {
                                                            setValues: setValues,
                                                            key: "status",
                                                            formData: values,
                                                        });
                                                    }}
                                                    className="custom-dropdown"
                                                    placeholder="Select"
                                                    defaultValue={enumOptions !== undefined? enumOptions["status"][values.status]:{}}
                                                />
                                                <ErrorMessage
                                                    name="status"
                                                    component="div"
                                                    className="error text-error text-300 mt-1"
                                                />
                                            </div>
                                            <div className="">
                                                <label className="text-400 font-medium text-gray-300 block mb-2">
                                                    Reported date
                                                    <span className="text-primary-100">*</span>
                                                </label>
                                                <CustomDateTimePicker
                                                    dateFormat="YYYY-MM-DD"
                                                    name="reported_date"
                                                    onChange={(date: Date | null,value: string | null) => {
                                                        inputChangeHandler(value, {
                                                            setValues: setValues,
                                                            key: "reported_date",
                                                            formData: values,
                                                            date:date,
                                                        });
                                                    }}
                                                    placeholder="Enter"
                                                    selectedDate={values["reported_date"]}
                                                />
                                                <ErrorMessage
                                                    name="reported_date"
                                                    component="div"
                                                    className="error text-error text-300 mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-7">
                                            <Button
                                                type="submit"
                                                label={
                                                    isFromSubmiting ? (
                                                        <Spinner labal="Processing..." />
                                                    ) : (
                                                        "Save Incident"
                                                    )
                                                }
                                                isDisabled={isFromSubmiting}
                                                variant="primary"
                                                size="large"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            ):(
                <ErrorAPI500 />
            )}
        </div>
    );
};

export default Incident;
