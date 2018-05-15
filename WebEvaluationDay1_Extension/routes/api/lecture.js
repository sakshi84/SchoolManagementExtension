const Teacher=require('../../connection').Teacher
const Batch=require('../../connection').Batch
const Subject=require('../../connection').Subject
const Course=require('../../connection').Course

const route=require('express').Router()

route.get('/:id?',(req,res)=>{
    var id=req.params.id;
    //console.log("in get1"+id)
    if(id){
        Lecture.findOne({        
            where:{
                id:req.params.id
            },
            include:[Subject,Teacher,Batch]
        })
        .then((lectures)=>{
            res.json(lectures)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive lectures"
            })
        })
    }
    else{
        Lecture.findAll({
            include:[Subject,Teacher,Batch]

        })
        .then((lectures)=>{
            //res.json(lectures)
           res.status(200).send(lectures)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive lectures"
            })
        })
    }
})

route.use('/:id/batches',(req,res)=>{
    var id=req.params.id;
    //console.log("in get 2"+id)
    Lecture.findAll({        
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
    .then((lectures)=>{
        res.json(lectures)
        //res.status(200).send(courses)
    })
    .catch((error)=>{
        res.status(500).send({
            error: "Could not retrive lectures"
        })
    })
})

route.post('/',(req,res)=>{
    Lecture.create({
        name: req.params.name,
        SubjectId: req.params.SubjectId,
        BatchId:req.params.BatchId,
        TeacherId:req.params.TeacherId

    }).then((lectures)=>{
        res.status(201).send(lectures)
    }).catch((err)=>{
        res.status(501).send({
            error: "could not add new lecture"+err
        })
    })
})

exports=module.exports=route
