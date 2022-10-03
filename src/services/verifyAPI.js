import axios from "axios";

// const PATH = 'http://localhost:3001/api/user/verify'; 
const PATH = 'https://booker-back-end.herokuapp.com/api/user/verify'

const verifyAPI = async (email) => {
    const data = await axios.post(PATH, { email })
    return data
};

export default verifyAPI;