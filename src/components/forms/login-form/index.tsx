"use client";

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import Skeleton from "@/components/ui/skeleton";
import routes from "@/lib/routes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
const LoginScreenMessage = dynamic(() => import("./login-screen-message"), {
  ssr: true,
});

type FormInputType = {
  email: Required<string>;
  password: Required<string>;
};

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl")
  const initialValues: FormInputType = {
    email: searchParams?.get("email") ?? "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: FormInputType) => {
    let { email, password } = values;
    try {
      const res = await signIn("signIn", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        throw new Error(res.error);
      }
      if(callbackUrl){
        window.location.href = callbackUrl
      }else{
        void router.push(routes.home());
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          values,
          /* and other goodies */
        }) => {
          return (
            <Form className=" text-left  w-full">
              <div className="text-center mb-[3.375rem]">
              <h3 className="text-white font-semibold leading-[30px] text-center  w-full font-Mont text-[2rem] pb-1">
                <Suspense fallback={<Skeleton />}>
                  <LoginScreenMessage />
                </Suspense>
              </h3>
              <span className="text-white text-lg font-medium font-Mont">Please Login to your account</span>
              </div>

              <InputField id="email" placeholder="Email" type="email" />
              <InputField
                id="password"
                placeholder="Password"
                type="password"
              />
                <div className="text-right -mt-2">
                <Link
                  href={routes.forgotPassword({
                    query: { email: values.email },
                  })}
                  className="text-white text-xs underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="flex items-center justify-center w-full mt-10">
                <Button
                  loading={isSubmitting}
                  type="submit"
                  className="!bg-[#131A17]  text-white py-[6px] px-4 rounded focus:outline-none focus:shadow-outline w-full text-[22px] font-semibold hover:shadow-xl uppercase"
                >
                  Log in
                </Button>
              </div>
            
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
