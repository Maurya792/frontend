"use client";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/fileupload";
import InputField from "@/components/ui/input-field";
import routes from "@/lib/routes";
import { Form, Formik } from "formik";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const PersonalizeForm: React.FC<{
  isVerified?: boolean;
  email?: string;
  user?: Session["user"];
}> = ({ isVerified = true, email, user }) => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const initialValues: Partial<any> = {
    // address: user?.address,
    // companyLogo: user?.companyLogo?.url,
    // profilePicture: user?.profilePicture?.url,
    // companyName: user?.companyName,
    // firstName: user?.firstName,
    // lastName: user?.lastName,
    // phoneNumber: user?.phoneNumber,
  };
  const validationSchema = Yup.object().shape({});
  const handleSubmit = async (values: Partial<any>) => {
    try {
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <>
      {!isVerified ? (
        <div className="text-white text-lg text-left">
          Oops, Looks like your account verification link has been expired!{" "}
          <br /> Please try again by{" "}
          <Link
            href={routes.register(email ? { query: { email } } : undefined)}
          >
            {" "}
            creating a new account{" "}
          </Link>
          .
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            isValid,
            setFieldValue,
            /* and other goodies */
          }) => {
            return (
              <Form className=" text-left  w-full">
                <h3 className="text-white text-base font-medium leading-[30px] text-left w-full">
                  Welcome, {user?.name}. Tell us more about yourself.
                </h3>
                <InputField
                  containerClassName="mt-[20px]"
                  id="firstName"
                  type="text"
                  placeholder="First name"
                />
                <InputField
                  containerClassName="mt-[20px]"
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                />
                <InputField
                  containerClassName="mt-[20px]"
                  id="address"
                  type="text"
                  placeholder="Address"
                />
                <InputField
                  containerClassName="mt-[20px]"
                  id="phoneNumber"
                  type="text"
                  placeholder="Phone number"
                />
                <InputField
                  containerClassName="mt-[20px]"
                  id="companyName"
                  type="text"
                  placeholder="Company name"
                />
                <div>
                  <div className="text-gray-700 text-[12px]">Company Logo</div>
                  <FileUpload
                    onFileSelect={({ url }) => {
                      setFieldValue("profilePicture", url);
                    }}
                  />
                </div>
                <div className="flex items-center justify-center w-full">
                  <Button
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    className="bg-[#393939]  text-white py-[10px] px-4 rounded focus:outline-none focus:shadow-outline w-full text-xs font-semibold hover:shadow-xl"
                  >
                    Update
                  </Button>
                </div>
                <div>
                  <Link href="/" className="text-black">
                    Skip for now
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
