import { useForm } from "react-hook-form";
import { sendContactMessage } from "../../Services/contactService";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await sendContactMessage(data);
    reset();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleSubmit(onSubmit)} className="col-12 col-sm-6">
        <h2 className="text-center mb-4">Contact Us</h2>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Name</label>
          <input
            type="text"
            id="userName"
            className={`form-control ${errors.userName ? "is-invalid" : ""}`}
            {...register("userName", { required: "Name is required" })}
          />
          {errors.userName && (
            <div className="invalid-feedback">{errors.userName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            {...register("phoneNumber", { required: "Phone number is required" })}
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="userMessage" className="form-label">Message</label>
          <textarea
            id="userMessage"
            rows="4"
            className={`form-control ${errors.userMessage ? "is-invalid" : ""}`}
            {...register("userMessage", { required: "Message is required" })}
          ></textarea>
          {errors.userMessage && (
            <div className="invalid-feedback">{errors.userMessage.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
