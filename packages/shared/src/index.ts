export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export type PaginatedResult<T> = {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
};

export type Nullable<T> = T | null;
