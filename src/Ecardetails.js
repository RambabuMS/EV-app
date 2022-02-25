import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { context } from "./App";
import { useContext, useEffect, useState } from "react";

export function ECardetails() {
  const { id } = useParams();

  const [car, setCar] = useState([]);

  //usecontext is provided to execute get operation
  const API = useContext(context);

  useEffect(() => {
    fetch(`${API}/e-cars/${id}`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((mvs) => setCar(mvs))
      .catch((err) => console.log(err));
  });

  const history = useHistory();
  return (
    <div>
      <h1>{car.name} launch details</h1>
      <iframe
        width="100%"
        height="700"
        src={car.trailer}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div className="E-car-container">
        <h2>{car.name}</h2>
        <p>
          <b>Range :</b> {car.range}
        </p>
        <p>
          <b>Info:</b>
          {car.info}
        </p>
        <Button
          onClick={() => {
            history.goBack();
          }}
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
