const express = require('express');
const blogController = require('../controllers/blogController');
const { ensureAuthenticated} = require('../config/auth');


const router = express.Router();




router.get('/', blogController.blog_index );
router.post('/', ensureAuthenticated, blogController.blog_create_post);
router.get('/create', ensureAuthenticated, blogController.blog_create_get);
router.get('/:id', ensureAuthenticated, blogController.blog_details );
router.delete('/:id', ensureAuthenticated, blogController.blog_delete );


module.exports = router;



