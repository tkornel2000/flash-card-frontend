import axios from "axios";

// Eredeti baseURL
const dotnetApi = axios.create({
    baseURL: "https://localhost:7015/api/"
});


export { dotnetApi };