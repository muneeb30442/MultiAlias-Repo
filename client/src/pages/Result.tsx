import { useLocation } from "react-router-dom";
import { PatientType } from "../utils/types";
import { Link } from "react-router-dom";


const Result = () => {
  const location = useLocation();
  const result:PatientType = location.state?.result;

  return (
    <div className="p-10">
      <div className=" text-5xl font-semibold mb-20">Prediction Result</div>
      <section className="">
        <p className="text-xl mb-2">Patient Details</p>
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

        <img src={`http://127.0.0.1:5000/uploads/${result.imageFilename}`} />
        <p className="mb-10">
          <span className="font-semibold mr-1">Prediction:</span>{" "}
          {result.prediction}
        </p>
        <Link
          className="text-blue-400 border border-blue-200 rounded-md py-3 px-16 hover:cursor-pointer hover:border-blue-300"
          to={"/dashboard"}
        >
          Goto Dashboard
        </Link>
      </section>
    </div>
  );
};

export default Result;
