import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Fix Leaflet default marker icons (they break in React by default)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function App() {
  const [courses, setCourses] = useState([]);

  // Load JSON data
  useEffect(() => {
    fetch("/golf-courses.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load golf course data");
        }
        return response.json();
      })
      .then((data) => setCourses(data.courses))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id="map">
      <MapContainer
        center={[62.0, 25.0]} // Centered over Finland
        zoom={6}
        className="leaflet-container"
      >
        {/* OpenStreetMap base layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Loop through courses and add markers */}
        {courses.map((course, index) => (
          <Marker key={index} position={[course.lat, course.lng]}>
            <Popup>
              <div style={{ textAlign: "center", maxWidth: "200px" }}>
                <h3>{course.course}</h3>
                <p><strong>Type:</strong> {course.type}</p>
                <p><strong>Address:</strong> {course.address}</p>
                <p><strong>Phone:</strong> {course.phone}</p>
                <p><strong>Email:</strong> {course.email}</p>
                <a href={course.web} target="_blank" rel="noreferrer">
                  Visit Website
                </a>
                <br />
                {/* <img
                  src={course.image}
                  alt={course.course}
                  style={{
                    width: "100px",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                /> */}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
