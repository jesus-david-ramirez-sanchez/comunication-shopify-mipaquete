const express = require('express');
import { installationBodyValidator } from "../../middleware/validationSchema";
import validateInstallationController from "./controller";

const router = express.Router();

router.post('/validateInstallation', installationBodyValidator, validateInstallationController);

export default router;