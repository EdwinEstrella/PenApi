import { Router } from 'express';
import { AuthController } from '@api/controllers/auth.controller';
import { authMiddleware } from '@api/guards/auth.guard';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/plans', authController.getPlans.bind(authController));

// Protected routes (require JWT)
router.use(authMiddleware);
router.get('/profile', authController.getProfile.bind(authController));
router.get('/instance-limit', authController.getInstanceLimit.bind(authController));
router.get('/instances', authController.getUserInstances.bind(authController));

export { router as AuthRouter };