"use client";
import { RegisterInput } from "@/api/__generated__/graphql/graphql";
import { register } from "@/api/server-actions/auth-actions";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import { createQueryString } from "@/lib/helpers/createQueryString";
import { translate } from "@/lib/locales/translate";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormInputType extends Omit<RegisterInput, "redirectUrl"> {
  confirmPassword?: string;
}

export const RegisterForm: React.FC<{
  username?: string;
  preJoinedOrgs?: number[];
  successMessage?: ReactNode;
}> = ({ successMessage, preJoinedOrgs, username }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSuccess = searchParams?.get("success");
  const email = searchParams?.get("email");
  const initialValues: FormInputType = {
    username: username || "",
    password: "",
    confirmPassword: "",
    name: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Invalid email address")
      .required(translate("form.validation.required", "Email address")),
    password: Yup.string()
      .required(translate("form.validation.requiredPassword"))
      .min(8, translate("form.validation.requiredCharacters"))
      .matches(/[0-9]/, translate("form.validation.requiredNumber"))
      .matches(/[a-z]/, translate("form.validation.requiredLowercase")),
    name: Yup.string().required("First Name is required"),
    confirmPassword: Yup.string()
      .label("confirm password")
      .required()
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = async ({
    confirmPassword,
    ...values
  }: FormInputType) => {
    try {
      const res = await register({ ...values, preJoinedOrgs });
      if (res?.data?.register.isSuccess) {
        void router.push(
          pathname +
            "?" +
            createQueryString(
              { success: "true", email: values.username },
              searchParams
            )
        );
      }
      if (res.data?.register.errors) {
        res.data?.register.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };
  useEffect(() => {
    if (isSuccess == "true" && !email) {
      router.push("/register");
    }
  }, [email, isSuccess, router]);
  return (
    <>
      {isSuccess === "true" ? (
        successMessage ?? (
          <div className="text-black">
            {`Account created successfully! Please check your confirmation email on `}
            <strong>{email}</strong>.
          </div>
        )
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => {
            return (
              <Form className=" text-left w-full">
                <h3 className="text-white text-base em:text-xl font-medium leading-[30px] text-center em:text-left w-full">
                  Welcome, Start you journey with us!
                </h3>

                <InputField
                  containerClassName="mt-[20px]"
                  id="username"
                  type="text"
                  placeholder="User name"
                  inputProps={{ disabled: !!username }}
                />

                <InputField
                  containerClassName="mt-[20px]"
                  id="name"
                  type="text"
                  placeholder="name"
                />

                <InputField
                  containerClassName="mt-[20px]"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <InputField
                  containerClassName="mt-[20px]"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <div className="flex items-center justify-center w-full">
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className="text-white focus:outline-none focus:shadow-outline text-[16px] em:text-[18px] lg:text-[22px] font-semibold hover:shadow-xl !bg-[#131A17]  py-[6px] px-4 rounded focus:outline-none w-full text-[22px] font-semibold hover:shadow-xl uppercase"
                  >
                    Register
                  </Button>
                </div>
                <div className="mt-5">
                  <Link
                    href="/forgot-password"
                    className="text-white text-xs underline decoration-white "
                  >
                    Forgot Password?
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};
