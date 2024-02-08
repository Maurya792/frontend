import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import { ApolloCache, DefaultContext, MutationTuple } from "@apollo/client";
import { translate } from "@/lib/locales/translate";
import { toast } from "react-toastify";
import { useTeam } from "@/hooks/useTeam";
import { TeamCreateInput } from "@/api/__generated__/graphql/graphql";
const initialValues = {
  name: "",
};
interface CreateTeamFormProps {
  orgId?: number;
}
const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ orgId }) => {
  const { createTeam } = useTeam();
  const handleSubmit = async (
    values: TeamCreateInput,
    formikHelpers: FormikHelpers<TeamCreateInput>
  ) => {
    if (values.name.length !== 0) {
      try {
        const res = await createTeam({
          variables: {
            data: {
              organization: { connect: { id: orgId } },
              name: values.name,
            },
          },
        });
        if (res.data?.createOneTeam) {
          toast.success(translate("team.user.created"));
          formikHelpers.resetForm();
        } else {
          toast.error("error team name is exist ");
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    } else {
      toast.error("enter valid team name ");
    }
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => {
          return (
            <div>
              <Form className="text-left font-Mont w-1/2 border relative flex">
                <div className="w-full ">
                  <InputField
                    id="name"
                    type="text"
                    placeholder="Enter your team name"
                  />
                </div>
                <div className="items-center justify-center w-full">
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className="bg-[#393939] text-white focus:shadow-outline text-[2px] font-semibold hover:shadow-xl  py-[10px] px-4 rounded focus:outline-none focus:shadow-outline w-full  uppercase"
                  >
                    Create Team
                  </Button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateTeamForm;
