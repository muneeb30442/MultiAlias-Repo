import { useEffect, useState } from "react";
import { patient } from "../utils/testdata";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PatientType } from "../utils/types";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [dropDown, setDropDown] = useState(false);
  const verified = patient[0];

  const location = useLocation();
  const navigate = useNavigate();
  const { message } = location.state || {};

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get("/patients");
        setPatients(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch/get patients:", error);
      }
    };

    fetchPatients();
    if (message) {
      toast.success(message, { toastId: "dashboard-toast" });
    }
  }, [message]);

  const logout = () => {
    toast.success("Logged OUT!");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const avatar = user?.[0].toUpperCase() || "";
  console.log(avatar);
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between">
        <p className="text-3xl md:text-6xl font-semibold mb-16">Dashboard</p>
        <div className="relative">
          <div
            onClick={() => setDropDown((prev) => !prev)}
            className="border text-blue-500 border-blue-300 hover:bg-blue-100 w-10 h-10 flex justify-center items-center rounded-full"
          >
            {avatar}
          </div>
          <div
            className={`${
              dropDown ? "absolute right-0" : "hidden"
            } border p-2 content-center mt-1 flex flex-col gap-y-2 rounded-xl text-blue-300 border-blue-200 bg-white`}
          >
            <p className=" whitespace-nowrap">
              {JSON.parse(localStorage.getItem("user") || "")}
            </p>
            <hr />
            <button
              className="flex justify-center text-red-400 hover:text-red-600"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-16">
        <p className="text-xl md:text-3xl mb-4">All Your Patients</p>
        <Link
          to={"/patientdata"}
          className="text-blue-400 border border-blue-200 flex justify-center rounded-md py-3 px-16 hover:cursor-pointer hover:border-blue-300"
        >
          New Patient
        </Link>
      </div>
      <section className="w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className=" rounded border-[.5px] shadow flex flex-col sm:flex-row "
            >
              <div className="w-full sm:w-1/3 flex items-center justify-center">
                <img
                  src={`http://127.0.0.1:5000/uploads/${patient.imageFilename}`}
                  alt={patient.imageFilename}
                  className=" h-full"
                />
              </div>
              <div className="p-2 w-2/3">
                <p className="font-bold text-lg md:text-xl">{patient.name}</p>
                <p
                  className={`text-sm ${
                    patient.prediction == "Pneumonia"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  <span className="font-semibold">Prediction:</span>{" "}
                  {patient.prediction}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Symptoms:</span>{" "}
                  {patient.symptoms.join(", ")}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Contact:</span>{" "}
                  {patient.contactNo}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Age:</span> {patient.age}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <p className="text-3xl mb-2">Verified</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-4">
        <div
          key={verified.id}
          className=" bg-white rounded border-[.5px] shadow flex"
        >
          <div className="bg-gray-300 flex items-center justify-center">
            <img
              src={verified.image}
              alt={verified.name}
              className="h-20 md:h-35"
            />
          </div>
          <div className="p-2 w-2/3">
            <p className="font-bold text-lg md:text-xl">{verified.name}</p>
            <p
              className={`text-sm ${
                verified.prediction == "Pneumonia"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              <span className="font-semibold">Prediction:</span>{" "}
              {verified.prediction}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Symptoms:</span>{" "}
              {verified.symptoms}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Contact:</span>{" "}
              {verified.contactNo}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Age:</span> {verified.age}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Verified:</span>{" "}
              {verified.verified}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Comments:</span>{" "}
              {verified.clinician_comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
