require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // Allow your frontend server
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 1000,
    temperature: 0.3
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Make sure API key is configured
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const prompt = `As UNSW's PDP advisor, provide concise, accurate information about:
    - Program structure (workshops + volunteer experience)
    - Eligibility requirements
    - Application process for Term 3 2025
    - Australian workplace culture
    - Interview preparation
    
    Question: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({
      text: response.text()
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Unable to process request',
      details: error.message
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});