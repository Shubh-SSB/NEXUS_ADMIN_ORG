import * as yup from "yup";
import {
  organizationValidations,
  loginValidations,
  userValidations,
  courseAssignValidations,
  createStudentValidations,
  updateStudentValidations,
} from "./Schema";

let validationSchema = (screen: string) => {
  let yupValidateObj = {};

  switch (screen) {
    case "login":
      yupValidateObj = loginValidations;
      break;
    case "organization":
      yupValidateObj = organizationValidations;
      break;
    case "user":
      yupValidateObj = userValidations;
      break;
    case "courseAssign":
      yupValidateObj = courseAssignValidations;
      break;
    case "createStudent":
      yupValidateObj = createStudentValidations;
      break;
    case "updateStudent":
      yupValidateObj = updateStudentValidations;
      break;
  }

  return yup.object(yupValidateObj);
};
export default validationSchema;
