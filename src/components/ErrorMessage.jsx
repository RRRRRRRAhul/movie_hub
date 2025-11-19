const ErrorMessage = ({ message = "Something went wrong!" }) => {
  return (
    <div className="alert alert-danger text-center my-3" role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;
