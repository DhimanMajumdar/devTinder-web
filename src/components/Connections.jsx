import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials: true,
          });
        if (res.status === 200) {
          dispatch(addConnections(res?.data?.data));
        }
      } catch {
        // to do
      }
    };
    fetchConnections();
  }, [dispatch, navigate]);

  
  if(!connections) return;
  if(connections.length===0) return <h1 className="text-3xl  text-center font-extrabold mt-4">No Connections Found!!</h1>
 
  return (
    <div className="my-10">
      <h1 className="text-3xl  text-center font-extrabold">Connections</h1>
      <div>
        {connections.map((user) => (
          <ConnectionCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Connections;