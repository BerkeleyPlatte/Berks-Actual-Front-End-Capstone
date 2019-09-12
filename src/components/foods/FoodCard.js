import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import "./food.css";
import DataManager from "../../module/DataManager";

export default class FoodCard extends Component {
  state = {
    count: 0,
    userId: "",
    name: "",
    fat: 0,
    carb: 0,
    protein: 0,
    date: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateCount = () => {
    let editedFood = {
      id: this.props.food.id,
      userId: Number(sessionStorage.getItem("userId")),
      name: this.state.name,
      fat: this.state.fat,
      carb: this.state.carb,
      protein: this.state.protein,
      date: this.state.date,
      count: this.state.count
    };
    this.props.updateFood(editedFood).then(() => {
      this.props.history.push("/foods");
      this.props.makeMacrosArrs();
    });
  };

  componentDidMount() {
    return DataManager.get("foods", this.props.food.id).then(food => {
      this.setState({
        userId: food.userId,
        name: food.name,
        date: food.date,
        fat: food.fat,
        carb: food.carb,
        protein: food.protein,
        count: food.count
      });
    });
  }

  increaseCount = () => {
    this.setState({ count: this.props.food.count + 1 }, () => {
      this.updateCount();
    });
  };

  decreaseCount = () => {
    this.setState({ count: this.props.food.count - 1 }, () => {
      this.updateCount();
    });
    if (Number(this.props.food.count < 1)) {
      this.setState({ count: 0 });
    }
  };

  clickParent = () => {
    if (this.props.action === "add") {
      this.increaseCount();
    } else if (this.props.action === "remove") {
      this.decreaseCount();
    } else if (this.props.action === "delete") {
      this.props.deleteFood(this.props.food.id);
      this.updateCount();
      this.props.history.push("/foods");
    } else if (this.props.action === "edit") {
      this.props.history.push(`/foods/${this.props.food.id}/edit`);
    }
  };

  render() {
    return (
      <div>
        <div key={this.props.food.id} className="thing shadow rounded w-auto">
          <button
            className={this.props.food.count === 0 ? "btn btn-outline-primary" : "btn btn-info"}
            onClick={this.clickParent}
          >
            {this.props.food.name}
            <br />
            <Badge onChange={this.changeParent}>{this.props.food.count}</Badge>
          </button>
        </div>
      </div>
    );
  }
}
