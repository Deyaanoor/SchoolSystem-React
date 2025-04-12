import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const templateParams = {
      name: userName,
      email: "deyaanoor9@gmail.com",
      message: userMessage,
    };

    emailjs
      .send(
        "service_5oty2ba",
        "template_7lylfsa",
        templateParams,
        "sVRf2vFuCooLiLWb6"
      )
      .then(
        (response) => {
          setIsLoading(false);
          toast.success(`Message sent successfully to deyaanoor9@gmail.com!`);
          setUserName("");
         
          setUserMessage("");
        },
        (error) => {
          setIsLoading(false);
        }
      );
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 border rounded shadow-sm"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="userName"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="userMessage" className="form-label">
            Message:
          </label>
          <textarea
            id="userMessage"
            className="form-control"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            required
            rows="5"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
