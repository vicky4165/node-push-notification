const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey =
  "BLl_-p0Q4-U6Hs8m3gWM-XNqorKczVjoDNogwxD-NeyJi1K7RC59OjFHgf9xLA_aE-j9HmUdLQtq-3jP1hwRoiw";
const privateVapidKey = "5SeQmePbMcod2KC1lA90wwBn9KwWNaObSmfDNjKskAM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
