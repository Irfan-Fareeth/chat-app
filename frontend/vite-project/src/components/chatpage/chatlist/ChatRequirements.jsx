import React from 'react'

export const GetEmailId = (loggedUser, user)=>
{
  return (user[0]?._id==loggedUser?._id)?(user[1]?.email):(user[0]?.email);
}
export const GetSender = (loggedUser, user) => {
  return (user[0]?._id==loggedUser?._id )?(user[1]?.name):(user[0]?.name);
  
}
export const isLoggedUser = (loggedUser, user)=>
{
  return (loggedUser?._id === user?._id?true:false);
}

