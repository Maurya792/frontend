export type LoaderProps<P> = P & { loadingLabel?: string };
export default function WithLoading<T>(
  LoadingComponent: React.FC<T & { loading?: boolean, loadingLabel? :string }>,
  ResultComponent: React.FC<T>
) {
  const Component: React.FC<T & { loading?: boolean, loadingLabel? :string }> = (props) => {
    const { loading, ...componentProps } = props;
    if (props.loading) {
      return <LoadingComponent {...(componentProps as typeof props)} />;
    }
    return <ResultComponent {...(componentProps as typeof props)} />;
  };

  return Component;
}
