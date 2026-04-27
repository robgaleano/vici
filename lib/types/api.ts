export type Nullable<T> = T | null;

export type ApiResponse<T> = {
  data: Nullable<T>;
  error: string | null;
};

export type PaginatedResult<T> = {
  items: T[];
  nextCursor: string | null;
  totalCount: number;
};
