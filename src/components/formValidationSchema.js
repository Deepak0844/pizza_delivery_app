import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";

const formValidationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Need valid username")
    .required("fill the username please"),
  email: yup
    .string()
    .min(8, "require longer email address")
    .required("fill the email address please"),
  mobileno: yup
    .number("enter mobile no")
    .min(10, "require valid mobile no")
    .required("fill the mobile no please"),
  address: yup
    .string()
    .min(8, "require valid address")
    .required("fill the address please"),
  cardno: yup
    .number()
    .min(16, "require valid card no")
    .required("fill the card no please"),
  expirationdate: yup
    .number()
    .min(4, "require valid expiration date")
    .required("fill the expiration date please"),
  cvcno: yup
    .number()
    .min(3, "require valid cvc no")
    .required("fill the cvc no please"),
});
export function CheckOut() {
  const history = useHistory();
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      mobileno: "",
      address: "",
      cardno: "",
      expirationdate: "",
      cvcno: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (checkOut) => {
      addBtn(checkOut);
    },
  });

  const addBtn = (checkOut) => {
    console.log(checkOut);
    history.push('/ordered-successful');
  };
  return (
    <div>
      <form className="inputs" onSubmit={handleSubmit}>
        <TextField
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          id="username"
          name="username"
          label="Enter your username"
          variant="standard"
          error={errors.username && touched.username}
          helperText={errors.username && touched.username && errors.username} />
        <TextField
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          id="email"
          name="email"
          label="Enter your email address"
          variant="standard"
          error={errors.email && touched.email}
          helperText={errors.email && touched.email && errors.email} />
        <TextField
          value={values.mobileno}
          onChange={handleChange}
          onBlur={handleBlur}
          id="mobileno"
          name="mobileno"
          label="Enter your mobileno"
          variant="standard"
          error={errors.mobileno && touched.mobileno}
          helperText={errors.mobileno && touched.mobileno && errors.mobileno} />
        <TextField
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          id="address"
          name="address"
          label="Enter your address"
          variant="standard"
          error={errors.address && touched.address}
          helperText={errors.address && touched.address && errors.address} />
        <TextField
          value={values.cardno}
          onChange={handleChange}
          onBlur={handleBlur}
          id="cardno"
          name="cardno"
          label="Enter your card no"
          variant="standard"
          error={errors.cardno && touched.cardno}
          helperText={errors.cardno && touched.cardno && errors.cardno} />
        <TextField
          value={values.expirationdate}
          onChange={handleChange}
          onBlur={handleBlur}
          id="expirationdate"
          name="expirationdate"
          label="Enter your expiration date"
          variant="standard"
          error={errors.expirationdate && touched.expirationdate}
          helperText={errors.expirationdate &&
            touched.expirationdate &&
            errors.expirationdate} />
        <TextField
          value={values.cvcno}
          onChange={handleChange}
          onBlur={handleBlur}
          id="cvcno"
          name="cvcno"
          label="Enter your cvc no "
          variant="standard"
          error={errors.cvcno && touched.cvcno}
          helperText={errors.cvcno && touched.cvcno && errors.cvcno} />
        <div className="addSaveBtn">
          <Button
            className="button"
            type="submit"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Place Order
          </Button>
        </div>
        <div>
          <Button
            variant="text"
            onClick={() => history.goBack()}
            startIcon={<KeyboardBackspaceIcon />}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
