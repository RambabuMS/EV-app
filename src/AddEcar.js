import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { context } from "./App";
import { useFormik } from "formik";
import * as yup from "yup";

export const carValidationSchema = yup.object({
  name: yup.string().required("Please fill this name?"),
  poster: yup
    .string()
    .required("Please fill this poster? 😉")
    .min(8, "Need a longer poster link 😄"),
  power: yup.string().required("Why not fill this author name? 😉"),
  range: yup.string().required("Why not fill this summary? 😉").min(20),
  trailer: yup
    .string()
    .required("Why not fill this published year? 😉")
    .min(20),
  info: yup.string().required("Why not fill this info? 😉").min(20),
});

export function AddEcar() {
  const history = useHistory();
  //usecontext is provided to execute post operation
  const API = useContext(context);

  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      power: "",
      range: "",
      info: "",
      trailer: "",
    },
    validationSchema: carValidationSchema,
    onSubmit: (newCar) => {
      addCar(newCar);
    },
  });

  // CRUD - create -  POST operation is performed here
  const addCar = (newCar) => {
    console.log("onSubmit", newCar);
    fetch(`${API}/e-cars/`, {
      method: "POST",
      body: JSON.stringify(newCar),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/e-cars"));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1>Here you can add your favourite Cars</h1>
      <TextField
        className="text"
        label="Car Name"
        variant="outlined"
        margin="dense"
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        helperText={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
      />
      <TextField
        className="text"
        label="Poster"
        variant="outlined"
        margin="dense"
        id="poster"
        name="poster"
        onChange={formik.handleChange}
        value={formik.values.poster}
        onBlur={formik.handleBlur}
        error={formik.touched.poster && formik.errors.poster}
        helperText={
          formik.touched.poster && formik.errors.poster
            ? formik.errors.poster
            : ""
        }
      />
      <TextField
        className="text"
        label="power"
        variant="outlined"
        margin="dense"
        id="power"
        name="power"
        onChange={formik.handleChange}
        value={formik.values.power}
        onBlur={formik.handleBlur}
        error={formik.touched.power && formik.errors.power}
        helperText={
          formik.touched.power && formik.errors.power ? formik.errors.power : ""
        }
      />
      <TextField
        className="text"
        label="Range"
        variant="outlined"
        margin="dense"
        id="range"
        name="range"
        onChange={formik.handleChange}
        value={formik.values.range}
        onBlur={formik.handleBlur}
        error={formik.touched.range && formik.errors.range}
        helperText={
          formik.touched.power && formik.errors.range ? formik.errors.range : ""
        }
      />
      <TextField
        className="text"
        label="Info"
        variant="outlined"
        margin="dense"
        id="info"
        name="info"
        onChange={formik.handleChange}
        value={formik.values.info}
        onBlur={formik.handleBlur}
        error={formik.touched.info && formik.errors.info}
        helperText={
          formik.touched.info && formik.errors.info ? formik.errors.info : ""
        }
      />
      <TextField
        className="text"
        label="Trailer"
        variant="outlined"
        margin="dense"
        id="trailer"
        name="trailer"
        onChange={formik.handleChange}
        value={formik.values.trailer}
        onBlur={formik.handleBlur}
        error={formik.touched.trailer && formik.errors.trailer}
        helperText={
          formik.touched.trailer && formik.errors.trailer
            ? formik.errors.trailer
            : ""
        }
      />
      <Button variant="contained" type="submit">
        Add Car
      </Button>
    </form>
  );
}
