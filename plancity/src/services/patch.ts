import axios from "axios";
const API = "http://localhost:3000/"

export async function patch<TResponse, TBody>(url:string, data:TBody, id:string): Promise<TResponse>{
    try{
        const token = localStorage.getItem("access token")
        const res = await axios.patch<TResponse>(`${API}${url}/${id}`,
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