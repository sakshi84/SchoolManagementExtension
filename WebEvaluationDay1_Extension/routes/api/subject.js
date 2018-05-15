const Subject=require('../../connection').Subject
const Batch=require('../../connection').Batch
const Lecture=require('../../connection').Lecture
const Teacher=require('../../connection').Teacher
const Course=require('../../connection').Course


const route=require('express').Router()

route.get('/:id?',(req,res)=>{
    var id=req.params.id;
    console.log("in get subject 1"+id)
    if(id){
        Subject.findOne({        
            where:{
                id:req.params.id
            },
            include:Course
        })
        .then((subjects)=>{
            res.json(subjects)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive subjects"
            })
        })
    }
    else{
        Subject.findAll({
            include:Course
        })
        .then((subjects)=>{
            res.json(subjects)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive subjects"
            })
        })
    }
})

route.use('/:id/teachers',(req,res)=>{
    var id=req.params.id2;
    console.log("in get 2"+id)

    Subject.findAll({        
        where:{
            id:req.params.id,
        },
        include:Teacher
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
    Subject.create({
        name: req.body.name,
        CourseId:req.body.CourseId
    }).then((subjects)=>{
        res.status(201).send(subjects)
    }).catch((err)=>{
        res.status(501).send({
            error: "could not add new subjects"+err
        })
    })
})

exports=module.exports=route
