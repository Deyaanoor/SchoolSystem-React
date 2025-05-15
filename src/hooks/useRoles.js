import { useSelector } from "react-redux";

const useRoles = () => {
  const role = useSelector((state) => state.user.role);

  const isAdmin = role === "admin";
  const isTeacher = role === "teacher";
  const isStudent = role === "student";
  return { isAdmin, isTeacher, isStudent };
};

export default useRoles;
