import Button from "../components/Button/Button";
import SearchIncidentForm from "./SearchTaskForm";
import { useNavigate } from "react-router-dom";

const IncidentTopbar = (prop: any) => {
  const navigate = useNavigate();

  const setSearchInpData = prop.events.setSearchInpData;

  return (
    <>
      <div className="flex justify-end md:items-center bg-white shadow-300 py-4 px-5 sticky left-0 top-0 z-[2] w-full rounded-tr-md">
        <div className="flex sm:flex-col sm:mt-2 justify-end gap-6 md:items-center">
          <div className="md:w-[18rem]">
            <SearchIncidentForm setSearchInpData={setSearchInpData}/>
          </div>
          <div className="md:border-x sm:border-y border-gray-100 md:h-8 sm:w-full"></div>
          <div>
          <Button
            label="Add Task"
            onClick={() => navigate('/task')}
            size="medium"
            variant="primary"
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentTopbar;
