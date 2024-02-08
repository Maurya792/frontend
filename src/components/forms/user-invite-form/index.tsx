"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import {
  Exact,
  InviteUserInput,
  InviteUserMutation
} from "@/api/__generated__/graphql/graphql";
import { translate } from "@/lib/locales/translate";
import { ApolloCache, DefaultContext, MutationTuple } from "@apollo/client";
import { NEXT_PUBLIC_APP_HOST } from "@/lib/constants";
import { toast } from "react-toastify";
import InputField from "@/components/ui/input-field";

const UserInviteForm = ({
  orgId,
  inviteUser,
  onSuccess,
}: {
  orgId: number;
  onSuccess: () => void;
  inviteUser: MutationTuple<
    InviteUserMutation,
    Exact<{
      data: InviteUserInput;
    }>,
    DefaultContext,
    ApolloCache<any>
  >[0];
}) => {
  const initialValues: InviteUserInput = {
    orgId,
    redirectUrl: `${NEXT_PUBLIC_APP_HOST}/join-org`,
    username: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required().email(translate("form.validation.email")),
  });
  const handleSubmit = async (values: InviteUserInput, formikHelpers: FormikHelpers<InviteUserInput>) => {
    let { orgId, username, redirectUrl } = values;

    try {
      const res = await inviteUser({
        variables: {
          data: {
            orgId,
            redirectUrl,
            username: username,
          },
        },
      });
      if (res.data?.inviteUser.isSuccess) {
        toast.success(translate("user.invite.success", username!));
        formikHelpers.resetForm()
        onSuccess();
      }
      if (res.data?.inviteUser.errors) {
        res.data?.inviteUser.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
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

            <Form className="text-left font-Mont w-full relative">

              <h3 className="text-white text-[18px] em:text-[22px] sm:text-[26px] xl:text-[2rem] font-semibold leading-[28px] text-center w-full mb-4 sm:mb-8 capitalize">
                Invite a user to your org!
              </h3>

              <div className="mb-4 w-full mt-[20px] ">
                <InputField id="username" type="email" placeholder="Enter a user's email" />
              </div>
              <div className="flex items-center justify-center w-full">
                <Button
                  loading={isSubmitting}
                  type="submit"
                  className="bg-[#393939] text-white focus:shadow-outline text-[22px] font-semibold hover:shadow-xl  py-[10px] px-4 rounded focus:outline-none focus:shadow-outline w-full  uppercase"
                >
                  Invite
                </Button>
              </div>
            </Form>
          </div>

        );
      }}
    </Formik>
  );
};

export default UserInviteForm;
