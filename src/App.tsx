import './App.css'
import { useEffect, useState } from "react";
import DropDownWidget from './Custom/dropdown/dropdown'
import axios from 'axios';
import { CustomTableRow } from './Custom/dropdown/table';
import CustomTable from './Custom/dropdown/table';
import moment from 'moment-timezone';

function App() {
  const options: string[] = [
    // "Lok Sabha (General Elections of India)", 
  "Andhra Pradesh (State Election)", 
  "Odisha (State Election)"];
  const stateCode: Record<string, string> = {
    // 'Lok Sabha (General Elections of India)': "S21",
    'Andhra Pradesh (State Election)': "S01",
    'Odisha (State Election)': "S18"
  };
  const [selectedSabha, setSelectedSabha] = useState<string>(options[0]);
  var savedConstituencies: Record<string, Record<number, string>> = {};
  const [tableData, setTableData] = useState<CustomTableRow[]>([]);
  const [showControls, setShowControls] = useState(false);

  const fetchConstituencies = async () => {
    console.log(savedConstituencies);
    if (`${stateCode[selectedSabha]}` in savedConstituencies) return;
    const getConstituencyDataURL = `https://results.eci.gov.in/AcResultGen2ndJune2024/ac/${stateCode[selectedSabha]}.js`;
    const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/${getConstituencyDataURL}`);
    const jsonData = data.replace('var json_All_AC = ', '').trim();
    const parsedData = JSON.parse(jsonData);
    const features: Record<any, any>[] = parsedData["features"];
    var result: Record<number, string> = []
    features.forEach(element => {
      result[element.properties.AC_NO] = element.properties.AC_NAME;
    });
    savedConstituencies[`${stateCode[selectedSabha]}`] = result;
    console.log(savedConstituencies);
  };

  const checkTime = () => {
    const now = moment().tz('Asia/Kolkata');
    const start = moment().tz('Asia/Kolkata').set({ hour: 8, minute: 5, second: 0, millisecond: 0 }); // 8 AM IST
    const end = moment().tz('Asia/Kolkata').set({ hour: 23, minute: 59, second: 59, millisecond: 999 }); // 11:59 PM IST
    setShowControls(now.isBetween(start, end));
  };

  useEffect(() => {
    checkTime();
  }, []);


  const fetchStateResultStatus = async () => {
    await fetchConstituencies();
    const getLeadingInConstituenciesDataURL = `https://results.eci.gov.in/AcResultGen2ndJune2024/election-json-${stateCode[selectedSabha]}-live.json`;
    const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/${getLeadingInConstituenciesDataURL}`);
    var result:CustomTableRow[] = []
    var chartData:any[][] = data[`${stateCode[selectedSabha]}`].chartData
    chartData.forEach(element => {
      if (selectedSabha == "Andhra Pradesh (State Election)"){
        result.push(
          {
            name: savedConstituencies[`${stateCode[selectedSabha]}`][element[2]],
            leading_candidate: element[3],
            leading_party: element[0],
            leading_party_color: element[4],
            ruling_2014: 'string;',
            ruling_2019: 'string;',
          }
        )
      }
      else{
      result.push(
        {
          name: savedConstituencies[`${stateCode[selectedSabha]}`][element[2]],
          leading_candidate: element[3],
          leading_party: element[0],
          leading_party_color: element[4],
          ruling_2014: 'string;',
          ruling_2019: 'string;',
        }
      )}
    });
    setTableData(result);
  };

  useEffect(() => { 
    fetchStateResultStatus();
  }, [selectedSabha]);

  return (
    <div className='App'>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {showControls && (
        <img
          src="https://media.tenor.com/3I5SoxI-DiYAAAAi/live.gif"
          alt="Live"
          style={{ maxHeight: '30px'}}
        />
      )}
      <DropDownWidget
        label='Election Results:'
        selectedOption={selectedSabha}
        setSelectedOption={setSelectedSabha}
        options={options}
      />
      {showControls && (
        <button onClick={fetchStateResultStatus} style={{ marginLeft: '20px' }}>
          Refresh
        </button>
      )}
      </div>
      {showControls && <CustomTable data={tableData} />}
      {!showControls && <center>Wait until 8AM IST for polling results</center>}
    </div>
  );
}

export default App
