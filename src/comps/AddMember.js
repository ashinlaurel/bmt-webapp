import React, { useEffect, useState } from "react";
import { db ,storage} from "../firebase/config";
import firebase from "firebase/app";


const AddMember = () => {

  const initval={
    name:"",
    dob:"",
    imgUrl:"",
    job:"",
    phone:"",
    verified:0,
    address:"",
    landline:"",
    houseName:"",
    houseId:"",
    
  }
  const initbaseval={
    houseName:"",
    houseId:"",
  }
  const [values, setValues] = useState([initval])
  const [basevalues, setBaseValues] = useState(initbaseval)

  const [showModal, setShowModal] = React.useState(false);
  const [houseNames, setHouseNames] = useState({});
  const [FamilyHead, setFamilyHead] = useState("no")

  //login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);


  //image

  const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)


  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
}


const handleFireBaseUpload = (i) => {
console.log('start of upload')
if(imageAsFile === '' ) {
  alert(`not an image, the image file is a ${typeof(imageAsFile)}`)
}

    var uploadTask = storage.ref().child(`/images/dir/${values.name}${values.dob}`).put(imageAsFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
  
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        let newlist = [...values];
         newlist[i].imgUrl = downloadURL;
        setValues(newlist);
        // setValues({ ...values, imgUrl: downloadURL });
        alert("Image Uploaded")
      });
    });



}


/// Image over

useEffect(() => {
  handleRefresh();
  checkSignedIn();
}, [])



  const handleRefresh = async () => {
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);

    const eventsRef = db.collection("housenames");
    const snapshot = await eventsRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let tempusers = snapshot.docs.map((i) => ({
      key: i.id,
      ...i.data(),
    }));
     setHouseNames(tempusers);
     console.log("hi<",tempusers);
    
  };
  
  const handleChange = (name) => (e) => {
    setBaseValues({ ...basevalues, [name]: e.target.value });
  };

const createHouseName=()=>{
  // Alert.alert(params.hope)
  if (basevalues.houseName == "") {
    alert("Error Name is necessary ");
    return;
  }
  let temp={HouseName:basevalues.houseName,members:[]};

  // values.members = [];
  db.collection("housenames")
    .add(temp)
    .then((ref) => {
      console.log("Added document with ID: ", ref.id);
      // newId = ref.id;
      setBaseValues({...basevalues,houseId:ref.id});
      console.log("Added with id",ref.id);
      alert("House Name added")
      // navigation.goBack();
    })
    .catch((err) => {
      console.log(err.code);
      // return;
    });
};

const signIn=()=>{
  console.log("sign in attemp")
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in 
    // ...
    console.log("signed in")
    setSignedIn(true);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error",error.message)
    alert("Invalid email or password");
  });
}

const checkSignedIn=()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      setSignedIn(true);
      console.log("Already Signed in")
    } else {
      // No user is signed in.
      
      setSignedIn(false);
      console.log("Not currenlty Signed in")
    }
  });
}

const loginForm=()=>{
  return(
    <div className="bg-gray-300 h-screen flex flex-centre flex-col justify-center ">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mx-64 ">
    <div className="font-semibold text-2xl mb-4 ">Login to continue</div>
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input value={email} 
        onChange={e=>{
          setEmail(e.target.value)
        }}
      class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Email"/>
    </div>
    <div class="mb-6">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input value={password} 
        onChange={e=>{
          setPassword(e.target.value)
        }}
       class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************"/>
      
    </div>
    {/* <div class="bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-md text-center font-bold py-2 px-4 rounded"> */}
    <button  class="bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-md text-center font-bold py-2 px-4 rounded" onClick={()=>signIn()}  type="button">
        Sign In
      </button>
      {/* </div> */}
    
</div>
</div>
  )
}

  const Modal=()=>{
    return(
      <>
      
          <div
            className=" overflow-y-scroll max-h-screen justify-center items-center flex overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none"
            
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl overflow-y-scroll">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   Family Names
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">

                    <p>Click to select Family Name</p>


                  <table class="table-auto border-collapse border border-green-800">
                        <thead>
                          <tr>
                            <th>Family Name</th>
                            <th>Members</th>
                          </tr>
                        </thead>
                        <tbody>
                        {houseNames.map(h=>{
                         return(<>
                          <tr className="cursor-pointer" onClick={()=>{
                            console.log(h.HouseName)
                            setBaseValues({ ...basevalues, houseName: h.HouseName, houseId: h.key  });
                            // setValues({ ...values, houseId: h.key });
                          }}>
                            <td className="py-1 px-3 border border-green-600">{h.HouseName}</td>
                           <td className=" py-1 px-3 border border-green-600">{h.members.map(m=>(<span className="mx-1">
                              {m.name},
                            </span>)
                            )}</td> 
                          </tr>
                         </>)
                         
                        })}
                          
                         
                        </tbody>
                      </table>

                        <p>Selected House Name: {basevalues.houseName}</p>


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  
                <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
  }


  const sendUser = async () => {

    values.map((item,i)=>{

    
    if (item.name == "") {
      alert("Error", `Member ${i+1}:A Name is required `);
      return;
    }
    if (values.houseName == "" || values.houseName == "") {
      alert(`Member ${i+1}House Name not slected/created `);
      return;
    }
    if(FamilyHead.toLowerCase() =="yes"||FamilyHead.toLowerCase()=="y" ){
      item.FamilyHead=true;
    }else{
      item.FamilyHead=false;
    }
    let newId="";
    item.houseId=basevalues.houseId;
    item.houseName=basevalues.houseName;

    console.log(item);
    db.collection("dirusers")
      .add(item)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        newId = ref.id;
        
      })
      .then(() => {
        console.log("here");
        db.collection("housenames").doc(item.houseId).update({
          members: firebase.firestore.FieldValue.arrayUnion({ name: item.name, id: newId })
        }).then(() => {
          console.log("Member added to House Name added");
          
          setValues([initval]);
          setImageAsFile('');
        })
      })

      .catch((err) => {
        console.log(err.code);
        // return;
      });
      
    })
    alert("Successfully Added");
  }

const memberDetail=(i)=>(
  <div className="bg-gray-300 rounded-lg p-3 m-2"> 
  <div className="flex flex-row">
                <div class="mb-4 mx-4">
                  <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
                      Name
                    </label>
                  <input value={values[i].name} 
                  onChange={(e) => {
                    let newlist = [...values];
                    newlist[i].name = e.target.value;
                    setValues(newlist);
                  }}
                  class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
                
                </div>
                

                <div class="mb-4 mx-4">
                  <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
                      DOB
                    </label>
                  <input value={values[i].dob} 
                  onChange= {(e) => {
                    let newlist = [...values];
                    newlist[i].dob = e.target.value;
                    setValues(newlist);
                  }}
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="date" />
                </div>

                <div class="mb-4 mx-4">
                  <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
                      Job
                    </label>
                  <input value={values[i].job} 
                  onChange= {(e) => {
                    let newlist = [...values];
                    newlist[i].job = e.target.value;
                    setValues(newlist);
                  }}
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
                </div>
 
 
       </div>
 
        <div className="flex flex-row">
        <div class="mb-4 mx-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
              Is Family head?
            </label>
          <input value={FamilyHead}  
          onChange= {(e) => {
                    setFamilyHead(e.target.value)
                  }}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
        </div>

        <div class="mb-4 mx-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
              Phone
            </label>
          <input value={values[i].phone}  
          onChange= {(e) => {
                    let newlist = [...values];
                    newlist[i].phone = e.target.value;
                    setValues(newlist);
                  }}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
        </div>

        <div class="mb-4 mx-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
              LandLine
            </label>
          <input value={values[i].landline}  
          onChange= {(e) => {
                    let newlist = [...values];
                    newlist[i].landline = e.target.value;
                    setValues(newlist);
                  }}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
        </div>

        </div>

        <div className="flex flex-row">
        <div class="mb-4 mx-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
              Address
            </label>
          <input value={values[i].address}
           onChange= {(e) => {
                    let newlist = [...values];
                    newlist[i].address = e.target.value;
                    setValues(newlist);
                  }}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="textarea" />
        </div>
        </div>

        <div className="flex flex-row">
        <div class="mb-4 mx-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="name">
              Select Profile Picture
            </label>
          <input type="file" onChange={handleImageAsFile} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />

      
        </div>

        <button class="mx-4 my-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          onClick={() => handleFireBaseUpload(i)}>
              Upload
            </button> 
        </div>
        </div>
)

  return (
    <div>
    {!signedIn?loginForm():(<>
    
    <div
      class="font-sans h-auto min-h-screen w-full bg-gray-200  flex flex-col items-center ">
     
      <label
        for=""
        class="uppercase tracking-extrawide text-grey-800 text-xl font-hairline my-6 "
      >
        Add Member
      </label>
      <form action="">
      

  
  <div className="flex flex-row">
          <div class="mb-4 ml-4 mr-1">
            <h4 class="block text-gray-800 text-Xl font-bold mb-2" for="name">
                House Name
              </h4>

              <p class="block text-gray-800 text-sm font-bold mb-2" for="name">
                Create New House Name
              </p>
            <input value={basevalues.houseName} onChange={handleChange("houseName")} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="textarea" />
            
          
          </div>

          <div class="mb-4 mx-4 mt-11">
          <button class="ml-1 mr-4 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" 
           onClick={() => createHouseName()}>
                Create New House Name
              </button> 
          
          </div>
          <div class="mb-4 mx-4 mt-16">
          <p class="mx-4 block text-gray-800 mx-4 font-bold mb-2" for="name">
            OR
          </p>
          </div>
     
     
      <div class="mb-4 mx-4 mt-11">
      <button class="mx-4 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"  
      onClick={() => setShowModal(true)}>
        Pick House Name
      </button>
      </div>

      </div>

  
      {values.map((item,num)=>(
        <>
        {memberDetail(num)}
      </>)
      )}

      
   <div class="flex items-center justify-begining mb-64">
   
    <button  onClick={sendUser} class=" mx-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Submit
      </button>

      <button  
   onClick={()=>{
    let newitem = [...values];
                let add = initval;
                newitem.push(add);
                setValues(newitem);
   }} 
   class="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Add Member
      </button>

    </div>
  </form>

  {showModal ?Modal():null}
      
    </div>  
    </>)}
    </div>
  );
};

export default AddMember;
