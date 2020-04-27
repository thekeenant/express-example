require('dotenv').config()
const express = require('express');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const app = express();
const port = 3000;

// Allow for parsing forms or JSON request data.
app.use(express.urlencoded());
app.use(express.json());

// Frontend (HTML/CSS static files)
app.use(express.static('public'));

// Backend
app.post('/hello', function(req, res) {
  const who = req.body.who;
  res.json({
    message: 'Hello, ' + who + '!'
  });
});

const toneAnalyzer = new ToneAnalyzerV3({
  authenticator: new IamAuthenticator({ apikey: process.env.TONE_ANALYZER_API_KEY }),
  version: '2017-09-21',
  url: process.env.TONE_ANALYZER_URL
});

app.post('/analyze', function(req, res) {
  const text = req.body.text;
  toneAnalyzer.tone({
    toneInput: text,
    contentType: 'text/plain'
  }).then(response => {
    const result = response.result;
    console.log(result);
    res.json({
      analysis: response.result
    });
  }).catch(err => {
    console.log(err);
  });
});

// Start the server
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));