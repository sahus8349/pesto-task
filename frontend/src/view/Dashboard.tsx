import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import {
  fetchIncident,
  fetchEnums,
  confirmDeleteIncident
} from "./IncidentFunction";
import { FetchData, convertParamsToArr, pushArray } from "../CommonFunctions";
import { useEffect, useState } from "react";
import { EmptyData, ErrorAPI500 } from "../components/Errors/Errors";
import store from "../store";
import { headerUpdate } from "../Header";
import IncidentTopbar from "./IncidentTopbar";
import CustomLoader from "../components/Loader/CustomLoader";
import moment from 'moment';

const Dashboard = () => {
  let paramsData:any = useParams();
  paramsData = convertParamsToArr(paramsData);
  paramsData["sort_by"] = ["created_at", "DESC"];
  paramsData["page"] = 1;

  const [isLoadingEnums, setIsLoadingEnums] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState<Boolean>(false);
  const [incidentData, setIncidentData] = useState<FetchData>();
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
    if (incidentData !== undefined) {
      setIsLoading(false);
    }

    setIsLoadMore(false);
  }, [incidentData]);

  useEffect(() => {
    setIsLoadMore(true);
    loadData(false);
  }, [params]);

  useEffect(() => {
    searchIncidents();
  }, [searchInp]);

  const deleteincident = async (id: BigInteger) => {
    await confirmDeleteIncident(id, setIncidentData,incidentData);
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

    const data:FetchData = await fetchIncident(params);

    if(data.status === "error" && data.error === "abort"){return false;}
    
    if(incidentData !== undefined && params["page"] > 1 && data.status === "success"){
      let log = incidentData["data"];
      for(const i in data["data"]){
        log = pushArray(log,data["data"][i]);
      }
      setIncidentData({
        ...incidentData,
        data:log
      });
    }else if(params["page"] === 1){
      setIncidentData(data); 
    }
  };

  const setSearchInpData = (e: any) => {
    setSearchInp(e.target.value);
  };

  const searchIncidents = async () => {
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
    deleteEvent: deleteincident,
    setSearchInpData:setSearchInpData,
    searchIncidents:searchIncidents,
  };

  store.dispatch(
    headerUpdate({
        title: "Incidents",
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
                <IncidentTopbar
                  params={params}
                  setIsLoading={setIsLoading}
                  events={events}
                />
                <div className="-mt-1">
                  {isLoading === true ? (
                    <IncidentLoader />
                  ) : incidentData !== undefined &&
                    incidentData["status"] === "success" ? (
                      <IncidentItem 
                        incidentData={incidentData} 
                        enumData={enumData?.data}
                        isLoadMore={isLoadMore} 
                        params={params} 
                        events={events}
                      />
                  ) : incidentData !== undefined &&
                    incidentData["status"] === "error" &&
                    incidentData["error"] === "404" ? (
                        <EmptyData heading={"Incident not added"} btnTitle="Add Incident" btnAction={()=>{
                            navigate('/incident');
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

const IncidentItem = (prop:any) => {
  const incidentData = prop.incidentData;
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
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Reporter Name</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Incident ID</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Incident Type</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Priority</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Status</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Reported date</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {incidentData["data"].map((item: any, idx: any) => (
            <tr key={idx}>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300 ps-8">{idx+1}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">{item.reporter.first_name+" "+item.reporter.last_name}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">{item.incident_id}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">{item.incident_type?enumData["incident_type"][item.incident_type]["label"]:""}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">{item.priority?enumData["priority"][item.priority]["label"]:""}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">{item.status?enumData["status"][item.status]["label"]:""}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">{moment(item.reported_date).format("DD/MM/YYYY")}</td>
              <td className="text-left border-b border-gray-100 py-4 px-5 text-gray-300 text-300">
                {item.status !== "CLOSED"?
                  <div className="flex justify-start items-center gap-1">
                    <Button
                      label="Edit"
                      onClick={() => navigate('/incident/'+item.id)}
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
                :""}
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
                  params['page'] < incidentData.meta.last_page?
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

const IncidentLoader = () => {
  return (
    <div className="overflow-auto h-[calc(100vh-15.25rem)] bg-white">
      <table className="w-full">
        <thead className="sticky left-0 top-0">
          <tr>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left ps-8">SR. NO.</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Reporter Name</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Incident ID</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Incident Type</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Priority</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Status</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Reported date</th>
            <th className="bg-gray-200 px-5 py-3 text-gray-700 text-300 font-bold text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 7 }).map((idx: any) => (
            <tr key={idx}>
              {Array.from({ length: 8 }).map((id: any) => (
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
