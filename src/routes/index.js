const express = require("express");
const router = express.Router();
const metricsRoutes = require("./metrics");
const notificationsRoutes = require("./notifications");
const { Metric, Notification } = require('../models');

const jsPDF = require("jspdf");

router.use("/metrics", metricsRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/doc", async (req, res) => {
	const doc = new jsPDF.jsPDF({
		format: "a4",
	});
    const metrics = await Metric.find({});
    doc.setFont('Times New Roman');
	doc.setFontSize(24);
	doc.text('Metrics report', 15, 25);
    doc.setFontSize(12);
    metrics.forEach((metric, index) => {
        const text = `${metric.name}: ${metric.value}${metric.type !== 'default' ? '%' : ''}`;
        doc.text(text, 25, 35 + index * 10);
    });
    const notifications = await Notification.find({});
    doc.setFont('Times New Roman');
	doc.setFontSize(24);
	doc.text('Notifications report', 15, metrics.length * 10 + 35);
    doc.setFontSize(12);
    notifications.forEach((notification, index) => {
        const text = `observerId: ${notification.observerId}\nruleId: ${notification.ruleId}\nmessage: ${notification.message}\ndate: ${notification.date.toISOString()}\nmethod: ${notification.method}\n`
        doc.text(text, 25, metrics.length * 10 + 45 + index * 35);
    });
	const myPDF = doc.output();
	res
		.status(200)
		.set({ "content-type": "application/pdf; charset=utf-8" })
		.send(myPDF);
});

module.exports = router;
