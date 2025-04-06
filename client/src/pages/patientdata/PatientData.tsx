import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { allSymptoms } from "../../utils/symptoms";
import usePatientData from "./usePatientData";
import { toast } from "react-toastify";

const PatientData = () => {
  const { register, errors, isSubmitting, handleSubmit, preview } =
    usePatientData();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitForm = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", data.age.toString());
    formData.append("contactNo", data.contactNo);

    // Symptoms may be array of strings
    data.symptoms.forEach((symptom: string) => {
      formData.append("symptoms", symptom);
    });

    // Image 
    const file = data.image?.[0]; 
    if (file) {
      console.log("Sending image:", file); // Add this line to debug
      formData.append("image", file);
    } else {
      console.warn("No image file found");
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = response.data

      toast.success('Successful Prediction!')
      navigate('/results', {state: {result}})
    } catch (error) {
      console.error("❌ Error submitting:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <p className="text-3xl lg:text-6xl font-semibold mb-8">Patient Entry</p>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full flex flex-col gap-y-4 max-w-[380px]"
      >
        <div>
          <label className="block" htmlFor={"name"}>
            Name
          </label>
          <input
            {...register("name")}
            id={"name"}
            className={` pl-2 py-2 rounded-lg  border w-full `}
          />
          {errors.name && (
            <p className="text-red-700 text-xs md:text-sm">
              {errors?.name?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block" htmlFor={"age"}>
            Age
          </label>
          <input
            type="number"
            {...register("age")}
            id={"age"}
            className={` pl-2 py-2 rounded-lg  border w-full `}
          />
          {errors.age && (
            <p className="text-red-700 text-xs md:text-sm">
              {errors?.age?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block" htmlFor={"contactNo"}>
            Contact Number
          </label>
          <input
            type="number"
            {...register("contactNo")}
            id={"contactNo"}
            className={` pl-2 py-2 rounded-lg  border w-full `}
          />
          {errors.contactNo && (
            <p className="text-red-700 text-xs md:text-sm">
              {errors?.contactNo?.message}
            </p>
          )}
        </div>
        <label htmlFor="symptoms">Symptoms</label>
        <div id="symptoms" className="flex flex-col">
          {allSymptoms.map((sym) => (
            <label key={sym} htmlFor={sym}>
              <input
                id={sym}
                type="checkbox"
                {...register("symptoms")}
                value={sym}
              />{" "}
              {sym}
            </label>
          ))}
          {errors.symptoms && (
            <p className="text-red-700 text-xs md:text-sm">
              {errors?.symptoms?.message}
            </p>
          )}
        </div>

        <p className="text-3xl">Upload Scan</p>
        <label
          htmlFor="image"
          className="h-60 bg-gray-300 flex items-center justify-center cursor-pointer rounded "
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full" />
          ) : (
            <span className="text-gray-700 text-sm">Click to upload image</span>
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
            className="hidden"
          />
        </label>

        {errors.image && (
          <p className="text-red-600 text-sm">{errors.image.message}</p>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className=" bg-[#2cb1bc] rounded-lg text-base py-[.4rem] text-white font-semibold w-full disabled:opacity-50"
        >
          Add Patient and Detect
        </button>
      </form>
    </div>
  );
};
export default PatientData;
