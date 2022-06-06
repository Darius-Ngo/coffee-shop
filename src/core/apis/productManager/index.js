import axiosClient from "../../axiosClient";

export const GetListProductApi = async (textSearch = "") => {
    const getListUrl = 'api/admin/sanpham/getList?textSearch='+textSearch;
    const res = await axiosClient.get(getListUrl);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const InsertProductApi = async (data) => {
  const insertUrl = 'api/admin/sanpham/insert'
  const res = await axiosClient.post(insertUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const UpdateProductApi = async (data) => {
  const updateUrl = 'api/admin/sanpham/update'
  const res = await axiosClient.put(updateUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const DeleteProductApi = async (id) => {
  const deleteUrl = 'api/admin/sanpham/delete?id='+id;
  const res = await axiosClient.delete(deleteUrl);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};
