import axios from 'axios'

const getData = async (url) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    const result = await axios.get(`${url}?api_key=${'result'}`)
    return result
}

export default getData