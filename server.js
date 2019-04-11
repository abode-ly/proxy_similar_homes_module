const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/photosandcomments/89', (req,res) => {
  axios.get('http://localhost:3001/photosandcomments/89:1')
    .then(result => res.send(result.data))
    .catch(err => res.status(404).end(err))
});

app.get('/bookings/:accommodationid/reserve', (req, res) => {
  const id = req.params.accommodationid
    axios.get(`http://localhost:3003/bookings/${id}/reserve`)
    .then(result => res.send(result.data))
    .catch(err => res.status(404).end(err))
});

app.get('/bookings/:accommodationid/reserve/:startDate&:endDate', (req, res) => {
    const start = new Date(req.params.startDate);
    const current = new Date(req.params.endDate);
    const id = req.params.accommodationid
      axios.get(`http://localhost:3003/bookings/?${id}/reserve/${start}&${current}`)
        .then(result => res.send(result.data))
        .catch(err => res.status(404).end(err)); 
});

app.get('/abodes/:abode_id/reviews', (req, res) => {
  const abodeid = req.params.abode_id; 
    axios.get(`http://localhost:3002/abodes/${abodeid}/reviews`)
      .then(result => res.send(result.data))
      .catch(err => res.status(404).end(err))
});


app.get('/similarhomes/:host_id/nearby', (req, res) => {
  const hostId = req.params.host_id
  axios.get(`http://localhost:3004/similarhomes/${hostId}/nearby`)
    .then(result => res.send(result.data))
    .catch(err => res.status(404).end(err))
});



app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
