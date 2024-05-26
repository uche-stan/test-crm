import * as yup from "yup"

const strictPasswordRules = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/


const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/
// Minimum 3 characters, at least one letter and one number:

const passErrorMsg = "Password must be at least 8 character long with a lower and upper case, a number and a special character "

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    
  };
  

// LOGIN SCHEMA
export const loginSchema = yup.object({
 
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string('Enter your password').min(3, 'Password should be of minimum 8 characters length').required('Password is required'),
  })


//  REGISTRATION SCHEMA 
export const signUpSchema = yup.object().shape({

    
    // last_name: yup.string().required("Last Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    // full_name: yup.string().required("Full Name is required"),
    full_name: yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Full name is required'),

    password: yup.string().matches(strictPasswordRules, {message: passErrorMsg}).required("Password is required"),
    re_password: yup.string().oneOf([yup.ref("password"), null], "Password did not match").required("You must reconfirm your password"),
  


});


//  Create Lead SCHEMA 
export const createLeadSchema = yup.object().shape({

    name: yup.string().required("Full Name is required"),
    // last_name: yup.string().required("Last Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    source: yup.string().required("Source is required"),
    campaign: yup.string().required("Campaign is required"),
  


});


//  Create Agent SCHEMA 
export const createAgentSchema = yup.object().shape({

    name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    
  


});





// Not in use yet

export const advanceSchema = yup.object().shape({

    firstName: yup.string().required("First Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().matches(strictPasswordRules, {message: passErrorMsg}).required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password did not match"),
    age: yup.number().positive("must not be zero or less").integer("inavlid age format").required("Age is required"),
    gender: yup.string().required("Gender is required"),
    type: yup.string().required("Account type is required"),


});
