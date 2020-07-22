import React from "react";
import MaterialTable from "material-table";
import PropTypes from "prop-types";

export default function Station(props) {
  const { columnNames, stationData } = props;
  return (
    <MaterialTable
      title="Bike Station"
      columns={columnNames}
      data={stationData}
    />
  );
}

Station.propTypes = {
  stationData: PropTypes.array,
  columnNames: PropTypes.array,
};

Station.defaultProps = {
  columnNames: [],
  stationData: [],
};
