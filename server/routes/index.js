const express = require( 'express' );
const readModels = require( '../read-models' );
const Models = require('../models');
const router = express.Router();

// Routes:

// Getting Laboratories
router.get( '/api/lab_list', ( req, res, next ) => {

  readModels.Laboratories.findAll({
  })
    .then( Laboratories => {
      res.json( Laboratories );
    })
    .catch( err => {
      console.error( err );
    });
});

// Getting Tickets
router.get( '/api/tickets_list', ( req, res, next ) => {
  Models.Tickets.findAll({
  })
    .then( Tickets => {
      res.json( Tickets );
    })
    .catch( err => {
      console.error( err );
    });
});

// Getting Regulatory
router.get( '/api/regulatory_list', ( req, res, next ) => {
  readModels.Regulatory.findAll({
  })
    .then( regulatory => {
      res.json( regulatory );
    })
    .catch( err => {
      console.error( err );
    });
});

router.post("/api/tickets_list", (req, res, next) => {
  const tickets = req.body;
  Models.Tickets.create( tickets )
  .then(result => {
    // console.log('---------------------------');
    // console.log('---------------------------');
    // console.log('---------------------------');
    // console.log('---------------------------');
    // console.log('---------------------------');
    // console.log('---------------------------');
    // console.log('---------------------------');
    // console.log(result.dataValues)
    res.json( result.dataValues );
    console.log('Created Product');
  })
  .catch(err => {
    console.log(err);
  });
});

router.delete("/api/lab_list:id", (req, res, next) => {
  // console.log('---------------------------');
  // console.log('---------------------------');
  // console.log('---------------------------');
  // console.log('---------------------------');
  // console.log('---------------------------');
  // console.log('---------------------------');
  // console.log('---------------------------');
  // console.log(req.params.id);
  readModels.Laboratories.findOne( {where: {'lab_id': req.params.id}} )
  .then(lab => {
    lab.destroy();
  })
  .catch(err => console.log(err));

  res.status(200).json({ message: "Post deleted" });
})

module.exports = router;
