const Course=require('../../connection').Course
const Batch=require('../../connection').Batch
const Lecture=require('../../connection').Lecture
const Teacher=require('../../connection').Teacher
const Student=require('../../connection').Student
const Subject=require('../../connection').Subject
const StudentBatchMapper=require('../../connection').StudentBatchMapper

const route=require('express').Router()



route.use('/:id/batches/:id2/lectures/:id3?',(req,res)=>{
    var varid=req.params.id3;
    console.log("in three");
    if(varid){
        Lecture.findOne({
            where:{
                id:req.params.id3,
                BatchId:req.params.id2
            },
            include:[{
                model:Batch,
                include:[Course]
            }]            
        })
        .then((lecture)=>{
           // res.json(lecture)
            res.status(200).send(lecture)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive batches."
            })
        })        
    }
    else{
        Lecture.findAll({
            where:{
                BatchId:req.params.id2
            },
            include:[{
                model:Batch,
                include:[Course]
            }]
        })
        .then((lecture)=>{
            res.json(lecture)
           // res.status(200).send(batches)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
    }
})

route.use('/:id/batches/:id2/students',(req,res)=>{
    // res.status(500).send({
    //     error: "Could not retrive batches and student"
    // })
    StudentBatchMapper.findAll({
        where:{
            BatchId:req.params.id2
        },
        include:[Batch,Student]
    })
    .then((mapper)=>{
       // res.json(lecture)
        res.status(200).send(mapper)
    })
    .catch((error)=>{
        res.status(500).send({
            error: "Could not retrive batches and student"
        })
    })
})

route.use('/:id/batches/:id2/teachers',(req,res)=>{
    Teacher.findAll({
        include:[{
            model:Subject,
            include:[{
                model:Course,
                include:[Batch]
            }]
        }],
        where:{
            //Subject.Course.Batch.id:id2,
            BatchId:req.params.id2
        },
        include:[{
            model:Subject,
            include:[Course]
        }]
    })
    .then((teacher)=>{
        //res.json()
        res.status(200).send(teacher)
    })
    .catch((error)=>{
        res.status(500).send({
            error: "Could not retrive batches and teacher"
        })
    })
})

route.use('/:id/batches/:id2?',(req,res)=>{
    var id=req.params.id2;
    console.log("in get 2"+id)
    if(id){
        Batch.findAll({        
            
            where:{
                CourseId:req.params.id,
                id:req.params.id2
            },
            include:Course
        })
        .then((batches)=>{
            res.json(batches)
            //res.status(200).send(courses)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
    }
    else{
        Batch.findAll()
        .then((batches)=>{
            res.json(batches)
           // res.status(200).send(batches)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
    }
})

route.get('/:id?',(req,res)=>{
    var id=req.params.id;
    console.log("in get 1"+id)
    if(id){
        Course.findOne({        
            where:{
                id:req.params.id
            }
        })
        .then((courses)=>{
            res.json(courses)
            //res.status(200).send(courses)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive courses"
            })
        })
    }
    else{
        Course.findAll()
        .then((courses)=>{
            res.json(courses)
           // res.status(200).send(courses)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive courses"
            })
        })
    }
})


route.post('/',(req,res)=>{
    Course.create({
        name: req.body.name
    }).then((course)=>{
        res.status(201).send(course)
    }).catch((err)=>{
        res.status(501).send({
            error: "could not add new course"+err
        })
    })
})

exports=module.exports=route
