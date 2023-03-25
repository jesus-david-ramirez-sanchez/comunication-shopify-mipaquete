const express = require('express');
import { validateAuthenticationService } from "../../middleware/validationSchema";
import authenticationController from "./controller";

const router = express.Router();

router.post('/authentication', validateAuthenticationService, authenticationController);

export default router;