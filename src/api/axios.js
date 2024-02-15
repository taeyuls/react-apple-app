import axios from 'axios';

const instance = axios.create({
  baseURL:"https://api.themoviedb.org/3",
  params: {
    api_key: "2d8a2257f58c614fbf5f5ac48f91b90c",
    language: "ko-KR"
  }
})

export default instance;