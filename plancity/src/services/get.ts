const API = "http://localhost:3000/"

import axios from "axios"

export async function get<T>(url:string): Promise<T>{
    try{
        const res = await axios.get(`${API}${url}`)
        return res.data
    } catch (error){
        console.log(
            error
        );
        throw error
        
    }

}