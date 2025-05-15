import emailjs from "emailjs-com";

export const sendContactMessage = async ({ userName, phoneNumber, userMessage }) => {
  const templateParams = {
    name: userName,
    message: userMessage,
    phone: phoneNumber,
  };

  return await emailjs.send(
    "service_5oty2ba",
    "template_7lylfsa",
    templateParams,
    "sVRf2vFuCooLiLWb6"
  );
};
