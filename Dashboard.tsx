import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar
} from 'recharts';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
`;

const FilterContainer = styled.div`
  margin-top: 20px;
`;

interface ActivityData {
  time: string;
  commits: number;
  pullRequests: number;
  merges: number;
  meetings: number;
  documentation: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string>('commits');

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error setting data", error);
      }
    };
    getData();
  }, []);

  const handleActivityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivity(event.target.value);
  };

  return (
    <Container>
      <h1>Developer Activity Dashboard</h1>
      <FilterContainer>
        <label htmlFor="activity">Select Activity: </label>
        <select id="activity" value={selectedActivity} onChange={handleActivityChange}>
          <option value="commits">Commits</option>
          <option value="pullRequests">Pull Requests</option>
          <option value="merges">Merges</option>
          <option value="meetings">Meetings</option>
          <option value="documentation">Documentation</option>
        </select>
      </FilterContainer>
      <ChartContainer>
        {selectedActivity === 'commits' && (
          <>
            <h2>Commits Throughout the Day</h2>
            <LineChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="commits" stroke="#8884d8" />
            </LineChart>
          </>
        )}
        {selectedActivity === 'pullRequests' && (
          <>
            <h2>Pull Requests Throughout the Day</h2>
            <BarChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pullRequests" fill="#82ca9d" />
            </BarChart>
          </>
        )}
        {selectedActivity === 'merges' && (
          <>
            <h2>Merges Throughout the Day</h2>
            <BarChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="merges" fill="#8884d8" />
            </BarChart>
          </>
        )}
        {selectedActivity === 'meetings' && (
          <>
            <h2>Meetings Throughout the Day</h2>
            <LineChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="meetings" stroke="#82ca9d" />
            </LineChart>
          </>
        )}
        {selectedActivity === 'documentation' && (
          <>
            <h2>Documentation Throughout the Day</h2>
            <LineChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="documentation" stroke="#8884d8" />
            </LineChart>
          </>
        )}
      </ChartContainer>
    </Container>
  );
};

export default Dashboard;
