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
    password: ""
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
      weight: this.state.weight,
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

  compare = (a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  };

  componentDidMount() {
    return DataManager.get("users", sessionStorage.getItem("userId")).then(
      user => {
        this.setState({
          userName: user.userName,
          weight: user.weight,
          password: user.password
        });
      }
    );
  }

  render() {
    let weight = this.state.weight;
    let fatGoal = (weight * 0.3611).toFixed(1);
    let carbGoal = (weight * 0.8888).toFixed(1);
    let proteinGoal = (weight * 1.1388).toFixed(1);

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
        </div>
        <section className="d-flex flex-wrap border border-primary rounded container pre-scrollable">
          {this.props.foods
            .filter(
              food =>
                Number(food.userId) === Number(sessionStorage.getItem("userId"))
            ).sort()
            .map(food => (
              <FoodCard
                key={food.id}
                food={food}
                action={this.state.action}
                {...this.props}
                fatSoFar={this.props.fatSoFar}
                carbSoFar={this.props.carbSoFar}
                proteinSoFar={this.props.proteinSoFar}
                makeMacrosArrs={this.props.makeMacrosArrs}
                revertUserCounts={this.props.revertUserCounts}
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
                <th>Macros</th>
                <th>So Far</th>
                <th>To Go</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fat</td>
                <td>
                  {(fatGoal - localStorage.getItem("fatSoFar")).toFixed(1)}
                </td>
                <td>{Number(localStorage.getItem("fatSoFar")).toFixed(1)}</td>
                <td>{fatGoal}</td>
              </tr>
              <tr>
                <td>Carbs</td>
                <td>
                  {(carbGoal - localStorage.getItem("carbSoFar")).toFixed(1)}
                </td>
                <td>{Number(localStorage.getItem("carbSoFar")).toFixed(1)}</td>
                <td>{carbGoal}</td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>
                  {(proteinGoal - localStorage.getItem("proteinSoFar")).toFixed(
                    1
                  )}
                </td>
                <td>
                  {Number(localStorage.getItem("proteinSoFar")).toFixed(1)}
                </td>
                <td>{proteinGoal}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <section>
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
        </section>
      </div>
    );
  }
}
