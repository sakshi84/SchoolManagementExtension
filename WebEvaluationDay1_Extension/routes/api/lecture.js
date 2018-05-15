const Lecture=require('../../connection').Lecture
const route=require('express').Router()
route.get('/:id?',(req,res)=>{
    var id=req.query.id;
    //console.log("in get"+id)
    Lecture.findOne({        
        where:{
            id:req.query.id
        }
    })
    .then((lectures)=>{
        res.status(200).send(lectures)
    })
    .catch((error)=>{
        res.status(500).send({
            error: "Could not retrive lectures"
        })
    })
})

route.post('/',(req,res)=>{
    Lecture.create({
        name: req.body.name,
        BatchId: req.body.BatchId,
        TeacherId: req.body.TeacherId,
        SubjectId: req.body.SubjectId
    }).then((lectures)=>{
        res.status(201).send(lectures)
    }).catch((err)=>{
        res.status(501).send({
            error: "could not add new lecture"+err
        })
    })
})

exports=module.exports=route
