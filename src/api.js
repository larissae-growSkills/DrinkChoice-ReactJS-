import axios from "axios";

//set the needed headers for accessing the TOM API
const authFetch = axios.create({
    baseURL: 'https://api.up2tom.com',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/vnd.api+json',
        'Authorization' : 'Token 9307bfd5fa011428ff198bb37547f979'
    }
});


export default authFetch;
