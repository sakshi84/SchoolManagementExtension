const Sequelize = require('sequelize')

const db = new Sequelize('lmsdb', 'lms', 'lmspass', {
    dialect: 'sqlite',
    host: 'localhost',
    // port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './lmsdb.db'
})

const Batch = db.define('Batch', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
})    

const Subject = db.define('Subject', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    }
}) 

const Course = db.define('Course', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    }
}) 

const Lecture = db.define('Lecture', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    }
}) 

const Student = db.define('Student', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    }
}) 

const Teacher = db.define('Teacher', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    }
}) 

const StudentBatchMapper = db.define('StudentBatchMapper', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
})    

Batch.belongsTo(Course);
Course.hasMany(Batch);

Subject.belongsTo(Course);
Course.hasMany(Subject);

Teacher.belongsTo(Subject);
Subject.hasMany(Teacher);

Lecture.belongsTo(Batch);
Batch.hasMany(Lecture);

Lecture.belongsTo(Teacher);
Teacher.hasMany(Lecture);

Lecture.belongsTo(Subject);
Subject.hasMany(Lecture);

StudentBatchMapper.belongsTo(Student);
Student.hasMany(StudentBatchMapper);

StudentBatchMapper.belongsTo(Batch);
Batch.hasMany(StudentBatchMapper);

db.sync()
    .then(()=>console.log("DataBase has been synced"))
    .catch((error)=> console.error("Error Creating Database"))

exports=module.exports={
    Batch,Teacher,Course,Student,Lecture,Subject,StudentBatchMapper
}