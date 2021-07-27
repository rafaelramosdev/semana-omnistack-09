import { Router } from 'express';

import multer from 'multer';

import SessionController from './controllers/SessionController';
import SpotController from './controllers/SpotController';
import DashboardController from './controllers/DashboardController';
import BookingController from './controllers/BookingController';
import ApprovalController from './controllers/ApprovalController';
import RejectionController from './controllers/RejectionController';

import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);

routes.post('/bookings/:booking_id/rejections', RejectionController.store);

export default routes;
