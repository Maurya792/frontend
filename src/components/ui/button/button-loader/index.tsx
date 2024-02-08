import { LoaderProps } from "@/lib/helpers/withLoading";
import { ButtonProps, ButtonComponent } from "../button-component";

const ButtonLoader: React.FC<LoaderProps<ButtonProps>> = ({
  loadingLabel,
  children,
  ...props
}) => {
  return (
      <ButtonComponent
        {...props}
        disabled
      >
        <span className="font-medium">
          {loadingLabel ?? "Loading..."}
        </span>
      </ButtonComponent>
  );
};
export default ButtonLoader;
