const express = require( 'express' );
const models = require( '../models' );
const router = express.Router();

// Routes:

// Getting Laboratories
router.get( '/api/lab_list', ( req, res ) => {
  models.Laboratories.findAll({
  })
    .then( Laboratories => {
      res.json( Laboratories );
    })
    .catch( err => {
      console.error( err );
    });
});

router.post("/api/lab_list", (req, res, next) => {
  // const laboratories = new models.Laboratories({
  //   lab_id: req.body.lab_id,
  //   lab_name: req.body.lab_name
  // })
  console.log('---------------------------');
  console.log('---------------------------');
  console.log('---------------------------');
  console.log('---------------------------');
  console.log('---------------------------');
  console.log('---------------------------');
  console.log('---------------------------');
  const labs = req.body[0];
  console.log(labs);
  models.Laboratories.create( labs )
  .then(result => {
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log(result.dataValues)
    res.json( result.dataValues );
    console.log('Created Product');
  })
  .catch(err => {
    console.log(err);
  });
});

// router.post( '/api/lab_list', ( req, res ) => {
//   console.log(req);
//   const title = req.body.title;
//   models.Laboratories.create({
//     lab_name: title
//   })
//   .then(result => {
//     // console.log(result);
//     console.log('Created Product');
//   })
//   .catch(err => {
//     console.log(err);
//   });
// });

// Find a crsCoordinator and return the associated upd_time
router.get( '/api/last_reviewed', ( req, res ) => {
  models.Crs_coordinator.findOne()
    .then( crsCoordinator => {
      let lastReviewed = crsCoordinator.upd_time;
      res.json( lastReviewed );
    })
    .catch( err => {
      console.error( err );
    });
});

module.exports = router;
