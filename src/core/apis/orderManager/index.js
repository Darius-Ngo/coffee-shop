import axiosClient from "../../axiosClient";

export const GetListDonHangApi = async (textSearch = "") => {
    const getListUrl = 'api/admin/dondathang/getList?textSearch='+textSearch;
    const res = await axiosClient.get(getListUrl);
    if (!res || !res.data) throw new Error('Opps');
    return res.data;
};

export const GetListChiTietDonHangApi = async (id = "") => {
  const getListUrl = 'api/admin/dondathang/getChiTietByIdDonDatHang?idDonDatHang='+id;
  const res = await axiosClient.get(getListUrl);
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};


export const ChuyenTrangThaiApi = async (data) => {
  const chuyenTrangThaiUrl = (body) => `/api/admin/dondathang/chuyenTrangThai?idDonDatHang=${body.id}&trangThai=${body.trangThai}`;
  const res = await axiosClient.patch(chuyenTrangThaiUrl(data));
  if (!res || !res.data) throw new Error('Opps');
  return res.data;
};