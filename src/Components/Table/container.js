import React from "react";
import { Table } from "react-bootstrap";
import PopUp from "../PopUp"
export default function TableContainer(props) {
  // table conponent for the main page, takes in a data prop which is an objet, with cont and data as its keys
  // cont specifies the continent name and data has the list of countris in the continent
  return (
    <>
      <h3>{props.data.cont}</h3>
      <Table striped bordered>
        <thead className="thead-dark">
          <tr>
            <th className="paymentTable">Country</th>
            <th className="paymentTable">Population</th>
            <th className="paymentTable">Recovered Cases</th>
            <th className="paymentTable">Active Cases</th>
            <th className="paymentTable">New Cases</th>
            <th className="paymentTable">Total Cases</th>
            <th className="paymentTable">New Death</th>
            <th className="paymentTable">Total Deaths</th>
            <th className="paymentTable"></th>
          </tr>
        </thead>

        <tbody>
          {props.data.data
            ? props.data.data.map((item, index) => {
              if (item.country !== props.data.cont && item.country !== "All"){

                return (
                  <tr key={index}>
                    <th className="paymentTable">{item.country}</th>
                    <th className="paymentTable">{item.population}</th>
                    <th className="paymentTable">{item.cases.recovered}</th>
                    <th className="paymentTable">{item.cases.active}</th>
                    <th className="paymentTable">{item.cases.new}</th>
                    <th className="paymentTable">{item.cases.total}</th>
          
                    <th className="paymentTable">{item.deaths.new}</th>
                    <th className="paymentTable">{item.deaths.total}</th>
                    <th className="paymentTable"><PopUp item = {item}/></th>
                  </tr>
                );
              }
              })
            
            : null}
        </tbody>
      </Table>
    </>
  );
}
