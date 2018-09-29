import express from 'express';
import alisa from '../controllers';

const routes = express.Router({ mergeParams: true })

/**
 * @swagger
 * /devices:
 *   post:
 *     tags:
 *       - Alisa
 *     description: Alisa webhook
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: command executed
 *       400:
 *         description: bad request
 */

routes.route('/')
  .post(alisa)

module.exports = routes;