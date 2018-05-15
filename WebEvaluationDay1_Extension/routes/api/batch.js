const Batch=require('../../connection').Batch
const route=require('express').Router()
route.get('/:id?',(req,res)=>{
    var id=req.query.id;
    //console.log("in get"+id)
    Batch.findOne({        
        where:{
            id:req.query.id
        }
    })
    .then((batches)=>{
        res.status(200).send(batches)
    })
    .catch((error)=>{
        res.status(500).send({
            error: "Could not retrive batch"
        })
    })
})

route.post('/',(req,res)=>{
    Batch.create({
        name: req.body.name,
        CourseId: req.body.CourseId
    }).then((batch)=>{
        res.status(201).send(batch)
    }).catch((err)=>{
        res.status(501).send({
            error: "could not add new batch"+err
        })
    })
})

exports=module.exports=route
