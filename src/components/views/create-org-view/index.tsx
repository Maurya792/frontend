import CreateOrgForm from "@/components/forms/create-org-form";
import React from "react";

const CreateOrgView: React.FC<{ showCloseIcon?: boolean }> = ({
  showCloseIcon = false,
}) => {
  return <CreateOrgForm showCloseIcon={showCloseIcon}/>;
};

export default CreateOrgView;
