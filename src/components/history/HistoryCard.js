import React, { Component } from "react";
// import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import "./food.css";
import DataManager from "../../module/DataManager";

export default class HistoryCard extends Component {
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

  render() {
    return (
      <div class="card">
        <div class="card-body">This is some text within a card body.</div>
      </div>
    );
  }
}
