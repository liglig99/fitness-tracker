interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
}
export { PaginatedResult };
