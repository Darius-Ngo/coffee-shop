import axiosClient from "../../axiosClient";

export const GetListUserApi = async (textSearch='') => {
    const getListUrl = 'api/admin/nguoidung/getList?textSearch='+textSearch;
    const res = await axiosClient.get(getListUrl);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const InsertUserApi = async (data) => {
  const insertUrl = 'api/admin/nguoidung/insert'
  const res = await axiosClient.post(insertUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const UpdateUserApi = async (data) => {
  const updateUrl = 'api/admin/nguoidung/update'
  const res = await axiosClient.put(updateUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const DeleteUserApi = async (id) => {
  const deleteUrl = 'api/admin/nguoidung/delete?id='+id;
  const res = await axiosClient.delete(deleteUrl);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};
