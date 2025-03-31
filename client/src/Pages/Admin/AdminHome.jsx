import React, { lazy, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/authSlice";

const AddAgentForm = lazy(() => import("../../Components/AddAgentForm"));
const UploadCsv = lazy(() => import("../../Components/UploadCsv"));
const DistributedList = lazy(() => import("../../Components/DistributedList"));
const AgentList = lazy(() => import("../../Components/AgentList"));

const AdminHome = () => {
  // console.log(createAgent);
  const [agentListPopup, setAgentListPopup] = useState(false);
  const dispatch = useDispatch();
  const { createAgentState } = useSelector((state) => state.agent);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-black shadow-md relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-center text-white">
          Admin Dashboard
        </h2>
        <button
          onClick={() => {
            dispatch(logOut());
          }}
          className="px-4 py-2 cursor-pointer hidden md:inline bg-[#191c24] text-white rounded-md hover:bg-[#2d2d3d] transition duration-200 shadow-2xl"
        >
          Logout
        </button>

        <button
          onClick={() => {
            dispatch(logOut());
          }}
          className="px-4 py-2 cursor-pointer visible md:hidden bg-[#1e1e2c] text-white rounded-md hover:bg-[#2d2d3d] transition duration-200"
        >
          <GrLogout />
        </button>
      </div>

      {/* Top Section - Two Columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-300 shadow-2xl rounded-lg">
          <div className="flex justify-between mb-2 items-center">
            <h3 className="text-lg font-semibold">
              {createAgentState.loading ? "Loading..." : "Add Agent"}
            </h3>
            <button
              onClick={() => {
                setAgentListPopup(true);
              }}
              className="px-4 py-2 cursor-pointer bg-[#1e1e2c] text-white rounded-md hover:bg-[#2d2d3d] transition duration-200"
            >
              Agent List
            </button>
          </div>
          <AddAgentForm />
        </div>

        <div className="p-4 bg-gray-300 rounded-lg shadow-2xl">
          <h3 className="text-lg font-semibold mb-2">Upload CSV</h3>
          <UploadCsv />
        </div>
      </section>

      {/* Bottom Section */}
      <section className="p-4 bg-gray-300 shadow-2xl rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Distributed Task List</h3>
        <DistributedList />
      </section>

      {/* Agent List Popup */}

      {agentListPopup && (
        <AgentList onClosePopup={() => setAgentListPopup(false)} />
      )}
    </div>
  );
};

export default AdminHome;
