import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllTasks,
  useFetchAgentTaskListQuery,
} from "../Feature/agentFeature";
import { resetDeleteAllTasksState } from "../Redux/agentSlice";
import { toast, ToastContainer } from "react-toastify";

const DistributedList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error, refetch } = useFetchAgentTaskListQuery();
  const [dropDown, setDropDown] = useState(null);
  const { deleteAllTasksState } = useSelector((state) => state.agent);

  useEffect(() => {
    if (deleteAllTasksState.isDeleted) {
      const toastId = toast.success("All Task Deleted Successfully", {
        position: "bottom-left",
        autoClose: 2000,
      });

      refetch();
      setTimeout(() => {
        toast.dismiss(toastId);
        dispatch(resetDeleteAllTasksState());
      }, 2000);
    }
  }, [deleteAllTasksState.isDeleted]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    if (error.status === 404) {
      return <div>No tasks assigned to any agent yet.</div>;
    }
    return <div>Something went wrong: {error?.data?.message}</div>;
  }
  if (!data?.data?.length) {
    return <div>No Data Found</div>;
  }

  const handleDropDown = (agentId) => {
    setDropDown(dropDown === agentId ? null : agentId);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center mb-2">
        <h1 className=" text-green-500">Total Task - {data?.totalTasks}</h1>
        <button
          onClick={() => {
            if (window.confirm("are you sure you want to delete this agent")) {
              dispatch(deleteAllTasks());
            }
          }}
        >
          Delete All Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {data?.data?.length > 0 ? (
          data?.data?.map((agent) => {
            return (
              <div
                key={agent?._id}
                className="border rounded-lg shadow-md p-4 bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3>Agent: {agent?.assignedTo?.name}</h3>
                  {dropDown && dropDown === agent?._id ? (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDropDown(agent._id)}
                    >
                      ➖
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDropDown(agent._id)}
                    >
                      ➕
                    </button>
                  )}
                </div>

                {dropDown === agent?._id && (
                  <div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-center">Task List</h1>

                      <span className="ml-3 text-green-500">
                        You Got: {agent?.taskList?.length}
                      </span>
                    </div>

                    <ul className="space-y-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {agent?.taskList?.map((task) => {
                        return (
                          <li key={task?._id} className="border-b py-2">
                            <p>Name: {task?.firstName}</p>
                            <p>Phone: {task?.phone}</p>
                            <p>Notes: {task?.notes}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default DistributedList;
