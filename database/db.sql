 drop database kma_student_management;
 
 create database kma_student_management;
 use kma_student_management;

 create table student_class(
	id varchar(16) primary key,
    class_name nvarchar(15)
    
 );
 
  create table faculty (
	id varchar(16) primary key,
    faculty_name nvarchar(20)
 );
 
  create table subjects (
	id varchar(16) primary key,
    subject_name nvarchar(25)
 );
 
  create table schedules(
	id varchar(16) primary key,
    start_time varchar(16),
    end_time varchar(16)
 );
 
  create table major (
	id varchar(16) primary key,
    faculty_id varchar(16),
    major_name nvarchar(20),
    
    foreign key (faculty_id) references faculty(id)
 );
 
 create table users (
		uid varchar(16) primary key,
        hashed_password varchar(80) not null,
		first_name nvarchar(30),
        last_name nvarchar(30),
        email nvarchar(40) not null,
        phone_number varchar(10),
        address nvarchar(40),
        date_of_birth varchar(15),
        citizen_id varchar(15),
        religion nvarchar(20),
        nationality nvarchar(20),
        gender enum('male', 'female', 'other'),
        role_name enum('admin','student')
); 

 create table student (
	id varchar(20) primary key,
    uid varchar(16) not null,
    class_id varchar(20),
    major_id varchar(20),
    year_of_addmission int,
    graduation_year int,
    
    foreign key (uid) references users(uid),
    foreign key (class_id) references student_class(id),
	foreign key (major_id) references major(id)
 );
 
  create table lecturer(
	id varchar(20) primary key,
    faculty_id varchar(16),
    
    foreign key (faculty_id) references faculty(id)
 );
 
 create table subject_class(
	id varchar(16) primary key,
    subject_id varchar(16),
    lecturer_id varchar(16),
    schedule_id varchar(16),
    
    foreign key (subject_id) references subjects(id),
    foreign key (lecturer_id) references lecturer(id),
    foreign key (schedule_id) references schedules(id)
 );
 

 
 create table student_subject_class(
	id varchar(16) primary key,
    student_id varchar(16),
    subject_class_id varchar(16),
    
    foreign key (student_id) references student(id),
    foreign key (subject_class_id) references subject_class(id)
 );
 
 create table score(
	subject_id varchar(16),
    student_id varchar(16),
    TP1 float,
    TP2 float,
    HK float,   
    
    foreign key (student_id) references student(id),
    foreign key (subject_id) references subjects(id)
 );
 
 
 select * from Users;
 