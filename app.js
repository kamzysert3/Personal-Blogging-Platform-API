const express = require('express');
const posts = require('./posts');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const git = require('simple-git')();

const app = express();
app.set('view engine', 'ejs');

const port = process.env.PORT || 3040;
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('public/images/uploads')) {
    fs.mkdirSync('public/images/uploads');
}

app.get('/', (req, res) => {
    var page = parseInt(req.query.page) || 1;
    const perPage = 3; // Number of posts per page
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / perPage);
    page = page <= totalPages ? page : totalPages;

    const paginatedPosts = posts.slice((page - 1) * perPage, page * perPage);

    res.render('index', {
        posts: posts,
        postInPage: paginatedPosts,
        currentPage: page,
        totalPages: totalPages
    });
})

var postId;

app.get('/posts', (req, res) => {
    postId = req.query.id;
    const post = posts.find(post => post.id == postId);
    if (post) {
        res.render('post-page', {
            posts: [post]
        });
    } else {
        res.status(404).render('not-found'); // Render a 404 page if the post is not found
    }
})
app.get('/blog-post', (req, res) => {
    const post = posts.find(post => post.id == postId);
    if (post) {
        res.redirect('/posts?id=' + postId);
    } else {
        res.status(404).render('not-found'); // Render a 404 page if the post is not found
    }
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/admin', (req, res) => {
    res.render('admin');
})

app.get('/new-post', (req, res) => {
    res.render('new-post');
})

app.post('/send-new-post', upload.single('image'), (req, res) => {
    const filePath = req.file.path;
    const formattedfilePath = filePath.replace("public\\", "")
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        image: formattedfilePath,
        date: req.body.date,
        tag: req.body.tag
    };
    posts.push(newPost);
    fs.writeFileSync('./posts.js', `const posts = ${JSON.stringify(posts, null, 2)}\nmodule.exports = posts;`);

    res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        console.error(`Error: ${err}`);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});