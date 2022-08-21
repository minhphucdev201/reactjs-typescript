import { ListParams } from './../models/common';
import { ListResponse, Product } from 'models';
import axiosClient from './axiosClients';

const productApi = {
  async getAll(params: ListParams) {
    // Transform _page to _start
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 10);
    // Remove un-needed key
    delete newParams._page;
    // Fetch product list + count
    const productList = await axiosClient.get('/products', { params: newParams });
    const count = await axiosClient.get('/products/count', { params: newParams });
    // Build response and return
    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
  getById(id: string): Promise<Product> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(data: Product): Promise<Product> {
    const url = '/products';
    return axiosClient.post(url, data);
  },
  update(data: Partial<Product>): Promise<Product> {
    const url = `/products/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id: number): Promise<any> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default productApi;
