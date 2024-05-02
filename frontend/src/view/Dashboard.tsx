import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import {
  fetchTask,
  fetchEnums,
  confirmDeleteTask
} from "./TaskFunction";
import { FetchData, convertParamsToArr, pushArray } from "../CommonFunctions";
import { useEffect, useState } from "react";
import { EmptyData, ErrorAPI500 } from "../components/Errors/Errors";
import store from "../store";
import { headerUpdate } from "../Header";
import TaskTopbar from "./TaskTopbar";
import CustomLoader from "../components/Loader/CustomLoader";
import Tag from "../components/Tags/Tags";

const Dashboard = () => {
  let paramsData:any = useParams();
  paramsData = convertParamsToArr(paramsData);
  paramsData["sort_by"] = ["created_at", "DESC"];
  paramsData["page"] = 1;

  const [isLoadingEnums, setIsLoadingEnums] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState<Boolean>(false);
  const [TaskData, setTaskData] = useState<FetchData>();
  const [enumData, setEnumData] = useState<FetchData>();
  const [params, setParams] = useState(paramsData);
  const [searchInp, setSearchInp] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (enumData === undefined) {
      loadEunms();
    }else{
      setIsLoadingEnums(false);
    }
  }, [enumData]);

  useEffect(() => {
    if (TaskData !== undefined) {
      setIsLoading(false);
    }

    setIsLoadMore(false);
  }, [TaskData]);

  useEffect(() => {
    setIsLoadMore(true);
    loadData(false);
  }, [params]);

  useEffect(() => {
    searchTasks();
  }, [searchInp]);

  const deleteTask = async (id: BigInteger) => {
    await confirmDeleteTask(id, setTaskData,TaskData);
  };

  const loadEunms = async() => {
    const data:FetchData = await fetchEnums();
    if(data.status === "error" && data.error === "abort"){return false;}

    setEnumData(data);
  }

  const loadData = async (isLoader = true) => {
    if(isLoader){
      setIsLoading(true);
      params["page"] = 1;
    }

    const data:FetchData = await fetchTask(params);

    if(data.status === "error" && data.error === "abort"){return false;}
    
    if(TaskData !== undefined && params["page"] > 1 && data.status === "success"){
      let log = TaskData["data"];
      for(const i in data["data"]){
        log = pushArray(log,data["data"][i]);
      }
      setTaskData({
        ...TaskData,
        data:log
      });
    }else if(params["page"] === 1){
      setTaskData(data); 
    }
  };

  const setSearchInpData = (e: any) => {
    setSearchInp(e.target.value);
  };

  const searchTasks = async () => {
    if (searchInp != null && (searchInp.length >= 1 || searchInp.length <= 0)) {
      setIsLoading(true);
      setParams({
        ...params,
        page:1,
        0: searchInp,
      });
    }
  };

  const events = {
    loadData: loadData,
    setIsLoadMore:setIsLoadMore,
    setParams:setParams,
    deleteEvent: deleteTask,
    setSearchInpData:setSearchInpData,
    searchTasks:searchTasks,
  };

  store.dispatch(
    headerUpdate({
        title: "Tasks",
    })
  );

  return (
    <div className="pt-1 px-8">
      <div className="mt-3 relative border border-gray-100 rounded-md shadow-300">
        <div className="">
          <div className={`bg-white rounded-e-md overflow-y-hidden overflow-x-hiddin`}>
            {isLoadingEnums === true ? (
              <div
                className={`w-full inset-0 h-screen flex items-center justify-center`}
              >
                <CustomLoader />
              </div>
            ):enumData !== undefined && enumData["status"] === "success"?(
              <>
                <TaskTopbar
                  params={params}
                  setIsLoading={setIsLoading}
                  events={events}
                />
                <div className="-mt-1">
                  {isLoading === true ? (
                    <TaskLoader />
                  ) : TaskData !== undefined &&
                    TaskData["status"] === "success" ? (
                      <TaskItem 
                        TaskData={TaskData} 
                        enumData={enumData?.data}
                        isLoadMore={isLoadMore} 
                        params={params} 
                        events={events}
                      />
                  ) : TaskData !== undefined &&
                    TaskData["status"] === "error" &&
                    TaskData["error"] === "404" ? (
                        <EmptyData heading={"Task not added"} btnTitle="Add Task" btnAction={()=>{
                            navigate('/Task');
                        }} />
                  ) : (
                    <ErrorAPI500 />
                  )}
                </div>
              </>
            ):(
              <ErrorAPI500 />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskItem = (prop:any) => {
  const TaskData = prop.TaskData;
  const enumData = prop.enumData;
  const events = prop.events;
  const isLoadMore = prop.isLoadMore;
  const params = prop.params;
  const navigate = useNavigate();

  return (
    <div className="overflow-auto h-[calc(100vh-15.25rem)] bg-white">
      <table className="w-full">
        <thead className="sticky left-0 top-0 z-[1]">
          <tr>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left ps-8">SR. NO.</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Title</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Status</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Created By</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {TaskData["data"].map((item: any, idx: any) => (
            <tr key={idx}>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300 ps-8">{idx+1}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">{item.title}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">
                {item.status?
                  <Tag type={item.status === "To_Do"?"secondary":item.status === "IN_PROGRESS"?"blue":item.status === "DONE"?"success":"default"} text={enumData["status"][item.status]["label"]} />
                :""}
              </td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">{item.user.name}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">
                <div className="flex justify-start items-center gap-1">
                  <Button
                    label="Edit"
                    onClick={() => navigate('/task/'+item.id)}
                    size="small"
                    variant="primary"
                  />
                  <div className="border-x border-gray-100 h-8"></div>
                  <Button
                    type="button"
                    label="Delete"
                    variant="outline"
                    size="small"
                    onClick={() => {
                      events.deleteEvent(item.id);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td className="border-0" colSpan={13}>
              <div className="flex w-100 justify-center text-center items-center align-middle mt-5">
                {isLoadMore?(
                  <div className="flex mt-2">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="duration-200 animate-pulse-3"
                    >
                      <circle cx="12" cy="6" r="6" fill="#0080ff" />
                    </svg>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="duration-300 animate-pulse-2"
                    >
                      <circle cx="12" cy="6" r="6" fill="#0080ff" />
                    </svg>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="duration-400 animate-pulse"
                    >
                      <circle cx="12" cy="6" r="6" fill="#0080ff" />
                    </svg>
                  </div>
                ):(
                  params['page'] < TaskData.meta.last_page?
                    <button
                      className="text-200 font-bold text-blue-500 border-b inline-block"
                      onClick={()=>{
                        events.setParams({
                          ...params,
                          page:params["page"]+1
                        });
                      }}
                    >
                      <span className="">Load More</span>
                    </button>
                  :""
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TaskLoader = () => {
  return (
    <div className="overflow-auto h-[calc(100vh-15.25rem)] bg-white">
      <table className="w-full">
        <thead className="sticky left-0 top-0">
          <tr>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left ps-8">SR. NO.</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Title</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Status</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Created By</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 7 }).map((idx: any) => (
            <tr key={idx}>
              {Array.from({ length: 5 }).map((id: any) => (
                <td key={id} className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300 ps-8">
                  <div className="animate-pulse">
                    <div className="flex-1 space-y-6">
                      <div className="h-5 bg-gray-100 rounded" />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
