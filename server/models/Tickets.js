const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Tickets = db.sequelize.define(
  'tickets',
  {
    ticket_id:{ type: Sequelize.INTEGER, primaryKey: true },
    lab_reg: Sequelize.STRING,
    reg_id: Sequelize.INTEGER,
    lab_id: Sequelize.INTEGER,
    ticket_date: Sequelize.DATE,
    ticket_status: Sequelize.STRING,
    ticket_email: Sequelize.STRING,
    ticket_fullname: Sequelize.STRING,
    ticket_atr: Sequelize.STRING,
    ticket_old_value: Sequelize.STRING,
    ticket_new_value: Sequelize.STRING
  },
  { underscored: true }
);

module.exports = Tickets;
