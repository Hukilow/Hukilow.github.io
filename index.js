const express = require('express');
const path = require('path');
const app = express();
// ...other code...
// Serve static files from the 'public' directory where 'index.html' is located.
app.use(express.static(path.join(__dirname, './')));

//index.js

// async function fetchItems() {
//   try {
//     // Fetch the items from the API endpoint
//     let response = await fetch('/api/items');
//     let data = await response.json();
//     // Let's log the data to see what items we got from the database
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }
// fetchItems();

async function createUser(username, userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, userData })
    });
    if (response.ok) {
      console.log('User saved successfully.');
    } else {
      console.error('Failed to save user.');
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchUser(username) {
  try {
    const response = await fetch(`/api/users/${username}`);
    if (response.ok) {
      const data = await response.json();
      console.log('User data:', data);
    } else {
      console.error('User not found.');
    }
  } catch (error) {
    console.error(error);
  }
}