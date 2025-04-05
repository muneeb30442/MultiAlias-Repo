import { useEffect, useState } from "react";
import { patient } from "../utils/testdata";
import { Link } from "react-router-dom";
import { PatientType } from "../utils/types";
import axiosInstance from "../../api/axios";

const Dashboard = () => {
  const [patients, setPatients] = useState<PatientType[]>([])
  const verified = patient[0]

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get("/patients");
        setPatients(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Failed to fetch/get patients:", error);
      }
    };

    fetchPatients();
  }, []);
  
  return (
    <div className="p-4 md:p-8">
      <p className="text-3xl md:text-6xl font-semibold mb-16">Dashboard</p>
      <div className="flex flex-col md:flex-row justify-between mb-16">
        <p className="text-xl md:text-3xl mb-4">All Your Patients</p>
        <Link
          to={"/patientdata"}
          className="text-blue-400 border border-blue-200 rounded-md py-3 px-16 hover:cursor-pointer hover:border-blue-300"
        >
          New Patient
        </Link>
      </div>
      <section className="w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-4">
          {patients.map((patients) => (
            <div
              key={patients.id}
              className=" rounded border-[.5px] shadow flex flex-col sm:flex-row "
            >
              <div className="w-full sm:w-1/3 flex items-center justify-center">
                <img
                  src={`http://127.0.0.1:5000/uploads/${patients.imageFilename}`}
                  alt={patients.imageFilename}
                  className=" h-full"
                />
              </div>
              <div className="p-2 w-2/3">
                <p className="font-bold text-lg md:text-xl">{patients.name}</p>
                <p className="text-sm">
                  <span className="font-semibold">Prediction:</span>{" "}
                  {patients.prediction}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Symptoms:</span>{" "}
                  {patients.symptoms.join(", ")}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Contact:</span>{" "}
                  {patients.contactNo}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Age:</span> {patients.age}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <p className="text-3xl">Verified</p>
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
          <p className="text-sm">
            <span className="font-semibold">Prediction:</span>{" "}
            {verified.prediction}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Symptoms:</span> {verified.symptoms}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Contact:</span> {verified.contactNo}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Age:</span> {verified.age}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Verified:</span> {verified.verified}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Comments:</span> {verified.clinician_comments}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
