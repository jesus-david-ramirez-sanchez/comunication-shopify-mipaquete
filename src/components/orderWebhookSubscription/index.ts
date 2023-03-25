const express = require('express');
import { validateWebhookSubscription } from "../../middleware/validationSchema";
import webhookSubscriptionController from "./controller";

const router = express.Router();

router.post('/orderWebhookSubscription', validateWebhookSubscription, webhookSubscriptionController);

export default router;