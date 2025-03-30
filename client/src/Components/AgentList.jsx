import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAgent, useFetchAgentListQuery } from "../Feature/agentFeature";
import { MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { resetDeleteState } from "../Redux/agentSlice";
import EditAgent from "./EditAgent";

const AgentList = ({ onClosePopup }) => {
  const { data, isLoading, error, refetch } = useFetchAgentListQuery();
  const dispatch = useDispatch();
  const { deleteAgentState } = useSelector((state) => state.agent);
  const [editAgentDropDown, setEditAgentDropDown] = useState(null);

  useEffect(() => {
    if (deleteAgentState.isDeleted) {
      const toastId = toast.success("Deleted Successfully", {
        position: "bottom-left",
        autoClose: 2000,
      });

      refetch();

      setTimeout(() => {
        toast.dismiss(toastId);
        dispatch(resetDeleteState());
      }, 2000);
    }
  }, [deleteAgentState.isDeleted, dispatch, refetch]);

  if (error) {
    return <div>{error?.error?.message}</div>;
  }

  const handleEditAgent = (agentId) => {
    setEditAgentDropDown(editAgentDropDown === agentId ? null : agentId);
  };

  return (
    <div className="fixed inset-0 m-auto p-4 md:p-0 top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white w-full md:w-[500px] h-[500px] p-4 rounded-lg shadow-md overflow-y-scroll scrollbar-hide">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">AgentList</h1>
          <button
            className="cursor-pointer text-2xl"
            onClick={() => {
              onClosePopup();
              dispatch(resetDeleteState());
            }}
          >
            ❌
          </button>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <ul className="w-full space-y-2">
            {data?.data?.map((agent) => {
              return (
                <li key={agent?._id} className="border-1 p-1">
                  <div className="flex justify-between items-center">
                    <p>Name: {agent?.name}</p>
                    <div className="flex gap-2 text-2xl">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleEditAgent(agent._id)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          if (
                            window.confirm(
                              "are you sure you want to delete this agent"
                            )
                          ) {
                            dispatch(deleteAgent(agent._id));
                          }
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  <p>Phone: {agent?.phone}</p>
                  <p>Email: {agent?.email}</p>

                  {editAgentDropDown === agent._id && (
                    <EditAgent
                      agent={agent}
                      onCloseDropDown={() => setEditAgentDropDown(null)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentList;
