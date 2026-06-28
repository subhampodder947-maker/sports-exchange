const cricketApi = require("../config/cricketApi");

const getLiveMatches = async (req, res) => {
  try {
    const response = await cricketApi.get("/currentMatches");

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: error.response?.data || error.message,
    });
  }
};

module.exports = { getLiveMatches };