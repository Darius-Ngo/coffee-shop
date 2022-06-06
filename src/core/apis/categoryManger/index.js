import axiosClient from "../../axiosClient";

export const GetListCategoryApi = async (textSearch = "") => {
    const getListUrl = 'api/admin/loaisanpham/getList?textSearch='+textSearch;
    const res = await axiosClient.get(getListUrl);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const InsertCategoryApi = async (data) => {
  const insertUrl = 'api/admin/loaisanpham/insert'
  const res = await axiosClient.post(insertUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const UpdateCategoryApi = async (data) => {
  const updateUrl = 'api/admin/loaisanpham/update'
  const res = await axiosClient.put(updateUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const DeleteCategoryApi = async (id) => {
  const deleteUrl = 'api/admin/loaisanpham/delete?id='+id;
  const res = await axiosClient.delete(deleteUrl);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};
