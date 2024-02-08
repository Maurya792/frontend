import clsx from "clsx";
import { ErrorMessage, Field, FieldAttributes } from "formik";
import React from "react";

const InputField: React.FC<{
  containerClassName?: string;
  inputClassName?: string;
  inputProps?: FieldAttributes<any>;
  errorClassName?: string;
  id?: string;
  type?: "email" | "password" | "number" | "text";
  placeholder?: string;
}> = ({
  containerClassName,
  errorClassName,
  id,
  inputClassName,
  type = "text",
  placeholder,
  inputProps={}
}) => {
  return (
    <div className={clsx("mb-8 w-full ", containerClassName)}>
      <Field
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={clsx(
          inputClassName,
          "appearance-none border rounded w-full  px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-black placeholder:font-medium  placeholder:text-sm text-sm py-[12px]"
        )}
        {...inputProps}
        // bg-inputIcon bg-left-[10px] bg-no-repeat bg-[10px]
      />
      <ErrorMessage
        name={id??''}
        component="div"
        className={clsx(
          errorClassName,
          "text-[red] text-xs italic"
        )}
      />
    </div>
  );
};

export default InputField;
