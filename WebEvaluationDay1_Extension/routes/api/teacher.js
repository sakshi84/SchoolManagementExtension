const Teacher=require('../../connection').Teacher
const Batch=require('../../connection').Batch
const Subject=require('../../connection').Subject
const Course=require('../../connection').Course

const route=require('express').Router()

route.get('/:id?',(req,res)=>{
    var id=req.params.id;
    //console.log("in get1"+id)
    if(id){
        Teacher.findOne({        
            where:{
                id:req.params.id
            },
            include:Subject
        })
        .then((teachers)=>{
            res.json(teachers)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive teachers"
            })
        })
    }
    else{
        Teacher.findAll({
            include:Subject
        })
        .then((teachers)=>{
            res.json(teachers)
           // res.status(200).send(teachers)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive teachers"
            })
        })
    }
})

route.use('/:id/batches',(req,res)=>{
    var id=req.params.id;
    //console.log("in get 2"+id)
    Teacher.findAll({        
        where:{
            id:req.params.id,
        },
        include:[{
            model:Subject,
            include:[{
                model:Course,
                include:[Batch]}]
        }]
        //include:Batch
    })
    .then((teachers)=>{
        res.json(teachers)
        //res.status(200).send(courses)
    })
    .catch((error)=>{
        res.status(500).send({
            error: "Could not retrive teachers"
        })
    })
})

route.post('/',(req,res)=>{
    Teacher.create({
        name: req.body.name,
        SubjectId: req.body.SubjectId
    }).then((teachers)=>{
        res.status(201).send(teachers)
    }).catch((err)=>{
        res.status(501).send({
            error: "could not add new teacher"+err
        })
    })
})

exports=module.exports=route
