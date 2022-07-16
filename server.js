const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path")
const coins = require("./Model.js")

mongoose.connect('mongodb+srv://sanjay:krishna@testcluster.lvmyd.mongodb.net/appquick?retryWrites=true&w=majority',()=>console.log("connecteted to db"))

app.use(express.static(path.join(__dirname, "client","build")))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get("/data",async(req,res)=>{
    console.log("request recevied")
    try {
        const coindata= await coins.find();
        res.send(coindata); 
    } catch(err){
        res.status(404).send("some error occured")
    }
})
app.post("/",async(req,res)=>{
    const coin = new coins({
        name:req.body.name,
        symbol:req.body.symbol,
        current_price:req.body.current_price,
        market_cap:req.body.market_cap,
        image:req.body.image
    })
    console.log(req.body.name)
    try{
        const data = await coin.save()
        res.json(data);
      }catch(err) {
          res.status(404).send("error")
      }
})

app.delete("/",async(req,res)=>{
    try {
        console.log(req.body.name)
        const removedCoin= await coins.remove({name:req.body.name});
                res.json(removedCoin); 
        }catch(err) {
            res.status(404).send("error")
        }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    console.log(req.body,req.params)
});

const PORT = process.env.PORT || 4000
app.listen(PORT,()=> console.log("server started at 4000"))