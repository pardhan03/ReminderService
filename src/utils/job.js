const cron = require('node-cron');

/**
 * 10:10 am
 * Every 5 minutes
 * we will check their any pending email which was expected to sent by now and is pending
 */

const { fetchPendingEmails, updateTicket } = require('../services/email-service');
const { sendEmail } = require('../config/emailConfig');

const setupJobs = () => {
    cron.schedule('*/5 * * * *', async () => {
        const response = await fetchPendingEmails();
        response.forEach((email) => {
            sendEmail({
                from: 'manish.deliverable@gmail.com',
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    await emailService.updateTicket(email.id, { status: "SUCCESS" });
                }
            });
        });
        console.log(response)
    });
};

module.exports = {
    setupJobs,
};
