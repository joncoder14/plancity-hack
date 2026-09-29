import axios from "axios";

const API = "http://localhost:3000/";

export async function remove<TResponse>(
    url: string,
    id: string
): Promise<TResponse> {
    const token = localStorage.getItem("access token");

    const res = await axios.delete<TResponse>(
        `${API}${url}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
}