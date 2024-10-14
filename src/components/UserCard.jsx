import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-80 shadow-xl rounded-lg">
      <figure>
        <img
          src={photoUrl}
          alt="User"
          className="h-48 object-cover rounded-t-lg" 
        />
      </figure>
      <div className="card-body p-4"> 
        <h2 className="card-title text-lg">{firstName + ' ' + lastName}</h2> 
        {age && gender && <p>{age + " , " + gender}</p>}
        <p className="text-sm">{about}</p> 
        <div className="card-actions justify-between mt-4">
          <button className="btn btn-error btn-sm rounded-full">Ignore</button> 
          <button className="btn btn-success btn-sm rounded-full">Interested</button> 
        </div>
      </div>
    </div>
  );
};

export default UserCard;
