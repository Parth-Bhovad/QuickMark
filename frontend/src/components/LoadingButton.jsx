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
      className="fw-semibold"
      style={{
        borderRadius: "0.6rem",
        backgroundColor: variant === "primary" ? "#2563eb" : undefined, // normal color
        borderColor: variant === "primary" ? "#1d4ed8" : undefined,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.backgroundColor = "#1d4ed8"; // darker on hover
          e.currentTarget.style.borderColor = "#1e40af";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.backgroundColor = "#2563eb"; // back to normal
          e.currentTarget.style.borderColor = "#1d4ed8";
        }
      }}
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
            className="me-2"
          />
        </>
      ) : (
        children
      )}
    </Button>
  );
}