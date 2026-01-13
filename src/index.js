const express = require('express');
const bodyparser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const TicketController = require('./controllers/ticket-controller');
const { setupJobs } = require('./utils/job');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () => {
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        };
        console.log(`Server started at ${PORT}`)
    });
}

setupAndStartServer();