const Student=require('../../connection').Student
const Batch=require('../../connection').Batch
const StudentBatchMapper=require('../../connection').StudentBatchMapper
const Course=require('../../connection').Course

const route=require('express').Router()

route.get('/:id?',(req,res)=>{
    var id=req.params.id;
    //console.log("in get1"+id)
    if(id){
        Student.findOne({        
            where:{
                id:req.params.id
            }
        })
        .then((students)=>{
            res.json(students)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive students"
            })
        })
    }
    else{
        Student.findAll()
        .then((student)=>{
            res.json(student)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive Student"
            })
        })
    }
})

route.use('/:id/batches',(req,res)=>{
    var id=req.params.id;
    //console.log("in get 2"+id)
    StudentBatchMapper.findAll({   
        where:{
            StudentId:req.params.id,
        },
        include:[{
            model:Student,
            include:[Batch]
    }]
    })
    .then((studentBatchMapper)=>{
        res.json(studentBatchMapper)
        //res.status(200).send(courses)
    })
    .catch((error)=>{
        res.status(500).send({
            error: "Could not retrive studentBatchMapper"
        })
    })
})

route.post('/',(req,res)=>{
    Student.create({
        name: req.body.name,
    }).then((student)=>{
        res.status(201).send(student)
    }).catch((err)=>{
        res.status(501).send({
            error: "could not add new student"+err
        })
    })
})

exports=module.exports=route
