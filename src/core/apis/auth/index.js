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

// export const logoutApi = async () => {
//     const logoutUrl = '/auth/signup'
//     const res = await await axiosClient.post(logoutUrl);
//     if (!res || !res.data) throw new Error('Opps');
//     return res.data;
// };