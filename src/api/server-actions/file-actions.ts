"use server"

import { ApiResponse, axiosClient } from "../lib/axios"
export type FileUploadSuccess = { isSuccess : true, url :string}
export const upload = async (formData : FormData) => {
 const res = await axiosClient.post<ApiResponse<FileUploadSuccess>>('/asset/upload', formData)
 return res.data
}