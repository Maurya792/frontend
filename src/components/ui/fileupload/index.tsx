"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Image } from "../image";
import { FileUploadSuccess, upload } from "@/api/server-actions/file-actions";
import { Button } from "../button";
import useSWRMutation, { MutationFetcher } from "swr/mutation";
import Skeleton from "../skeleton";
// import Image from "next/image";
const FileUpload: React.FC<{
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "accept"
  >;
  onFileSelect?: (args: File & { url: string }) => void;
}> = ({ inputProps, containerProps, onFileSelect = () => {} }) => {
  const [files, setFiles] = useState<(File & { preview?: string })[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);
  const uploadFile: MutationFetcher<
    FileUploadSuccess & { file: File },
    "/asset/upload",
    { file: File }
  > = async (key, { arg }) => {
    const formData = new FormData();

    formData.append("file", arg.file);
    const res = await upload(formData);
    if (res.data) {
      return { file: arg.file, ...res.data };
    }
    throw Error("Couldn't upload file");
  };
  const { isMutating, trigger } = useSWRMutation<
    FileUploadSuccess & { file: File },
    any,
    "/asset/upload",
    { file: File }
  >("/asset/upload", uploadFile, {
    onSuccess: (data) => {
      onFileSelect({ ...data.file, url: data.url });
    },
  });
  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          // If allowing multiple files
          // ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
        await trigger({ file : acceptedFiles[0]});
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () =>
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return (
    <>
    <div className="relative">
    <div
        {...getRootProps({
          ...containerProps,
        })}
        className="border border-dashed rounded p-3 "
      >
        <input {...getInputProps({ name: "file", ...inputProps })} className=""/>
        
        {isMutating ? (
          <Skeleton />
        ) : files?.[0]?.preview ? (
          <div className="max-w-[150px] h-[150px] mx-auto">
            <Image
              src={files?.[0].preview}
              alt={files?.[0].name}
              width={100}
              height={100}
              onLoad={() => {
                URL.revokeObjectURL(files?.[0].preview!);
              }}
              className="!h-[100px] !w-[100px] rounded-md object-contain mx-auto"
            />
           
            <p className="mt-2 text-xs font-medium text-black text-center">
              {files?.[0].name}
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-2 text-black  rounded p-3 cursor-pointer">
             {/* <span className="text-sm text-[#C8C8C8]"> Arrow Icon</span> */}
             <Image alt="" src='/Images/plus.png' width={18} height={18} className="!w-[20px] !h-[20px] object-contain"/>
              {isDragActive ? (
                <p className="text-sm text-[#C8C8C8]">Drop the files here ...</p>
              ) : (
                <p className="text-sm text-[#C8C8C8] text-center">Drag & drop files here, or click to select files</p>
              )}
            </div>
          </>
        )}
      </div>
      { files?.[0]?.preview ? ( <button
         type="button"
         className=" top-4 right-4  h-5 w-5 items-center justify-center rounded-full border transition-colors bg-black text-white hover:text-white absolute text-[10px] text-center flex pr-[1px]"
          onClick={() => removeFile(files?.[0].name)}
         >
          X
         </button>) : (
            <button className=" top-4 right-4  h-5 w-5 items-center justify-center rounded-full border transition-colors bg-black text-white hover:text-white absolute text-[10px] text-center hidden">
                X
            </button>
         )
 
      }

    </div>
  
       

      {/* Preview */}
      {/* <section className="mt-10"> */}
      {/* <div className="flex gap-4">
          <Button type="button" onClick={removeAll}>
            Remove
          </Button>
          <Button
            onClick={async () => {
              const file = files[0];
              if (!file) return;
              await trigger({ file });
            }}
            type="button"
            loading={isMutating}
            className="ml-auto mt-1 rounded-md border border-purple-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-purple-400 hover:text-white"
          >
            Upload
          </Button>
        </div> */}

      {/* 
        <h3 className="title mt-24 border-b pb-3 text-lg font-semibold text-stone-600">
          Rejected Files
        </h3>
        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-sm font-medium text-stone-500">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul> */}
      {/* </section> */}
    </>
  );
};

export default FileUpload;
