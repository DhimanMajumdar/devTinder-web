import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/reqSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const navigate = useNavigate();

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(removeRequest(id)); // Remove request from state after success
      }
    } catch (error) {
      console.error("Error reviewing request:", error);
      // Handle errors (optional: show an error message)
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(addRequests(res?.data?.data)); // Add requests to Redux store
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        // Optional: navigate to error page or show error message
        
      }
    };

    fetchRequests();
  }, [dispatch, navigate]);

  // Return a message if requests are not loaded
  if (!requests) {
    return <h1>No requests found!!</h1>;
  }

  // Return message if there are no requests
  if (requests.length === 0) {
    return (
      <h1 className="text-3xl my-10 flex justify-center font-bold">
        No requests found!
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 mx-auto md:w-1/2"
          >
            <div>
              <img
                alt="photo"
                className="md:w-36 md:h-28 md:rounded-full"
                src={photoUrl || "default-photo-url.jpg"} // Fallback if photoUrl is missing
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="text-sm md:text-xl">{about}</p>
            </div>
            <div className="md:flex">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests;
