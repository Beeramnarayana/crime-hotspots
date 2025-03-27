import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for different cities
const cityData = {
  delhi: {
    overall: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Theft Cases',
          data: [65, 59, 80, 81, 56],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Assault Cases',
          data: [28, 48, 40, 19, 86],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: 'Burglary Cases',
          data: [45, 25, 36, 67, 45],
          fill: false,
          borderColor: 'rgb(53, 162, 235)',
          tension: 0.1
        }
      ]
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Violent Crimes',
          data: [45, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: 'rgb(255, 159, 64)',
          tension: 0.1
        },
        {
          label: 'Property Crimes',
          data: [28, 48, 40, 19, 86, 27],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    },
    resolution: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Resolution Rate',
          data: [65, 72, 78, 82, 85],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    }
  },
  mumbai: {
    overall: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Theft Cases',
          data: [55, 49, 70, 71, 46],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Assault Cases',
          data: [38, 58, 50, 29, 76],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: 'Burglary Cases',
          data: [35, 15, 26, 57, 35],
          fill: false,
          borderColor: 'rgb(53, 162, 235)',
          tension: 0.1
        }
      ]
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Violent Crimes',
          data: [35, 49, 70, 71, 46, 45],
          fill: false,
          borderColor: 'rgb(255, 159, 64)',
          tension: 0.1
        },
        {
          label: 'Property Crimes',
          data: [18, 38, 30, 9, 76, 17],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    },
    resolution: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Resolution Rate',
          data: [75, 82, 88, 92, 95],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    }
  }
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Crime Statistics Over Years'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Cases'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Year'
      }
    }
  }
};

function Visualization() {
  const [selectedCity, setSelectedCity] = useState('delhi');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const getCityData = (city) => {
    return cityData[city] || cityData.delhi;
  };

  const currentData = getCityData(selectedCity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Crime Analytics Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedCity}
                onChange={handleCityChange}
                className="w-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
              >
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
                <option value="chennai">Chennai</option>
                <option value="kolkata">Kolkata</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="pune">Pune</option>
                <option value="ahmedabad">Ahmedabad</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Crime Statistics Chart */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)} Crime Trends
              </h2>
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            </div>
            <Line options={options} data={currentData.overall} />
          </div>

          {/* Monthly Crime Trends */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Monthly Crime Trends
              </h2>
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <Line 
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: 'Monthly Crime Statistics'
                  }
                }
              }} 
              data={currentData.monthly}
            />
          </div>

          {/* Crime Resolution Rate */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Crime Resolution Rate
              </h2>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <Line 
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: 'Crime Resolution Rate Over Time'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Resolution Rate (%)'
                    }
                  }
                }
              }} 
              data={currentData.resolution}
            />
          </div>

          {/* Summary Statistics */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Summary Statistics
              </h2>
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-indigo-600">Total Crimes</h3>
                <p className="text-2xl font-bold text-gray-800">1,234</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-green-600">Resolved Cases</h3>
                <p className="text-2xl font-bold text-gray-800">892</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-red-600">Pending Cases</h3>
                <p className="text-2xl font-bold text-gray-800">342</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-yellow-600">Resolution Rate</h3>
                <p className="text-2xl font-bold text-gray-800">72%</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Visualization; 