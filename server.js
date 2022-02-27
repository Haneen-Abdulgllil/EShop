
import express from 'express';
import fetch from 'node-fetch';
const app = express();


app.listen(process.env.PORT || 4000);

app.set('view engine' , 'ejs');
app.set('views','View');
app.use(express.static('assets'));


// app.get("/",(req,res)=>{
//     res.render('index');
// })

// app.get("/index",(req,res)=>{
//     res.render('index');
// })

app.get('/product/category/:category', async (req, response) => {

    let category = req.params.category;
    var response = await fetch('https://dummyjson.com/products/category/' +category)
        .then(res => res.json())
        .then(res => response.render('category', { products: res.products, categories: res.category }));

});



app.get('/product/search', async (req, response) => {
    if (req.query.hasOwnProperty('q')) {
        let results = await fetch('https://dummyjson.com/products/search?q=' + req.query.q)
            .then(res => res.json())
            .then(res => response.render('search', { products: res.products, categories: null }));
    }

});



app.get("/contact",(req,res)=>{
    res.render('contact');
})

app.get("/new",(req,res)=>{
    res.render('new');
})


app.get("/shop-grid",(req,res)=>{
    res.render('shop-grid');
})


app.get("/checkout",(req,res)=>{
    res.render('checkout');
})

app.get("/blog-single-sidebar",(req,res)=>{
    res.render('blog-single-sidebar');
})


app.get("/cart",(req,res)=>{
    res.render('cart');
})

app.get("/product",async(req,response)=>{
    let result = await fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res=>response.render('product',{products:res.products}) );
    
});

app.get('/:prod_id([0-9]{0,10})', async (req, response) => {
    let categories = await fetch('https://dummyjson.com/products/categories').then(res => res.json()).then(res => res.slice(0, 9));
    if (req.params.prod_id) {
        fetch('https://dummyjson.com/products/' + req.params.prod_id)
            .then(res => res.json())
            .then(res => response.render('product_details', { products: res, categories: categories }));
    }
    else {
        fetch('https://dummyjson.com/products/')
            .then(res => res.json())
            .then(res => response.render('index', { products: res.products, categories: categories }));
    }
});





console.log("server started");

