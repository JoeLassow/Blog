import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000

const blog_posts = []
const message = "This title already exists please enter a new one "

// Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

// Getting all pages

app.get("/", (req, res) => {
    res.render("home.ejs", {
        "posts": blog_posts
    })
})

app.get("/post", (req,res) => {
    res.render("post.ejs")
})

app.get("/edit", (req,res)=> {
    res.render("edit.ejs")
})

app.get("/delete", (req,res)=> {
    res.render("delete.ejs")
})

// Posting blogs to website
app.post("/submit", (req,res)=> {
    var alreadyExists = true
    
    var userBlogPost = {
        "title": req.body.title,
        "author": req.body.author,
        "content": req.body.content,
    }
    for (let i = 0;i<blog_posts.length; i++) {
        if (blog_posts[i]["title"] === userBlogPost["title"]) {            
            alreadyExists = false
        }}

    if (alreadyExists) {
    blog_posts.push(userBlogPost)
    console.log(blog_posts);
    res.render("home.ejs", {
        "posts": blog_posts
    })
    } else {
        res.render("post.ejs", {"message": message})
    }
    
})
 // Editing Blog posts 
app.post("/edit", (req,res)=> {   
    var targetPost = req.body.target    
    for (let i = 0; i< blog_posts.length; i++) {
        
        if (blog_posts[i]["title"] === targetPost) {
            
            blog_posts[i]["title"] = req.body.title
            blog_posts[i]["author"] = req.body.author
            blog_posts[i]["content"] = req.body.content
            
        }
    }
    res.render("home.ejs", {
        "posts": blog_posts
    })
})
 // Deleting blog posts 
app.post("/delete", (req,res) => {
    var postToDelete = req.body.delete    
    var correctIndex = blog_posts.length + 1
    for (let i = 0; i< blog_posts.length; i++) { 
        if (blog_posts[i]["title"] === postToDelete) {
            correctIndex = i
        }
    }
    
    blog_posts.splice(correctIndex, 1)
    res.render("home.ejs", {
        "posts": blog_posts
    })
    
})
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})