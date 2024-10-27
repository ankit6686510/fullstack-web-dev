const express = require("express");
const app = express();

// Express middleware that limits the number of requests a user can make in a given time frame.
const ratelimiter = (req, res, next) => {
  if (!req.session) req.session = {};

  const currentTime = Date.now();
  req.session.requests = req.session.requests || []; // Fix: changed 'request' to 'requests'

  // Filter out requests older than 1 minute
  req.session.requests = req.session.requests.filter(
    (timeStamp) => currentTime - timeStamp < 60000
  );

  if (req.session.requests.length >= 5) {
    return res.status(429).json({ message: "Rate limit exceed ho chuka h" });
  }
  
  req.session.requests.push(currentTime);
  next();
};

// Applying rate limit middleware to all routes
app.use(ratelimiter);

app.get("/", (req, res) => {
  res.send("Welcome to express app!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
