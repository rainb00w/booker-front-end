import axios from "axios";

// const PATH = 'http://localhost:3001/api/user/forgotPassword'; 
const PATH = 'https://booker-back-end.herokuapp.com/api/user/forgotPassword'

const newPasswordAPI = async (email, password) => {
    const data = await axios.patch(PATH, { email, password })
    return data
};

export default newPasswordAPI;