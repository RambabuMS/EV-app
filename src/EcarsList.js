import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ElectricCars } from "./ElectricCars";
import { context } from "./App";

export function EcarsList() {
  const history = useHistory();

  //usecontext is provided to execute get operation
  const API = useContext(context);

  const [carslist, setCarslist] = useState([]);

  // CRUD - Read -  GET operation is performed here

  const getCars = () => {
    fetch(`${API}/e-cars`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((mvs) => setCarslist(mvs));
  };
  //useEffect is implemented here
  useEffect(() => getCars());

  // CRUD - Delete -  DELETE operation is performed here
  const deleteCar = (id) => {
    fetch(`${API}/e-cars/${id}`, {
      method: "DELETE",
    }).then(() => getCars());
  };
  return (
    <div>
      <h1>Electric Cars in India</h1>
      <div className="list">
        {carslist.map((user, index) => (
          <ElectricCars
            key={index}
            //{...user}
            id={user.id}
            name={user.name}
            poster={user.poster}
            range={user.range}
            power={user.power}
            info={user.info}
            deletebutton={
              <IconButton
                style={{ marginLeft: "auto" }}
                color="error"
                onClick={() => {
                  deleteCar(user.id);
                }}
                aria-label="delete"
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            }
            editbutton={
              <IconButton
                color="secondary"
                onClick={() => history.push(`/e-cars/edit/${user.id}`)}
                aria-label="edit"
                size="medium"
              >
                <EditIcon />
              </IconButton>
            }
          />
        ))}
      </div>
    </div>
  );
}
