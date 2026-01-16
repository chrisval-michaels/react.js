import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Thermostat,
  Air,
  WaterDrop,
  Compress,
  Cloud,
} from "@mui/icons-material";

// WeatherAPI.com key
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY || "your_weatherapi_key_here";

function WeatherCard({ city, data, onAdd, onRemove }) {
  const current = data.current;

  return (
    <Card
      sx={{
        maxWidth: 300,
        m: 2,
        p: 2,
        boxShadow: 4,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
        {city}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {data.location.localtime}
      </Typography>

      <CardMedia
        component="img"
        sx={{ width: 100, mx: "auto" }}
        image={current.condition.icon}
        alt="weather icon"
      />

      <CardContent>
        <Typography><Thermostat color="error" /> Temp: {current.temp_c} °C</Typography>
        <Typography><Thermostat color="warning" /> Feels like: {current.feelslike_c} °C</Typography>
        <Typography><Air color="primary" /> Wind: {current.wind_kph} km/h</Typography>
        <Typography><WaterDrop color="info" /> Humidity: {current.humidity} %</Typography>
        <Typography><Compress color="success" /> Pressure: {current.pressure_mb} hPa</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {current.condition.text}
        </Typography>
      </CardContent>

      {onAdd && (
        <Button
          variant="contained"
          color="success"
          onClick={() => onAdd(city)}
          startIcon={<FavoriteBorder />}
          sx={{ mt: 1 }}
        >
          Add to Favourites
        </Button>
      )}
      {onRemove && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => onRemove(city)}
          startIcon={<Favorite />}
          sx={{ mt: 1 }}
        >
          Remove
        </Button>
      )}
    </Card>
  );
}

function App() {
  const [tab, setTab] = useState("home");
  const [city, setCity] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load favourites from localStorage on component mount
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (storedFavourites.length > 0) {
      setLoading(true);
      Promise.all(storedFavourites.map(cityName => fetchWeather(cityName)))
        .then(results => {
          const validResults = results.filter(Boolean);
          setFavourites(validResults);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );
      return { city: cityName, data: res.data };
    } catch (err) {
      console.error("Weather API Error:", err);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    
    setLoading(true);
    setError("");
    
    const result = await fetchWeather(city);
    setLoading(false);
    
    if (result) {
      setSearchResult(result);
    } else {
      setError("City not found! Please check the spelling and try again.");
    }
  };

  const addFavourite = async (cityName) => {
    const result = await fetchWeather(cityName);
    if (result) {
      const currentFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
      const updatedFavourites = [...new Set([...currentFavourites, cityName])];
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      setFavourites([...favourites, result]);
      setSearchResult(null);
    }
  };

  const removeFavourite = (cityName) => {
    const currentFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const updatedFavourites = currentFavourites.filter(c => c !== cityName);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    setFavourites(favourites.filter(f => f.city !== cityName));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f6f9" }}>
      <AppBar position="static" sx={{ backgroundColor: "#00796B" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Cloud /> Weather Forecast
          </Typography>
          <Box>
            <Button
              color="inherit"
              onClick={() => setTab("home")}
              sx={{
                borderBottom: tab === "home" ? "2px solid white" : "none",
                mx: 1,
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => setTab("favourites")}
              sx={{
                borderBottom: tab === "favourites" ? "2px solid white" : "none",
                mx: 1,
              }}
            >
              Favourites
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, textAlign: "center" }}>
        {tab === "home" && (
          <>
            <Typography variant="h5" gutterBottom>
              Search for a city's weather forecast
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mb: 3,
                flexWrap: "wrap",
              }}
            >
              <TextField
                label="City name"
                variant="outlined"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                error={!!error}
                helperText={error}
                disabled={loading}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{ backgroundColor: "#00796B" }}
              >
                {loading ? <CircularProgress size={24} /> : "Get Forecast"}
              </Button>
            </Box>

            {loading && <CircularProgress sx={{ mt: 2 }} />}
            
            {searchResult && !loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <WeatherCard
                  city={searchResult.city}
                  data={searchResult.data}
                  onAdd={addFavourite}
                />
              </Box>
            )}
          </>
        )}

        {tab === "favourites" && (
          <>
            <Typography variant="h5" gutterBottom>
              ⭐ Favourite Cities
            </Typography>
            
            {loading && <CircularProgress sx={{ mt: 2 }} />}
            
            <Grid container justifyContent="center">
              {favourites.length === 0 && !loading ? (
                <Typography>No favourites saved yet.</Typography>
              ) : (
                favourites.map((f) => (
                  <WeatherCard
                    key={f.city}
                    city={f.city}
                    data={f.data}
                    onRemove={removeFavourite}
                  />
                ))
              )}
            </Grid>
          </>
        )}
      </Container>

      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 2,
          mt: 4,
          backgroundColor: "#004D40",
          color: "white",
        }}
      >
        Weather App ©2025 Created by Valentine
      </Box>
    </Box>
  );
}

export default App;