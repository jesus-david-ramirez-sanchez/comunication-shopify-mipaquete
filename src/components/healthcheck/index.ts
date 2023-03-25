const express = require('express');

const router = express.Router();

import healthcheck  from './controller';

router.get('/healthcheck', healthcheck);

export default router;
