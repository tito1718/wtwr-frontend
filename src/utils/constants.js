export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear-day.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy-day.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog-day.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain-day.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow-day.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../assets/day/storm-day.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear-night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy-night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/fog-night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain-night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow-night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../assets/night/storm-night.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default-day.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default-night.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 40.7128,
  longitude: -74.006,
};
