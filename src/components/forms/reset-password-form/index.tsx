"use client";

import jwt from "jsonwebtoken";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { resetPassword } from "@/api/server-actions/auth-actions";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";

type FormInputType = {
  password: Required<string>;
};

const ResetPasswordForm = ({
  searchParams,
}: {
  searchParams: { token?: string };
}) => {
  const router = useRouter();
  const initialValues: FormInputType = {
    password: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
  });
  const handleSubmit = async (values: FormInputType) => {
    let { password } = values;

    try {
      const res = await resetPassword({ password, token: searchParams?.token as string });
      const user = jwt.decode(res?.data?.resetPassword?.accessToken as string) as { username: string };
      const username = user?.username as string
      if (res.data?.resetPassword.accessToken) {
        router.push(routes.login({ query: { email: username } }))
      }
    } catch (error) { }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        /* and other goodies */
      }) => {
        return (
          <div>
            <h2 className="font-Poppins text-[30px] leading-[45px] font-semibold text-white text-center mb-[40px]">
              Post<span className="font-light"> Maker.</span>
            </h2>
            <div className="flex flex-col justify-between items-center">
              <div className="flex flex-col lg:flex-row justify-center border-[1px] border-white rounded-[12px]">
                <div className="w-full lg:w-[49%] bg-center bg-cover bg-no-repeat  px-[80px] py-[100px] rounded-t-[10px] lg:rounded-l-[10px] rounded-tr-[10px] lg:rounded-tr-[0px] relative">
                  <div className="bg-[#121212] py-[40px] px-[35px] rounded-[10px] border-[1px] border-white z-50">
                    <h1 className="text-[40px] font-bold leading-[50px] text-white">
                      Easy to make social posts for you
                    </h1>
                    <h1 className="text-[40px] font-bold leading-[50px] text-white">
                      Enterprise.
                    </h1>
                    <p className="text-white text-xs font-normal pt-[20px]">
                      Make the beautiful social media posts easily with our
                      platform.
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[51%] bg-white p-[100px] rounded-b-[10px]  lg:rounded-r-[10px] rounded-bl-[10px] lg:rounded-bl-[0px] flex flex-col items-center justify-center ">
                  <Form className="text-left font-Poppins w-full">
                    <h3 className="text-white text-xl font-medium leading-[30px] text-left w-full">
                      Welcome, Start you journey with us!
                    </h3>
                    <div className="mb-4 w-full mt-[20px]">
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm text-xs py-[12px]"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-[red] text-xs italic "
                      />
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <Button
                        loading={isSubmitting}
                        type="submit"
                        className="bg-[#393939]  text-white py-[10px] px-4 rounded focus:outline-none focus:shadow-outline w-full text-xs font-semibold hover:shadow-xl"
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ResetPasswordForm;
