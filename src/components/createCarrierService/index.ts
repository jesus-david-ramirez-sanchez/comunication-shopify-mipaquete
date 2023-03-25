const express = require('express');

import { validateCreateCarrierService } from "../../middleware/validationSchema";
import createCarrierServiceController from "./controller";

const router = express.Router();

router.post('/createCarrierService', validateCreateCarrierService, createCarrierServiceController);

export default router;