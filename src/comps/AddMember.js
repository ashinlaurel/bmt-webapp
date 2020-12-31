import React, { useState } from "react";


const AddMember = () => {

  const [values, setValues] = useState({
    name:"",
    dob:"",
    houseName:"",
    houseId:"",
    imgUrl:"",
    job:"",
    phone:"",
    verified:0,
    address:"",
    landline:"",
  })

  
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <div
      class="font-sans h-screen w-full bg-indigo-200  flex flex-col items-center ">
     
      <label
        for=""
        class="uppercase tracking-extrawide text-grey-800 text-xl font-hairline my-6 "
      >
        Add Member
      </label>
      <form action="">
  <div class="mb-4">
    <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
        Name
      </label>
    <input value={values.name} onChange={handleChange("name")} class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
  
  </div>
  

  <div class="mb-4">
    <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
        DOB
      </label>
    <input value={values.dob} onChange={handleChange("dob")} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="date" />
  </div>
  <div class="mb-4">
    <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
        Address
      </label>
    <input value={values.address} onChange={handleChange("address")} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
  </div>
  <div class="mb-4">
    <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
        Job
      </label>
    <input value={values.job} onChange={handleChange("job")} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
  </div>
  <div class="mb-4">
    <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
        Phone
      </label>
    <input value={values.phone}  onChange={handleChange("phone")} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
        LandLine
      </label>
    <input value={values.landline}  onChange={handleChange("landline")} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
  </div>
  
 

  
   <div class="flex items-center justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Submit
      </button>
    </div>
  </form>
      
    </div>  
  );
};

export default AddMember;
