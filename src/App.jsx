import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Visualization from './components/Visualization'

function App() {
  const [data, setData] = useState(null)
  const [selectedCity, setSelectedCity] = useState('')
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const cityCoordinates = {
    delhi: { lat: 28.6139, lng: 77.2090, zoom: 11 },
    mumbai: { lat: 19.0760, lng: 72.8777, zoom: 11 },
    bangalore: { lat: 12.9716, lng: 77.5946, zoom: 11 },
    chennai: { lat: 13.0827, lng: 80.2707, zoom: 11 },
    kolkata: { lat: 22.5726, lng: 88.3639, zoom: 11 },
    hyderabad: { lat: 17.3850, lng: 78.4867, zoom: 11 },
    pune: { lat: 18.5204, lng: 73.8567, zoom: 11 },
    ahmedabad: { lat: 23.0225, lng: 72.5714, zoom: 11 }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/crime-data`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleVisualizationClick = () => {
    navigate('/visualization') 
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
  }

  const getMapUrl = () => {
    if (!selectedCity) {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.5099783447!2d78.96288!3d20.593684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1709654321!5m2!1sen!2sin"
    }
    
    const coords = cityCoordinates[selectedCity]
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.5099783447!2d${coords.lng}!3d${coords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2s${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}!5e0!3m2!1sen!2sin!4v1709654321!5m2!1sen!2sin&zoom=${coords.zoom}`
  }

  return (
    <Routes>
      <Route path="/visualization" element={<Visualization />} />
      <Route path="/" element={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-indigo-600">Crime Hotspots</h1>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={handleVisualizationClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                    Crime Map Analysis
                  </h2>
                  <div className="w-full md:w-64">
                    <select 
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
                    >
                      <option value="">Select a City</option>
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

                <div className="flex justify-center">
                  <iframe
                    src={getMapUrl()}
                    width="100%"
                    height="450"
                    style={{ border: 0, width: '75%' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-lg"
                  />
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-600">Total Crimes</h3>
                    <p className="text-2xl font-bold text-gray-800">1,234</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-600">Resolved Cases</h3>
                    <p className="text-2xl font-bold text-gray-800">892</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-600">Pending Cases</h3>
                    <p className="text-2xl font-bold text-gray-800">342</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      } />
    </Routes>
  )
}

export default App
