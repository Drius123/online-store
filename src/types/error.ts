export interface ApiErrorResponse {
  status: number;
  data: { message: string; errors: { [k: string]: string[] } };
}
