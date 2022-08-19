import { Category, ListParams, ListResponse } from 'models';
import axiosClient from './axiosClients';

const categoryApi = {
  getAll(): Promise<ListResponse<Category>> {
    const url = '/categories';
    return axiosClient.get(url, {
      params: {
        _start: 0,
        _limit: 10,
      },
    });
  },
  // getById(id: number): Promise<Category> {
  //   const url = `/categories/${id}`;
  //   return axiosClient.get(url);
  // },
  // add(data: Category): Promise<Category> {
  //   const url = '/categories';
  //   return axiosClient.post(url, data);
  // },
  // update(data: Category): Promise<Category> {
  //   const url = `/categories/${data.id}`;
  //   return axiosClient.put(url, data);
  // },
  // remove(id: number): Promise<any> {
  //   const url = `/categories/${id}`;
  //   return axiosClient.delete(url);
  // },
};
export default categoryApi;
