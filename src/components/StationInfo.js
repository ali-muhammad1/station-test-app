import React from "react";
import Station  from "./Station";

export default class StationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnNames:[],
      stationData:[]
    }

  }
  componentDidMount() {
    let stationDataPromises = [
      fetch(
        "https://toronto-us.publicbikesystem.net/ube/gbfs/v1/en/station_information"
      ),
      fetch(
        "https://toronto-us.publicbikesystem.net/ube/gbfs/v1/en/station_status"
      ),
    ];
    Promise.all(stationDataPromises)
      .then((responses) => {
        return Promise.all(
          responses.map((response) => {
            return response.json();
          })
        );
      })
      .then((res) => {
        if (res) {
          const stationData = this.mapStationsInfo(res);
          const columnNames= this.getColomnNames(stationData);
          this.setState({columnNames, stationData})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  mapStationsInfo = (data) => {
    const allStations = data[0].data.stations;
    let stationStatus = data[1].data.stations;
    stationStatus = stationStatus.map(s=>{
      delete s.num_bikes_available_types;
      return s;
    })
    const stationInfo = allStations.map((item,i)=>{
      if(item.id === stationStatus[i].id){
        return Object.assign({},item,stationStatus[i])
      }
   })
    return stationInfo;
  }

  getColomnNames = (data) =>{
      const keys = Object.keys(data[0]);
      const columns = keys.map(k=>{
         const obj = {
           title: k,
           field:k,
         }
         return obj;
      })
      return columns;
  }

  render() {
    const { columnNames, stationData } = this.state;
    console.log('columnNames')
    console.log(columnNames)
    console.log('stationData')
    console.log(stationData)
    return <Station stationData={stationData} columnNames={columnNames}/>;
  }
}
