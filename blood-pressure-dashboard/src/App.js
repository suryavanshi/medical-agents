import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
const data = [
  { day: "Monday", systolic_am: 140, diastolic_am: 84, heartRate_am: 66, systolic_pm: 130, diastolic_pm: 80, heartRate_pm: 82 },
  { day: "Tuesday", systolic_am: 155, diastolic_am: 70, heartRate_am: 77, systolic_pm: 115, diastolic_pm: 69, heartRate_pm: 99 },
  { day: "Wednesday", systolic_am: 170, diastolic_am: 69, heartRate_am: 67, systolic_pm: null, diastolic_pm: null, heartRate_pm: 89 },
  { day: "Thursday", systolic_am: 176, diastolic_am: 80, heartRate_am: 100, systolic_pm: 140, diastolic_pm: 90, heartRate_pm: 59 },
  { day: "Friday", systolic_am: 130, diastolic_am: 80, heartRate_am: 92, systolic_pm: 120, diastolic_pm: 70, heartRate_pm: 49 },
  { day: "Saturday", systolic_am: 115, diastolic_am: 65, heartRate_am: 80, systolic_pm: 180, diastolic_pm: 70, heartRate_pm: 65 },
  { day: "Sunday", systolic_am: 130, diastolic_am: 80, heartRate_am: 77, systolic_pm: 120, diastolic_pm: 70, heartRate_pm: 91 }
];

const BloodPressureChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="day" />
    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
    <Tooltip />
    <Legend />
    <Line yAxisId="left" type="monotone" dataKey="systolic_am" stroke="#8884d8" name="Systolic AM" />
    <Line yAxisId="left" type="monotone" dataKey="diastolic_am" stroke="#82ca9d" name="Diastolic AM" />
    <Line yAxisId="left" type="monotone" dataKey="systolic_pm" stroke="#8884d8" strokeDasharray="5 5" name="Systolic PM" />
    <Line yAxisId="left" type="monotone" dataKey="diastolic_pm" stroke="#82ca9d" strokeDasharray="5 5" name="Diastolic PM" />
    </LineChart>
    </ResponsiveContainer>
);

const HeartRateChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="day" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="heartRate_am" stroke="#8884d8" name="Heart Rate AM" />
    <Line type="monotone" dataKey="heartRate_pm" stroke="#82ca9d" name="Heart Rate PM" />
    </LineChart>
    </ResponsiveContainer>
);

const ReadingsTable = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
    <thead className="bg-gray-800 text-white">
    <tr>
    <th className="py-2 px-4 text-left">Day</th>
    <th className="py-2 px-4 text-left">AM Reading</th>
    <th className="py-2 px-4 text-left">PM Reading</th>
    <th className="py-2 px-4 text-left">Notes</th>
    </tr>
    </thead>
    <tbody>
    {data.map((day, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
        <td className="py-2 px-4">{day.day}</td>
        <td className="py-2 px-4">
        {day.systolic_am}/{day.diastolic_am} - {day.heartRate_am} bpm
      </td>
        <td className="py-2 px-4">
        {day.systolic_pm !== null ? `${day.systolic_pm}/${day.diastolic_pm} - ${day.heartRate_pm} bpm` : 'N/A'}
      </td>
        <td className="py-2 px-4">
        {day.day === 'Wednesday' && 'Had coffee'}
      {day.day === 'Saturday' && 'Headache'}
      {day.day === 'Sunday' && 'Doubled med.'}
      </td>
        </tr>
    ))}
  </tbody>
    </table>
    </div>
);

const Dashboard = () => (
  <div className="p-4 space-y-4">
    <h1 className="text-2xl font-bold mb-4">Weekly Blood Pressure and Heart Rate Dashboard</h1>
    
    <Card>
    <CardHeader>
    <CardTitle>Blood Pressure Trends</CardTitle>
    </CardHeader>
    <CardContent>
    <BloodPressureChart />
    </CardContent>
    </Card>
    
    <Card>
    <CardHeader>
    <CardTitle>Heart Rate Trends</CardTitle>
    </CardHeader>
    <CardContent>
    <HeartRateChart />
    </CardContent>
    </Card>
    
    <Card>
    <CardHeader>
    <CardTitle>Detailed Readings</CardTitle>
    </CardHeader>
    <CardContent>
    <ReadingsTable />
    </CardContent>
    </Card>
    </div>
);

export default Dashboard;