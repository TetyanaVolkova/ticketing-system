
const Laboratories = require( './Laboratories' );
const Regulatory = require( './Regulatory' );
const Crs = require('./Crs');
const Crs_lab = require('./Crs_lab');

Crs.hasOne( Regulatory, {
  foreignKey: 'crs_id'
});
Regulatory.belongsTo( Crs, {
  foreignKey: 'crs_id'
});
Crs.belongsToMany( Laboratories,
  {
    through: Crs_lab,
    foreignKey: 'crs_id'
  }
);
Laboratories.belongsToMany( Crs,
  {
    through: Crs_lab,
    foreignKey: 'lab_id',
    as: 'related_lab',
  }
);

module.exports = {
  Laboratories: Laboratories,
  Regulatory: Regulatory,
  Crs: Crs,
  Crs_lab: Crs_lab
};
