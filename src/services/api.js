import axios from 'axios'

const baseUrl="https://api.themoviedb.org/3"
const apiKey=import.meta.env.VITE_API_KEY

//Image
export const imagePath="https://image.tmdb.org/t/p/w500"
export const imagePathOriginal="https://image.tmdb.org/t/p/original"


//Trending
export const fetchTrending = async (time_window="day") => {
    const {data} = await axios.get(`${baseUrl}/trending/all/${time_window}?api_key=${apiKey}`)
    return data?.results
}

//Movies & Series
export const fetchDetails = async (type,id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`)
    return res?.data
}

//Movies & Series Credits
export const fetchCredits = async (type,id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`)
    return res?.data
}

//Movies & Series Videos
export const fetchVideos = async (type,id)=>{
    const res=await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`)
    return res?.data
}


//Discover

export const  fetchMovies=async(page,sortBy)=>{
    const res=await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`)
    return res?.data
}

//Discover Tv 
export const  fetchTvShows=async(page,sortBy)=>{
    const res=await axios.get(`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`)
    return res?.data
}

//Search
export const searchData=async(query,page)=>{
    const res=await axios.get(`${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`)
    return res?.data
}