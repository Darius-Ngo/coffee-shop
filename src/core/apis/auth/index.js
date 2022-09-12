import axiosClient from "../../axiosClient";

export const loginApi = async (data) => {
    const loginUrl = 'api/auth/signIn'
    const res = await axiosClient.post(loginUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const registerApi = async (data) => {
    const registerUrl = 'api/auth/signUp'
    const res = await axiosClient.post(registerUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const changePasswordApi = async (data) => {
    const changePassUrl = 'api/auth/changePassword'
    const res = await axiosClient.post(changePassUrl, data);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};