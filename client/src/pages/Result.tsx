import { useLocation, useNavigate } from "react-router-dom";
import { PatientType } from "../utils/types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result: PatientType = location.state?.result;
  const [enlarge, setEnlarge] = useState(false);


  useEffect(() => {
    if (!result) {
      toast.error("No result data found!");
      navigate("/dashboard", { replace: true });
    }
  }, [result, navigate]);

  if(!result) return null;

  const colorText =
    result.prediction === "Normal" ? "text-green-600" : "text-red-600";

  return (
    <div className="p-10">
      <div className=" text-5xl font-semibold mb-14">Prediction Result</div>
      <section className="flex flex-col text-lg">
        <p className="text-3xl mb-2">Patient Details</p>
        <p>
          <span className="font-semibold mr-1">Name:</span> {result.name}
        </p>
        <p>
          <span className="font-semibold mr-1">Contact Number:</span>{" "}
          {result.contactNo}
        </p>
        <div className="flex">
          <p className="font-semibold mr-1">Symptom:</p>

          {result.symptoms.join(", ")}
        </div>
        <p className={`${colorText}`}>
          <span className={`font-semibold mr-1 `}>Prediction:</span>{" "}
          {result.prediction}
        </p>
        <div>
          <button
            className="bg-[#2cb1bc] rounded-lg text-base py-[.4rem] px-6 text-white font-semibold my-4"
            onClick={() => setEnlarge((prev) => !prev)}
          >
            Enlarge
          </button>
          <img
            className={`${enlarge ? "w-full" : "w-auto"} mb-10 rounded`}
            src={`http://127.0.0.1:5000/uploads/${result.imageFilename}`}
          />
        </div>

        <Link
          className="text-blue-400 border w-fit border-blue-200 rounded-md py-3 px-16 hover:cursor-pointer hover:border-blue-300"
          to={"/dashboard"}
          state={{ message: `Added Patient: ${result.name}` }}
        >
          Goto Dashboard
        </Link>
      </section>
    </div>
  );
};

export default Result;
