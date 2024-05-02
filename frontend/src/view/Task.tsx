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
  fetchTaskShow,
  fetchEnums,
  InputFiled,
  saveTask,
  validationSchema
} from "./TaskFunction";
import Spinner from "../components/Spinner/Spinner";
import Textarea from "../components/TextArea/Textarea";
import CustomLoader from "../components/Loader/CustomLoader";
import TextInput from "../components/TextInput/TextInput";

const Task = () => {
    let paramsData = useParams();
    paramsData = convertParamsToArr(paramsData);

    let formData: InputFiled = {
        title: "",
        description: "",
        status: "",
    };

    const [isFromSubmiting, setIsFromSubmiting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [params] = useState<any>(paramsData);
    const [Task, setTask] = useState<FetchData>();
    const [enumOptions, setEnumOptions] = useState<any>();
    const [FormData, setFormData] = useState<InputFiled>(formData);

    const navigate = useNavigate();

    useEffect(() => {
        formData = {
            title: Task !== undefined && Task["data"] !== undefined
                ? Task["data"].title
                : "",
            description: Task !== undefined && Task["data"] !== undefined
                ? Task["data"].description
                : "",
            status: Task !== undefined && Task["data"] !== undefined
                ? Task["data"].status
                : ""
        };

        setFormData(formData);

        if(Task !== undefined){
            setIsLoading(false);
        }
    }, [Task]);

    useEffect(() => {
        if(isLoading === true){
            const loadData = async () => {
                const data:FetchData = await loadEnum();
                if(data.status === "error" && data.error === "abort"){}
                else if(data.status === "success" && data.data !== undefined){
                    setEnumOptions(data.data);

                    if(params[0] !== 0 && params[0] !== 0){
                        const data1 = await loadTask();
                        if(data1.status === "error" && data1.error === "abort"){}
                        else{
                            setTask(data1);
                        }
                    }else{
                        setTask({ status: "success" });
                    }
                }else{
                    setTask({ status: "error" });
                }        
            };
        
            loadData();
        }
    },[isLoading]);

    const loadTask = async () => {
        return await fetchTaskShow(params[0]);
    };

    const loadEnum = async () => {
        return await fetchEnums();
    }

    const submitHandler = async (values: InputFiled, { setErrors }: any) => {
        await saveTask({
            setIsFromSubmiting: setIsFromSubmiting,
            TaskData: Task,
            formData: values,
            setErrorMessage: setErrors,
            navigate: navigate,
        });
    };

    store.dispatch(
        headerUpdate({
            title: "Add Task",
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
            ): Task !== undefined && Task["status"] === "success" ? (
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
                                                    Task
                                                    <span className="text-primary-100">*</span>
                                                </label>
                                                <TextInput
                                                    name="title"
                                                    onChange={(event) => {
                                                        inputChangeHandler(event.target.value, {
                                                            setValues: setValues,
                                                            key: "title",
                                                            formData: values,
                                                        });
                                                    }}
                                                    placeholder="Enter Task"
                                                    value={values["title"]}
                                                    className="rounded-lg"
                                                />
                                                <ErrorMessage
                                                    name="title"
                                                    component="div"
                                                    className="error text-error text-300 mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-8 mt-7">
                                            <div className="">
                                                <label className="text-400 font-medium text-gray-300 block mb-2">
                                                    Description
                                                    <span className="text-primary-100">*</span>
                                                </label>
                                                <Textarea
                                                    name="description"
                                                    onChange={(event) => {
                                                        inputChangeHandler(event.target.value, {
                                                            setValues: setValues,
                                                            key: "description",
                                                            formData: values,
                                                        });
                                                    }}
                                                    placeholder="Enter Task"
                                                    value={values["description"]}
                                                    className="rounded-lg"
                                                />
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="error text-error text-300 mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-8 mt-7">
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
                                        </div>
                                        <div className="flex justify-end mt-7">
                                            <Button
                                                type="submit"
                                                label={
                                                    isFromSubmiting ? (
                                                        <Spinner labal="Processing..." />
                                                    ) : (
                                                        "Save Task"
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

export default Task;
