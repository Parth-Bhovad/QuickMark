import { Button, Spinner } from "react-bootstrap";

export default function LoadingButton({
  children,
  loading,
  disabled,
  variant = "primary",
  ...props
}) {
  return (
    <Button
      variant={variant}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
