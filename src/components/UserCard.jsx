import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

function UsersCard({ user, showActions = true }) {
  const { _id, firstName, lastName, gender, age, about, photoUrl } = user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFeed = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch {
      navigate("/error");
    }
  };

  return (
    <div className="card h-[500px] bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} className="h-[280px] w-full" alt="Profile" />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{`${gender} (${age})`}</p>}
        <p>{about}</p>

        {showActions && ( // Conditionally render actions
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-error btn-sm rounded-full"
              onClick={() => handleFeed("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success btn-sm rounded-full"
              onClick={() => handleFeed("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersCard;
