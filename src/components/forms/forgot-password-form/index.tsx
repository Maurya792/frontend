"use client";
import { ForgotPasswordInput } from "@/api/__generated__/graphql/graphql";
import { forgotPassword } from "@/api/server-actions/auth-actions";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import { NEXT_PUBLIC_APP_HOST } from "@/lib/constants";
import { translate } from "@/lib/locales/translate";
import routes from "@/lib/routes";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
interface FormInputType extends Omit<ForgotPasswordInput, "redirectUrl"> {
  email?: string;
}
export const ForgotPasswordForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSuccess = searchParams?.get("isSuccess") === "true";
  const initialValues: FormInputType = {
    username: searchParams?.get("email") ?? "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Invalid email address")
      .required(translate("form.validation.required", "Email address")),
  });
  const handleSubmit = async (values: FormInputType) => {
    const { username } = values
    try {
      const res = await forgotPassword({ username, redirectUrl: `${NEXT_PUBLIC_APP_HOST}/reset-password` }
      );
      if (res.data?.forgotPassword.isSuccess) {
        void router.push(routes.forgotPassword({ query: { isSuccess: "true" } }));
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return isSuccess ? (
    <>
      <div className="text-white">
        Password reset link has been sent to your email. Kindly check your mail.
      </div>
    </>
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting
        /* and other goodies */
      }) => {
        return (
          <Form className=" text-left font-Mont w-full">
            <div className="mb-[3.375rem] text-center">
            <h3 className="text-white text-[2rem] font-medium leading-[30px] text-center w-full pb-1">
              Enter your email
            </h3>
              <span className="text-white text-lg font-medium font-Mont ">Please Login to your account</span>
            </div>
           
            <InputField type="text" id="username" placeholder="Email" />
            <div className="flex items-center justify-center w-full">
              <Button
                loading={isSubmitting}
                type="submit"
                className="bg-[#393939]  text-white py-[10px] px-4 rounded focus:outline-none focus:shadow-outline w-full text-[22px] font-semibold  hover:shadow-xl"
              >
                Submit
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};