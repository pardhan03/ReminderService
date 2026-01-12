const express = require('express');
const bodyparser = require('body-parser');
const cron = require('node-cron');

const { PORT } = require('./config/serverConfig');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    // app.use('/api', apiRoutes);

    // cron.schedule('* * * * *', () => {
    //     console.log('running a task every minute');
    // });

    app.listen(PORT, () => {
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        };
        console.log(`Server started at ${PORT}`)
    });
}

setupAndStartServer();