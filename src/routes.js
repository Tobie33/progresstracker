import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// WELCOME
router.get('/', (await import('./controllers/welcome.js')).default)

// AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)
router.get('/api/auth/logincheck', (await import('./controllers/api/auth/login-check.js')).default)

// USER

router.get('/api/users/:id', (await import('./controllers/api/user/user-show.js')).default)
router.get('/api/users', (await import('./controllers/api/user/user-index.js')).default)

// PROJECT
router.post('/api/projects', authenticateUser, (await import('./controllers/api/project/project-create.js')).default)
router.put('/api/projects/:pid', authenticateUser, (await import('./controllers/api/project/project-edit.js')).default)
router.get('/api/projects/:pid', authenticateUser, (await import('./controllers/api/project/project-show.js')).default)

// BRANCHES
router.post('/api/projects/:pid/branches', authenticateUser, (await import('./controllers/api/branch/branch-create.js')).default)
router.put('/api/projects/:pid/branches/:bid', authenticateUser, (await import('./controllers/api/branch/branch-edit.js')).default)

// POSTS
router.post('/api/projects/:pid/branches/:bid/posts', authenticateUser, (await import('./controllers/api/post/post-create.js')).default)
router.put('/api/projects/:pid/branches/:bid/posts/:postid', authenticateUser, (await import('./controllers/api/post/post-edit.js')).default)

export default router
