const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function getMatches() {
  const response = await fetch(`${API_URL}/api/matches/live`);
  const data = await response.json();

  return data.data || [];
}