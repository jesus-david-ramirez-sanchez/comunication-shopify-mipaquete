const express = require('express');
import { validateCarrierService } from "../../middleware/validationSchema";
import { carrierServiceController } from "./controller";


const router = express.Router();

router.post('/carrierService', validateCarrierService, carrierServiceController);

export default router;