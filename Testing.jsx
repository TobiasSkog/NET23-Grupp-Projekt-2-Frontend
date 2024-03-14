import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../SocketService";


export default function Testing() {
  // const [project, setProject] = useState([]);
  // const [waiting, setWaiting] = useState(false);


const sendMessage = () => {
    socket.emit("sendMessage", "Hello from the client!");
};

return (
    <div>
        <button onClick={sendMessage}>Send Message</button>
    </div>
);



  // useEffect(() => {

  //   const fetchData = async () => {
  //     try {
  //       setWaiting(true);
  //       const response = await axios.get("http://localhost:3001/databases/timeReports");
  //       setProject(response.data);
  //       console.log("project i fetchData", project);

  //     } catch (error) {
  //       console.error("shit broke:", error);
  //     } finally {
  //       setWaiting(false);
  //     }

  //   };
  //   fetchData();
  // }, []);
  // console.log("utanför fetchData, project:", project);


  // return (
  //   <>
  //     <div>{waiting && (<>poopface is waiting for things to happen</>)}
  //       <p>there should be data between these</p>
  //       {project.length > 0 && (
  //         <>
  //           <h2>{project[0].name}</h2>
  //           <h2>{project[0].hoursLeft}</h2>
  //         </>
  //       )}
  //       <p>there should be data between these</p>
  //     </div>
  //   </>
  // )
};

