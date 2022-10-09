import React, { Component } from "react";
import FoodCard from "./FoodCard";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import DataManager from "../../module/DataManager";

export default class FoodList extends Component {
  state = {
    action: "add",
    weight: 0,
    userName: "",
    password: "",
    fatFactor: 0,
    carbFactor: 0,
    proteinFactor: 0,
    sodiumFactor: 0,
    fiberFactor: 0
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingUser = () => {
    let editedUser = {
      id: Number(sessionStorage.getItem("userId")),
      userName: this.state.userName,
      weight: Number(this.state.weight),
      password: this.state.password
    };

    this.props.updateUser(editedUser);
  };

  activateIncrease = () => {
    this.setState({ action: "add" });
  };

  activateDecrease = () => {
    this.setState({ action: "remove" });
  };
  activateDelete = () => {
    this.setState({ action: "delete" });
  };
  activateEdit = () => {
    this.setState({ action: "edit" });
  };

  componentDidMount() {
    return DataManager.get("users", sessionStorage.getItem("userId")).then(
      user => {
        this.setState({
          userName: user.userName,
          weight: Number(user.weight),
          password: user.password,
          fatFactor: Number(user.fatFactor),
          carbFactor: Number(user.carbFactor),
          proteinFactor: Number(user.proteinFactor),
          sodiumFactor: Number(user.sodiumFactor),
          fiberFactor: Number(user.fiberFactor)
        });
      }
    );
  }

  render() {
    let weight = this.state.weight;
    let fatGoal = (weight * this.state.fatFactor).toFixed(1);
    let carbGoal = (weight * this.state.carbFactor).toFixed(1);
    let proteinGoal = (weight * this.state.proteinFactor).toFixed(1);
    // let sodiumGoal = (weight * this.state.sodiumFactor).toFixed(1);
    let sodiumGoal = 2300;
    // let fiberGoal = (weight * this.state.fiberFactor).toFixed(1);
    let fiberGoal = 38;
    return (
      <div>
        <div className="d-flex flex-row justify-content-center">
          <label className="mt-2 mb-2">Weight:</label>
          &nbsp;
          <input
            type="text"
            className="form-control-sm mt-2 mb-2"
            id="weight"
            placeholder={weight}
            onChange={this.handleFieldChange}
          />
          <button
            type="button"
            className="btn mt-2 mb-2 btn-secondary btn-sm"
            onClick={() => {
              this.updateExistingUser();
            }}
          >
            Save Weight
          </button>
          {/* <button
            type="button"
            className="btn mt-2 mb-2 btn-secondary btn-sm"
            onClick={() => {
              this.props.history.push(
                `settings/${sessionStorage.getItem("userId")}`
              );
            }}
          >
            Settings
          </button> */}
        </div>
        <section className="d-flex flex-wrap border border-primary rounded container pre-scrollable">
          {this.props.foods
            .filter(
              food =>
                Number(food.userId) === Number(sessionStorage.getItem("userId"))
            )
            .map(food => (
              <FoodCard
                key={food.id}
                food={food}
                action={this.state.action}
                {...this.props}
                fatSoFar={this.props.fatSoFar}
                carbSoFar={this.props.carbSoFar}
                proteinSoFar={this.props.proteinSoFar}
                sodiumSoFar={this.props.sodiumSoFar}
                fiberSoFar={this.props.fiberSoFar}
                makeMacrosArrs={this.props.makeMacrosArrs}
                revertUserCounts={this.props.revertUserCounts}
                addEatenFood={this.props.addEatenFood}
              />
            ))}
        </section>
        <React.Fragment>
          <div className="d-flex flex-column" />
          <div className="foodsButton">
            <button
              type="button"
              className="btn btn-success createBtn"
              onClick={() => {
                this.props.history.push("/foods/new");
              }}
            >
              Create Food
            </button>
            <ButtonGroup toggle className="mt-3">
              <ToggleButton
                onClick={this.activateIncrease}
                type="radio"
                name="radio"
                defaultChecked
                value="1"
              >
                Add
              </ToggleButton>
              <ToggleButton
                onClick={this.activateDecrease}
                type="radio"
                name="radio"
                value="2"
              >
                Subtract
              </ToggleButton>
              <ToggleButton
                onClick={this.activateDelete}
                type="radio"
                name="radio"
                value="3"
              >
                Delete
              </ToggleButton>
              <ToggleButton
                onClick={this.activateEdit}
                type="radio"
                name="radio"
                value="4"
              >
                Edit
              </ToggleButton>
            </ButtonGroup>
          </div>
        </React.Fragment>
        <div className="table">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Macros (g)</th>
                <th>So Far</th>
                <th>To Go</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fat</td>
                <td>{Number(localStorage.getItem("fatSoFar")).toFixed(1)}</td>
                <td>
                  {(fatGoal - localStorage.getItem("fatSoFar")).toFixed(1)}
                </td>
                <td>{fatGoal}</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>{Number(localStorage.getItem("carbSoFar")).toFixed(1)}</td>
                <td>
                  {(carbGoal - localStorage.getItem("carbSoFar")).toFixed(1)}
                </td>
                <td>{carbGoal}</td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>
                  {Number(localStorage.getItem("proteinSoFar")).toFixed(1)}
                </td>
                <td>
                  {(proteinGoal - localStorage.getItem("proteinSoFar")).toFixed(
                    1
                  )}
                </td>
                <td>{proteinGoal}</td>
              </tr>
              
              <tr>
                <td>Fiber</td>
                <td>
                  {Number(localStorage.getItem("fiberSoFar")).toFixed(1)}
                </td>
                <td>
                  {(fiberGoal - localStorage.getItem("fiberSoFar")).toFixed(
                    1
                  )}
                </td>
                <td>{fiberGoal}</td>
              </tr>
              <tr>
                <td>Sodium (mg)</td>
                <td>
                  {Number(localStorage.getItem("sodiumSoFar")).toFixed(1)}
                </td>
                <td>
                  {(sodiumGoal - localStorage.getItem("sodiumSoFar")).toFixed(
                    1
                  )}
                </td>
                <td>&lt;{sodiumGoal}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <section className="foodsButton">
          <button
            type="button"
            className="btn btn-secondary btn clearBtn"
            onClick={() => {
              localStorage.setItem("weight", this.state.weight);

              this.props.revertUserCounts();
            }}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn btn-secondary btn generateBtn"
            onClick={() => {
              this.props.getFilteredFoods();
            }}
          >
            Generate
          </button>
        </section>
      </div>
    );
  }
}
