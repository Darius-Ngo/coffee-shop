import axiosClient from "../../axiosClient";
import {getListCategoryUrl, getListProductByCategoryIdUrl, getProductByIdUrl, 
  getCategoryByIdUrl, getAllTinhThanhPhoUrl, getQuanHuyenUrl, getXaPhuongUrl, datHangUrl,
  getListCartUrl, insertCartUrl, deleteCartUrl, chuyenTrangThaiUrl} from './urls';

export const GetListCategoryApi = async () => {
    const res = await axiosClient.get(getListCategoryUrl);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};
export const GetCategoryByIdApi = async (id) => {
  const res = await axiosClient.get(getCategoryByIdUrl+id);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};
export const GetListProductByCategoryIdApi = async (id) => {
  const res = await axiosClient.get(getListProductByCategoryIdUrl+id);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};
export const GetProductByIdApi = async (id) => {
  const res = await axiosClient.get(getProductByIdUrl+id);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const GetTinhThanhPhoApi = async () => {
  const res = await axiosClient.get(getAllTinhThanhPhoUrl);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};
export const GetQuanHuyenApi = async (id) => {
  const res = await axiosClient.get(getQuanHuyenUrl+id);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};
export const GetXaPhuongApi = async (id) => {
  const res = await axiosClient.get(getXaPhuongUrl+id);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const DatHangApi = async (data) => {
  const res = await axiosClient.post(datHangUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const GetListCartApi = async (id) => {
  const res = await axiosClient.get(getListCartUrl+id);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const insertCartApi = async (data) => {
  const res = await axiosClient.post(insertCartUrl, data);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};

export const deleteCartApi = async (id) => {
  const res = await axiosClient.delete(deleteCartUrl+id);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};