const en = {
  save: "Save",
  loading: "Loading...",
  submit: "Submit",
  cancel: "Cancel",
  continue: "Continue",
  signIn: "Sign In",
  signOut: "Sign Out",
  signUp: "Sign Up",
  forgotPassword: "Forgot password?",
  "form.validation.requiredPassword": "Password is required.",
  "form.validation.email": "Please enter a valid email.",
  "form.validation.requiredCharacters":
    "Password must be at least 8 characters long.",
  "form.validation.requiredNumber": "Password requires a number.",
  "form.validation.requiredLowercase": "Password requires a lowercase letter.",
  "form.validation.required": (field: string) => `${field} is required.`,
  "errors.server": `Something went wrong please try again later.`,
  "orgs.create.success": (name?: string | null) =>
    `Organization ${name ? name + " " : ""}created successfully.`,
  "user.update.success": (name?: string) =>
    `User ${name ? name + " " : ""} updated successfully.`,
  "user.invite.success": (name?: string) =>
    `User ${name ? name + " " : ""} invited successfully.`,
  "org.details.button": `Manage Org`,
  "org.create.form.heading": `Create an Organization`,
  "org.user.delete": (name?: string) =>
    `User ${name ? name + " " : ""} delete successfully.`,
  "team.user.created": (name?: string) =>
    `Team ${name ? name + " " : ""} Created successfully.`,
  "team.user.deleted": (name?: string) =>
    `Team ${name ? name + " " : ""} Deleted successfully.`,
};

export default en;
