import React, { useEffect, useState } from "react";
import { uploadFile } from "../Feature/uploadFileFeature";
import { useDispatch, useSelector } from "react-redux";
import { resetUpload } from "../Redux/uploadSlice";
import { ToastContainer, toast } from "react-toastify";
import { useFetchAgentTaskListQuery } from "../Feature/agentFeature";

const UploadCsv = () => {
  const [files, setFile] = useState({ file: null });
  const distpatch = useDispatch();

  const { refetch } = useFetchAgentTaskListQuery();

  const { isUploaded, uploadedMessage, loading } = useSelector(
    (state) => state.upload
  );

  useEffect(() => {
    if (isUploaded) {
      toast.success(uploadedMessage, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
      });
      refetch();
    }
  }, [isUploaded]);

  const handleFileUpload = (event) => {
    const csvFiles = event.target.files[0];
    // Handle file upload logic here
    if (!csvFiles) return;
    if (csvFiles.type !== "text/csv") {
      alert("Please upload a CSV file");
      return;
    }
    setFile({ file: csvFiles });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!files.file) {
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", files.file);

    // for (let [key, value] of formData.entries()) {
    //   console.log(value);
    // }

    distpatch(uploadFile(formData));
    setFile({ file: null });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <ToastContainer />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <label
          htmlFor="file-upload"
          className="w-full max-w-md flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:border-gray-600 transition duration-200"
        >
          {files?.file ? "✅" : "➕"}
          <span className="ml-2 text-gray-600 font-medium">
            {files?.file ? `${files?.file.name}` : "Click to upload a file"}
          </span>
          <input
            type="file"
            id="file-upload"
            multiple={false}
            accept=".csv"
            className="hidden"
            onChange={(e) => handleFileUpload(e)}
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-4 mt-4 py-2 cursor-pointer bg-[#1e1e2c] text-white rounded-md hover:bg-[#2d2d3d] transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadCsv;
