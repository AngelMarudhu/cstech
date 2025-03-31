import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAgent } from "../Feature/agentFeature";
import { ToastContainer, toast } from "react-toastify";

export const countryCodesDetails = [
  { code: "+91", label: "+91 India 🇮🇳", maxLength: 10 },
  { code: "+1", label: "+1 USA 🇺🇸", maxLength: 10 },
  { code: "+44", label: "+44 UK 🇬🇧", maxLength: 10 },
  { code: "+61", label: "+61 Australia 🇦🇺", maxLength: 9 },
  { code: "+81", label: "+81 Japan 🇯🇵", maxLength: 10 },
  { code: "+49", label: "+49 Germany 🇩🇪", maxLength: 11 },
  { code: "+33", label: "+33 France 🇫🇷", maxLength: 9 },
  { code: "+86", label: "+86 China 🇨🇳", maxLength: 11 },
  { code: "+55", label: "+55 Brazil 🇧🇷", maxLength: 11 },
  { code: "+7", label: "+7 Russia 🇷🇺", maxLength: 10 },
];

const AddAgentForm = () => {
  const [agent, setAgent] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    password: "",
  });
  const dispatch = useDispatch();

  const { createAgentState } = useSelector((state) => state.agent);

  useEffect(() => {
    if (createAgentState.isCreated) {
      const toastId = toast.success("agent created successfully", {
        position: "bottom-left",
        autoClose: 2000,
      });

      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    }
  }, [createAgentState.isCreated, dispatch]);

  const selectedCountryCode = countryCodesDetails.find(
    (code) => code.code === agent.countryCode
  );

  const maxLength = selectedCountryCode ? selectedCountryCode.maxLength : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && isNaN(value)) {
      alert("Phone number must contain only numbers");
      return;
    }
    if (name === "phone" && value.length > maxLength) {
      alert(`Phone number must be ${maxLength} digits long`);
      return;
    }

    setAgent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumberWithCountryCode = `${agent.countryCode} ${agent.phone}`;
    const agentData = {
      name: agent.name,
      email: agent.email,
      phone: phoneNumberWithCountryCode,
      password: agent.password,
    };
    dispatch(createAgent(agentData));

    setAgent({
      name: "",
      email: "",
      phone: "",
      countryCode: "+91",
      password: "",
    });
  };

  return (
    <div>
      <ToastContainer />
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={agent.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={agent.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex space-x-2">
          <select
            name="countryCode"
            value={agent.countryCode}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            {countryCodesDetails.map((code) => (
              <option key={code.code} value={code.code}>
                {code.label}
              </option>
            ))}
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={agent.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={agent.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 cursor-pointer w-full bg-[#1e1e2c] text-white rounded-md hover:bg-[#2d2d3d] transition duration-200"
        >
          Add Agent
        </button>

        {createAgentState.error && (
          <p className="text-red-500">{createAgentState.error.message}</p>
        )}
      </form>
    </div>
  );
};

export default AddAgentForm;
