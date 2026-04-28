import axios from "axios";
import type { ApiRecovery } from "../types/news";

const API_BASE_URL = 'http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company';

export const fetchNews = async (page: number, perPage: number, isEmpty: boolean = false): Promise<ApiRecovery> => {
    const endpoint = isEmpty ? '/empty' : '/short';

    const response = await axios.get<ApiRecovery>(`${API_BASE_URL}${endpoint}`, {
        params: {
            page,
            perPage,
        },
    });

    return response.data;
}