const express = require( 'express' );
const readModels = require( '../read-models' );
const Models = require('../models');
const router = express.Router();

// Routes:


router.get( '/api/crs_list', ( req, res ) => {
  readModels.Crs.findAll({
    include: [
      {
        model: readModels.Regulatory
      },
      {
        model: readModels.Laboratories,
        include: [
          {
            model: readModels.Crs,
            as: 'related_lab',
            attributes: ['crs_id', 'crs_name', 'crs_type']
          }
        ]
      }
    ],
    order: ['crs_id']
  })
    .then( crsList => {
      res.json( crsList );
    })
    .catch( err => {
      console.error( err );
    });
});

// Getting Laboratories
// router.get( '/api/lab_list', ( req, res, next ) => {

//   readModels.Laboratories.findAll({
//   })
//     .then( Laboratories => {
//       res.json( Laboratories );
//     })
//     .catch( err => {
//       console.error( err );
//     });
// });

// Getting Tickets
router.get( '/api/tickets_list', ( req, res, next ) => {
  Models.Tickets.findAll({
  })
    .then( tickets => {
      res.json( tickets );
    })
    .catch( err => {
      console.error( err );
    });
});

// Getting Regulatory
// router.get( '/api/regulatory_list', ( req, res, next ) => {
//   readModels.Regulatory.findAll({
//   })
//     .then( regulatory => {
//       res.json( regulatory );
//     })
//     .catch( err => {
//       console.error( err );
//     });
// });

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
