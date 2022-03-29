import axios from "axios";

export default axios.create({
	baseURL: 'https://react-quiz-d4fa0-default-rtdb.asia-southeast1.firebasedatabase.app/'
})