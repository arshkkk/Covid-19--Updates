import React, { Component } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "./Row";
import axios from "axios";
import Wrapper from "./Wrapper";
import TextField from "@material-ui/core/TextField";
import Loader from "react-loader-spinner";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataToProps: [],
      loading: true,
      totalRow: {
        new_cases: 0,
        total_cases: 0,
        new_deaths: 0,
        total_deaths: 0,
        new_recoveries: 0,
        total_recoveries: 0
      },
      firstTime: true
    };
  }

  componentDidMount() {
    console.log("component did mount");
    axios
      .get("https://api.covid19api.com/summary")
      .then(response => {
        console.log("axios data fetched");
        const tempData = response.data.Countries;
        const data = [];

        tempData.forEach(eachData => {
          if (eachData.TotalConfirmed !== 0) data.push(eachData);
        });

        data.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1));

        this.setState({ data: data, dataToProps: data, loading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange = event => {
    let dataToProps = [];

    this.state.data.forEach((eachData, index) => {
      if (eachData.Country.includes(event.target.value))
        dataToProps.push(eachData);
    });

    this.setState({
      dataToProps: dataToProps
    });
  };

  render() {
    let totalRowData;
    if (this.state.firstTime === true && this.state.loading !== true) {
      totalRowData = { ...this.state.totalRow };
    }

    const rows = this.state.dataToProps.map((eachData, index) => {
      const newRow = (
        <Row
          index={index}
          country={eachData.Country}
          new_cases={ eachData.NewConfirmed}
          total_cases={ eachData.TotalConfirmed}
          new_deaths={ eachData.NewDeaths}
          total_deaths={ eachData.TotalDeaths}
          new_recoveries={ eachData.NewRecovered}
          total_recoveries={eachData.TotalRecovered}
          key={index}
        />
      );
      if (this.state.firstTime === true && this.state.loading !== true) {
        totalRowData.new_cases = totalRowData.new_cases + eachData.NewConfirmed;
        totalRowData.total_cases += eachData.TotalConfirmed;
        totalRowData.new_deaths += eachData.NewDeaths;
        totalRowData.total_deaths += eachData.TotalDeaths;
        totalRowData.new_recoveries += eachData.NewRecovered;
        totalRowData.total_recoveries += eachData.TotalRecovered;
      }

      return newRow;
    });

    this.state.firstTime === true && this.state.loading !== true
      ? this.setState({
          totalRow: totalRowData,
          firstTime: false
        })
      : console.log("second time");

    const totalRow = (
      <tr>
        <td>0</td>
        <td>Total</td>

        <td
          style={{
            color: this.state.totalRow.new_cases !== 0 ? "#fff" : "#2C3335"
          }}
          bgColor={this.state.totalRow.new_cases !== 0 ? "#F4C724" : "#fff"}
        >
          {this.state.totalRow.new_cases}
        </td>

        <td>{this.state.totalRow.total_cases}</td>

        <td
          style={{
            color: this.state.totalRow.new_deaths !== 0 ? "#fff" : "#2C3335"
          }}
          bgColor={this.state.totalRow.new_deaths !== 0 ? "#E8290B" : "#fff"}
        >
          {this.state.totalRow.new_deaths}
        </td>

        <td>{this.state.totalRow.total_deaths}</td>

        <td
          style={{
            color: this.state.totalRow.new_recoveries !== 0 ? "#fff" : "#2C3335"
          }}
          bgColor={this.state.new_recoveries !== 0 ? "#43BE31" : "#fff"}
        >
          {this.state.totalRow.new_recoveries}
        </td>

        <td>{this.state.totalRow.total_recoveries}</td>
      </tr>
    );

    rows.unshift(totalRow);

    return (
      <Wrapper>
        <TextField
          id="filled-basic"
          label="Search Country"
          variant="filled"
          onChange={this.handleChange}
        />

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Country</th>
              <th>New Confirmed</th>
              <th>Total Confirmed</th>
              <th>New Deaths</th>
              <th>Total Deaths</th>
              <th>New Recoveries</th>
              <th>Total Recoveries</th>
            </tr>
          </thead>
          <tbody>
            {this.state.loading ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%"
                }}
              >
                <Loader type="Circles" color="#00BFFF" height={80} width={80} />
              </div>
            ) : (
              rows
            )}
          </tbody>
        </Table>
      </Wrapper>
    );
  }
}

export default App;
