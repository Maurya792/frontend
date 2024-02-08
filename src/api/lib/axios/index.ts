import { NEXT_PUBLIC_API_HOST } from "@/lib/constants";
import axios from "axios";
export const axiosClient = axios.create({
  baseURL: NEXT_PUBLIC_API_HOST,
});

export type ApiResponse<T = any> = {
  message: string | null;
  isError: boolean;
  data: T | null;
  status: number;
};
