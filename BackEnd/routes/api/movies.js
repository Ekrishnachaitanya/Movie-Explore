// Getting Router
const express = require('express');
const router = express.Router();

//load Movie Model
const Movie = require('../../models/Movie');

// @route GET api/movies/test
// @description tests Movie route
// @access Public
router.get('/test',(req,res)=>res.send("Movie Router Testing!!"));

// @route GET api/movies
// @description Get All movies
// @access Public
router.get('/',(req,res)=>{
    Movie.find().sort({rating:'descending'})
    .then(movies=>res.json(movies))
    .catch(err=>res.status(404).json({noMovieFound:'No Movie Found'}));
});

// @route POST api/movies
// @description add movie
// @access Public
router.post('/',(req,res)=>{
    Movie.create(req.body)
    .then(movie=>{
        res.json({msg:"Movie Successfully Added!"})
    })
    .catch(err => res.status(400).json({ error: 'Unable to add this Movie' }));
});

// @route GET api/movies/:id
// @description Get single movie by id
// @access Public
router.get('/:id', (req, res) => {
  //console.log("hi");
    Movie.findById(req.params.id)
      .then(movie => {
        //console.log(movie);
        return res.json(movie);
      })
      .catch(err => res.status(404).json({ noMovieFound:'No Movie Found' }));
  });

// @route PUT api/movies/:id
// @description Update movie
// @access Public
router.put('/:id', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body)
      .then(movie => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });


// @route GET api/movies/:id
// @description Delete movie by id
// @access Public
router.delete('/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id, req.body)
      .then(movie => res.json({ mgs: 'Movie entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a Movie' }));
  });


router.get('/genre/:genre_name',(req,res)=>{
  //console.log(req.params.genre_name);
  let query = { "genre.name":req.params.genre_name};
  //console.log(query);
  Movie.find(query).sort({rating:'descending'})
  .then(movies=>res.json(movies))
  .catch(err=>res.status(404).json({noMovieFound:'No Movie Found'}));
});


module.exports = router;