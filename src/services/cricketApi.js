const API_KEY = "bc8b3f50-cdb4-4421-82c4-f1ae0992a57a";

export async function getMatches() {
  const response = await fetch(
    `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
  );

  const data = await response.json();

  return data.data || [];
}