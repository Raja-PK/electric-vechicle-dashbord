import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Papa from 'papaparse';
import BarChartview from './BarChartview';

const columns = [
  { title: 'VIN(1-10)', dataIndex: 'vin', key: 'vin', fixed: 'left', width: 120 },
  { title: 'County', dataIndex: 'county', key: 'county', width: 120 },
  { title: 'City', dataIndex: 'city', key: 'city', width: 100 },
  { title: 'State', dataIndex: 'state', key: 'state', width: 100 },
  { title: 'Postal Code', dataIndex: 'postalCode', key: 'postalCode', width: 100 },
  { title: 'Model Year', dataIndex: 'modelYear', key: 'modelYear', width: 100 },
  { title: 'Make', dataIndex: 'make', key: 'make', width: 100 },
  { title: 'Model', dataIndex: 'model', key: 'model', width: 100 },
  { title: 'Electric Vehicle Type', dataIndex: 'evType', key: 'evType', width: 180 },
  { title: 'CAFV Eligibility', dataIndex: 'cafvEligibility', key: 'cafvEligibility', width: 150 },
  { title: 'Electric Range', dataIndex: 'electricRange', key: 'electricRange', width: 100 },
  { title: 'Base MSRP', dataIndex: 'baseMSRP', key: 'baseMSRP', width: 80 },
  { title: 'Legislative District', dataIndex: 'legislativeDistrict', key: 'legislativeDistrict', width: 100 },
  { title: 'DOL Vehicle ID', dataIndex: 'dolVehicleID', key: 'dolVehicleID', width: 100 },
  { title: 'Vehicle Location', dataIndex: 'vehicleLocation', key: 'vehicleLocation', width: 150 },
  { title: 'Electric Utility', dataIndex: 'electricUtility', key: 'electricUtility', width: 180 },
  { title: 'Census Tract', dataIndex: 'censusTract', key: 'censusTract', width: 100 },
];

const DynamicDashboard = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/electric-vehicle-population.csv');
        if (!response.ok) throw new Error('Network response was not ok');

        const text = await response.text();
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const newData = results.data.map((row, index) => ({
              key: index,
              vin: row['VIN (1-10)'],
              county: row.County,
              city: row.City,
              state: row.State,
              postalCode: row['Postal Code'],
              modelYear: row['Model Year'],
              make: row.Make,
              model: row.Model,
              evType: row['Electric Vehicle Type'],
              cafvEligibility: row['Clean Alternative Fuel Vehicle (CAFV) Eligibility'],
              electricRange: row['Electric Range'],
              baseMSRP: row['Base MSRP'],
              legislativeDistrict: row['Legislative District'],
              dolVehicleID: row['DOL Vehicle ID'],
              vehicleLocation: row['Vehicle Location'],
              electricUtility: row['Electric Utility'],
              censusTract: row['2020 Census Tract'],
            }));
            setData(newData);
          },
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  return loader ? (
    <p>LOADING...</p>
  ) : error ? (
    <p>Error: {error}</p>
  ) : (
    <>
    <div>
    <h2>Electric Vehicles</h2>
    <p>Total Electric Vehicles: {data.length}</p>
    <BarChartview data={data}/>
    </div>

    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 50,
        total: data.length,
        showSizeChanger: false,
        hideOnSinglePage: false,
      }}
      scroll={{
        y: 400,
        x: 1500,
      }}
      sticky={{ offsetHeader: 64 }}
    />

    </>
  );
};

export default DynamicDashboard;
