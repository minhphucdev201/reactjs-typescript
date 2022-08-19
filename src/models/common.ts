export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  // _count: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: any;
  _order?: string;
  [key: string]: any;
}
