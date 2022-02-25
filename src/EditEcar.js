import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";
import { context } from "./App";
import { carValidationSchema } from "./AddEcar";
import { useFormik } from "formik";

export function EditEcar() {
  const { id } = useParams();
  console.log(id);
  const [car, setCar] = useState(null);

  const API = useContext(context);

  useEffect(() => {
    fetch(`${API}/e-cars/${id}`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((cars) => setCar(cars))
      .catch((err) => console.log(err));
  });

  return (
    <div>{car ? <Update car={car} /> : <h2>Please Wait ....Loading</h2>}</div>
  );
}

function Update({ car }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: car.name,
      poster: car.poster,
      power: car.power,
      range: car.range,
      info: car.info,
      trailer: car.trailer,
    },
    validationSchema: carValidationSchema,
    onSubmit: (UpdatedCar) => {
      editCar(UpdatedCar);
    },
  });

  //usecontext is provided to execute post operation
  const API = useContext(context);
  const editCar = (UpdatedCar) => {
    fetch(`${API}/e-cars/${car.id}`, {
      method: "PUT",
      body: JSON.stringify(UpdatedCar),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/e-cars"));
  };

  return (
    <div className="input">
      <h1>Here you can update your favourite Cars</h1>
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
          formik.touched.range && formik.errors.range ? formik.errors.range : ""
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
      <Button variant="contained" onClick={() => editCar()} color="success">
        Save
      </Button>
    </div>
  );
}
