import { patients } from "../utils/testdata";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const verified = patients[patients.length -1]
  return (
    <div className="p-4 md:p-8">
      <p className="text-3xl md:text-6xl font-semibold mb-16">Dashboard</p>
      <div className="flex flex-col md:flex-row justify-between mb-16">
        <p className="text-xl md:text-3xl mb-4">All Your Patients</p>
        <Link to={'/patientdata'} className="text-blue-400 border border-blue-200 rounded-md py-3 px-16 hover:cursor-pointer hover:border-blue-300">
          New Patient
        </Link>
      </div>
      <section className="w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className=" rounded border-[.5px] shadow flex"
            >
              <div className="bg-gray-300 h-30 w-1/3 flex items-center justify-center">
                <img
                  src={patient.image}
                  alt={patient.name}
                  className="h-20 md:h-35"
                />
              </div>
              <div className="p-2 w-2/3">
                <p className="font-bold text-lg md:text-xl">{patient.name}</p>
                <p className="text-sm">{patient.details}</p>
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
        <div className="p-2">
          <p className="font-bold text-lg md:text-xl">{verified.name}</p>
          <p className="text-sm">{verified.details}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
