const db = require("./database");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => {
    res.json ({message: "API hellor world test"});
})

router.get('/clientes', async function(req, res){
    try{
        res.json(await db.findCustomers());

    } catch (err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
})

router.get('/clientes/:id?', async function(req, res){
    try {
        if(req.params.id){
            res.json(await db.findCustomer(req.params.id));
        } else
            res.json(await db.findCustomers());
    } catch (err){
        console.log(err);
        res.status(500).json({message: "Cannot find on our database"});
    }
})

router.post('/clientes', async function(req, res, next){
    try{
        const customer = req.body;
        await db.insertCustomer(customer);
        res.json({message: "New customer added"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error on insert"});
    }
})

router.put('/clientes/:id', async function(req, res, next){
    try{
        const customer = req.body;
        await db.updateCustomer(req.params.id, customer);
        res.json({message: "Customer updated"})
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error on update"});
    }
})

router.patch('/clientes/:id', async function(req, res){
    try{
        await db.patchCustomer(req.params.id, req.body);
        res.json({message: "Field Updated"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Failed"});
    }
})

router.delete('/clientes/:id', async function(req, res){
    try{
        await db.deleteCustomer(req.params.id);
        res.json({message: "Deleted"})
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Failed"});
    }
})

app.use('/', router);


app.listen(port);
console.log("Work")