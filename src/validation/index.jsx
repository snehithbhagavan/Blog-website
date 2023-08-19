import * as Yup from 'yup';


export const signUpSchema = Yup.object({
    name:Yup.string().required("Please enter your name"),
    email: Yup.string().email("Enter valid email").required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    // confirm_password:Yup.string().oneOf([Yup.ref("password"),null], "Passwords must match").required(
    //     "Please enter confirm password"
    // ),
});