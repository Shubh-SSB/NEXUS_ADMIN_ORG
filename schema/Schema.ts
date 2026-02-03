// import rolesAndPerm from "@/app/roles/page";
// import { title } from "process";
import * as yup from "yup";

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SCHEMA = {
  mobile: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  password: yup?.string(),
  description: yup
    .string()
    .required("Description is required")
    .max(250, "Description must be at most 250 characters"),
  name: yup?.string().required("Name is required"),
  email: yup
    .string()
    .matches(emailRegExp, "Invalid email")
    .required("Email is required"),
};

const loginValidations = {
  email: SCHEMA.email,
  password: SCHEMA.password,
};

const organizationValidations = {
  name: SCHEMA.name,
  email: SCHEMA.email,
  phone: SCHEMA.mobile,
  address: yup.string().required("Address is required"),
  pincode: yup
    .number()
    .required("Pincode is required")
    .max(999999, "Pincode is not valid"),
  type: yup.string().required("Organization type is required"),
};

const userValidations = {
  name: SCHEMA.name,
  email: SCHEMA.email,
  mobile: SCHEMA.mobile,
  password: SCHEMA.password,
  roleId: yup.number().required("Role is required"),
};

const courseAssignValidations = {
  courseRows: yup
    .array()
    .of(
      yup.object().shape({
        course: yup.string().required("Course is required"),
        token: yup
          .number()
          .typeError("Token must be a number")
          .required("Token is required")
          .positive("Token must be a positive number")
          .integer("Token must be a whole number"),
      }),
    )
    .min(1, "At least one course must be assigned")
    .test(
      "unique-courses",
      "Duplicate courses are not allowed",
      (courseRows) => {
        if (!courseRows) return true;
        const courses = courseRows
          .map((row: any) => row.course)
          .filter(Boolean);
        return courses.length === new Set(courses).size;
      },
    ),
};

const createStudentValidations = {
  name: SCHEMA.name,
  email: SCHEMA.email,
  password: yup.string().required("Password is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(phoneRegExp, "Phone number must be exactly 10 digits"),
  dob: yup.string().nullable(),
  enrollCourses: yup.array().of(yup.number()),
};

const updateStudentValidations = {
  name: SCHEMA.name,
  email: SCHEMA.email,
  phone: yup
    .string()
    .nullable()
    .test(
      "phone-valid",
      "Phone number must be exactly 10 digits",
      (value) => {
        if (!value || value.trim() === "") return true;
        return phoneRegExp.test(value);
      }
    ),
  dob: yup.string().nullable(),
};

export {
  userValidations,
  loginValidations,
  organizationValidations,
  courseAssignValidations,
  createStudentValidations,
  updateStudentValidations,
  SCHEMA,
};
