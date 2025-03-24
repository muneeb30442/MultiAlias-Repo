import { allSymptoms } from "../../utils/symptoms";
import usePatientData from "./usePatientData";

const PatientData = () => {
  const { register, errors, isSubmitting, handleSubmit,preview } = usePatientData();

  const onSubmitForm = (data: unknown) => {

    console.log(data);
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
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full"
            />
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
