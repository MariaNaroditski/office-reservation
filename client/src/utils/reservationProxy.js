const URL = "http://localhost:8080/reservation-data";

const headers = {
  "Content-Type": "application/json",
};

export async function getCalculatedCsvData(year, month) {
  try {
    const response = await fetch(`${URL}?year=${year}&month=${month}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const postCsvFile = async (parsedData) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(parsedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return "Success";
  } catch (error) {
    console.log("Error", error);
    return "Fail";
  }
};
