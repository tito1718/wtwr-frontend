import { describe, expect, it } from "vitest";
import { filterWeatherData } from "./weatherApi";

const createWeatherResponse = (temperature, condition = "Clear") => ({
  name: "New York",
  main: { temp: temperature },
  weather: [{ main: condition }],
  sys: {
    sunrise: 0,
    sunset: 9999999999,
  },
});

describe("filterWeatherData", () => {
  it.each([
    [85, "hot"],
    [70, "warm"],
    [45, "cold"],
    [20, "freezing"],
  ])("classifies %i°F as %s weather", (temperature, expectedType) => {
    const result = filterWeatherData(createWeatherResponse(temperature));

    expect(result.type).toBe(expectedType);
  });

  it("converts Fahrenheit to Celsius", () => {
    const result = filterWeatherData(createWeatherResponse(68));

    expect(result.temperature).toEqual({
      F: 68,
      C: 20,
    });
  });

  it.each([
    ["Clouds", "cloudy"],
    ["Drizzle", "rain"],
    ["Thunderstorm", "storm"],
    ["Mist", "fog"],
  ])("normalizes %s to %s", (condition, expectedCondition) => {
    const result = filterWeatherData(
      createWeatherResponse(68, condition)
    );

    expect(result.condition).toBe(expectedCondition);
  });
});
