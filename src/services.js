import axios from "axios"

export const SignIn =async (payload) => {
  return axios
    .post("https://stg.dhunjam.in/account/admin/login", payload)
    .then((response) => response.data)
    .catch((error) => error);

};


export const fetchDetails=(payload)=>{
  return axios
  .get(`https://stg.dhunjam.in/account/admin/${payload}`)
  .then((response) => response.data)
  .catch((error) => error);

};

export const sendDetails=(payload,id)=>{
  return axios
  .put(`https://stg.dhunjam.in/account/admin/${id}`,payload)
  .then((response) => response.data)
  .catch((error) => error);

};

