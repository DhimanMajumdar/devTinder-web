import { Link } from "react-router-dom";

function ConnectionCard({ user }) {
    const {_id, firstName, lastName, photoUrl, gender, age, about } = user;
    
    return (
      <div key={_id} className="flex bg-base-300 rounded-xl shadow-xl mx-auto w-3/4 md:1/2 my-5 items-center">
        <figure>
          <img
            src={photoUrl}
            className="w-24 h-24 rounded-lg  ml-3 "
            alt="user-img"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && (
            <h2>
              {age},{gender}
            </h2>
          )}
          <p className="text-sm md:text-l">{about}</p>
          
        </div>
        <Link to={"/chat/"+_id}><button className="btn btn-primary mr-5 w-30">Chat</button></Link>
      </div>
    );
  }
  
  export default ConnectionCard;