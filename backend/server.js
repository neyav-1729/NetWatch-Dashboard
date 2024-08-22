const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/network-monitoring', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MetricSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  value: Number,
});

const Metric = mongoose.model('Metric', MetricSchema);

app.use(cors());
app.use(express.json());

app.get('/api/metrics', async (req, res) => {
  try {
    const metrics = await Metric.find();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
