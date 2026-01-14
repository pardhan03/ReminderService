const express = require('express');
const bodyparser = require('body-parser');

const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');

const { subscribeEvents } = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');
const { setupJobs } = require('./utils/job');
const { createChannel, subscribeMessage } = require('./utils/messageQueue');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.post('/api/v1/tickets', TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel, subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        };
        console.log(`Server started at ${PORT}`)
    });
}

setupAndStartServer();