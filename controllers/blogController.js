const Blog = require('../models/blog');
const User = require('../models/User');

//* Code for getting and rendering all post articles on index
const blog_index = (req, res) =>{
    Blog.find().sort ({ createdAt: -1 })
    .then((result) =>{
      res.render('blogs/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) =>{
      console.log(err);
    });
}
//* Code for getting and rendering the details on one post article on click or redirecr user to 404 page if  a post does not exist
const blog_details = (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
     .then(result => {
       res.render('blogs/details', { blog: result, title: 'Blog Details'});
     })
     .catch( err => {
       res.status(404).render('404', { title: 'Blog not found' });
     });
}

//* Code for getting and rendering the create new post page
const blog_create_get = (req, res) =>{
    res.render('blogs/create', { title: 'Create a new blog' });
}
//* Code for posting a new page
const blog_create_post = (req, res) =>{
    const blog = new Blog(req.body);
  
    blog.save()
      .then((result) =>{
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
}
//* Code for deleting a new page
const blog_delete = (req, res) =>{
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err =>{
        console.log(err);
      });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
}