import express from "express";
import multer from "multer";
import path from "path";
import ejs from "ejs";

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({ storage });

let blogs = [];

app.get('/',(req,res)=>{
    res.render("index.ejs",{blogs});
});

app.post("/submit", upload.single('image') ,(req, res) =>{
    const {title,content} = req.body;
    const imagePath = `/uploads/${req.file.filename}`;
    blogs.push({title,content,imagePath});
    res.redirect('/');
})

app.listen(port,() =>{
    console.log(`port ${port} is active`);
})