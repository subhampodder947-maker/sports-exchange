const cricketApi = require("../config/cricketApi");

const getOdds = async (req, res) => {
  try {
    const { matchId } = req.params;

    const response = await cricketApi.get(`/match_info?apikey=${process.env.CRIC_API_KEY}&id=${matchId}`);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: error.response?.data || error.message,
    });
  }
};

module.exports = { getOdds };