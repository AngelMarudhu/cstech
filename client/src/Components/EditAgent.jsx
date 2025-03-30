import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAgentList } from "../Feature/agentFeature";
import { useFetchAgentListQuery } from "../Feature/agentFeature";
import { toast, ToastContainer } from "react-toastify";
import { resetEditState } from "../Redux/agentSlice";

const EditAgent = ({ agent, onCloseDropDown }) => {
  const [agentDetails, setAgentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { refetch } = useFetchAgentListQuery();
  const { editAgentState } = useSelector((state) => state.agent);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editAgentState.isEdited) {
      const toastId = toast.success("Edited Successfully", {
        position: "bottom-left",
        autoClose: 2000,
      });

      refetch();
      setAgentDetails({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      setTimeout(() => {
        toast.dismiss(toastId);
        dispatch(resetEditState());
      }, 2000);
    }
  }, [editAgentState.isEdited]);

  useEffect(() => {
    setAgentDetails({
      name: agent?.name,
      email: agent?.email,
      phone: agent?.phone.trim(),
      password: agent?.password || "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && isNaN(value)) {
      alert("Phone number must contain only numbers");
      return;
    }

    setAgentDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailValid(agentDetails.email)) {
      alert("please enter valid email");
      return;
    }

    if (
      !agentDetails.name ||
      !agentDetails.email ||
      !agentDetails.phone ||
      !agentDetails.password
    ) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(editAgentList({ id: agent._id, agent: agentDetails }));
  };

  return (
    <div className="w-full p-4">
      <ToastContainer />
      <div>
        <h1 className="text-center mt-2 mb-2">Edit Your Agent</h1>

        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={agentDetails.name}
            required
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
          <input
            type="text"
            placeholder="Email"
            value={agentDetails.email}
            name="email"
            required={true}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={agentDetails.password}
            name="password"
            required
            onChange={handleChange}
            className="w-full p-1 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={agentDetails.phone}
            className="w-full p-1 border rounded"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="px-4 py-1 cursor-pointer w-full bg-[#1e1e2c] text-white rounded-md hover:bg-[#2d2d3d] transition duration-200"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAgent;
