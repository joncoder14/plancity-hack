import axios from "axios";
const API = "http://localhost:3000/"

export async function post<TResponse, TBody>(url:string, data:TBody): Promise<TResponse>{
    try{
        const token = localStorage.getItem("access token")
        const res = await axios.post<TResponse>(`${API}${url}`,
            data, {
                headers: {
                     Authorization: `Bearer ${token}`,
                }
            }
        )

        return res.data

    } catch(error){
        console.log(error)
        throw error
    }
}