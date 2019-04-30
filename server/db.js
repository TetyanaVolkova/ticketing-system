const Sequelize = require( 'sequelize' );
// Initialize dotenv to set up access to environmental variables
const dotenv = require( 'dotenv' );
dotenv.config();

const Op = Sequelize.Op;
console.log(process.env.DB_NAME);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    operatorsAliases: Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log( 'Successfully connected to db.' );
  })
  .catch( err => {
    console.error( process.env.DB_NAME );
  });

module.exports = sequelize;
