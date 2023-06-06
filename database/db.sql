 drop database kma_student_management;
 
 create database kma_student_management;
 use kma_student_management;

 create table student_classes(
	id varchar(16) primary key,
    class_name nvarchar(40)
 );
 
  create table faculties (
	id int AUTO_INCREMENT primary key,
    faculty_name nvarchar(40)
 );
 
  create table subjects (
	id varchar(16) primary key,
    credits int,
    subject_name nvarchar(40)
 );
 
  create table schedules(
	id varchar(16) primary key,
    start_time varchar(16),
    end_time varchar(16)
 );
 
  create table majors (
	id int AUTO_INCREMENT primary key,
    faculty_id int,
    major_name nvarchar(40),
    
    foreign key (faculty_id) references faculties(id)
 );
 
 create table users (
		uid varchar(16) primary key,
        hashed_password varchar(80) not null,
		first_name nvarchar(30),
        last_name nvarchar(30),
        email nvarchar(40) not null,
        phone_number varchar(10),
        address nvarchar(80),
        nation nvarchar(20),
        date_of_birth varchar(15),
        citizen_id varchar(20),
        religion nvarchar(20),
        nationality nvarchar(20),
        gender enum('male', 'female', 'other'),
        role_name enum('admin','student')
); 

 create table students (
	id varchar(20) primary key,
    uid varchar(16) not null,
    class_id varchar(16),
    major_id int,
    year_of_admission int,
    graduation_year int,
    
    foreign key (uid) references users(uid),
    foreign key (class_id) references student_classes(id),
	foreign key (major_id) references majors(id)
 );
 
  create table lecturers(
	id  varchar(20) primary key,
    faculty_id int,
    lecturer_name nvarchar(40),
    
    foreign key (faculty_id) references faculties(id)
 );
 
 create table subject_classes(
	id varchar(16) primary key,
    subject_id varchar(16),
    lecturer_id varchar(16),
    schedule_id varchar(16),
    class_name nvarchar(40),
    
    foreign key (subject_id) references subjects(id),
    foreign key (lecturer_id) references lecturers(id),
    foreign key (schedule_id) references schedules(id)
 );
 

 
 create table student_subject_classes(
	id int AUTO_INCREMENT primary key,
    student_id varchar(16),
    subject_class_id varchar(16),
    
    foreign key (student_id) references students(id),
    foreign key (subject_class_id) references subject_classes(id)
 );
 
 create table scores(
	id int auto_increment primary key,
	subject_id varchar(16),
    student_id varchar(16),
    TP1 float,
    TP2 float,
    HK float,   
    
    foreign key (student_id) references students(id),
    foreign key (subject_id) references subjects(id)
 );
 
 -- sample data for testing
 
 -- insert khoa
insert into faculties (faculty_name) values ('Cơ bản');
insert into faculties (faculty_name) values ('Công nghệ thông tin');
insert into faculties (faculty_name) values ('An toàn thông tin');
insert into faculties (faculty_name) values ('Điện tử viễn thông');

-- insert chuyên ngành
insert into majors (faculty_id, major_name) values (2,'Phát triển phần mềm nhúng');
insert into majors (faculty_id, major_name) values (2,'Phát triển phần mềm di động');
insert into majors (faculty_id, major_name) values (3,'An toàn mạng');
insert into majors (faculty_id, major_name) values (3,'An toàn hệ thống');
 
 -- insert student class
insert into student_classes ( id, class_name) values ('CT4D','CT4D');
insert into student_classes ( id, class_name) values ('CT5D','CT5D');
insert into student_classes ( id, class_name) values ('AT16D','AT16D');
insert into student_classes (id, class_name) values ('DT4B','DT4B');

-- insert giang vien
insert into lecturers (id, faculty_id, lecturer_name) values ('GV010001',2,'Cao Thanh Vinh');
insert into lecturers (id, faculty_id, lecturer_name)  values ('GV010002',2,'Nguyễn Đào Trường');
insert into lecturers (id, faculty_id, lecturer_name)  values ('GV010003',2,'Lê Đức Thuận');
insert into lecturers (id, faculty_id, lecturer_name)  values ('GV010004',1,'Nguyễn Thị Bích Ngọc');

-- insert lich hoc
insert into schedules (id,start_time,end_time) values ('ca1','7:00','12:30');
insert into schedules (id,start_time,end_time) values ('ca2','12:30','16:00');
insert into schedules (id,start_time,end_time) values ('ca3','16:00','21:00');

-- insert subject
insert into subjects (id,credits,subject_name) values ('cnpm','2','Công nghệ phần mềm');
insert into subjects (id,credits,subject_name) values ('ktct','2','Kinh tế chính trị');
insert into subjects (id,credits,subject_name) values ('ltw','2','Lập trình web');

-- insert subject class

insert into subject_classes (id,subject_id,lecturer_id,schedule_id,class_name) values('cnpm1','cnpm','GV010001','ca1','Công nghệ phần mềm 01');
insert into subject_classes (id,subject_id,lecturer_id,schedule_id,class_name) values('cnpm2','cnpm','GV010002','ca2','Công nghệ phần mềm 02');
insert into subject_classes (id,subject_id,lecturer_id,schedule_id,class_name) values('ltw1','ltw','GV010002','ca2','Lập trình web 01');
insert into subject_classes (id,subject_id,lecturer_id,schedule_id,class_name) values('ltw2','ltw','GV010003','ca3','Lập trình web 02');
insert into subject_classes (id,subject_id,lecturer_id,schedule_id,class_name) values('ktct1','ktct','GV010004','ca1','Công nghệ phần mềm 01');

-- insert user
insert into users (uid,hashed_password,first_name,last_name,email,phone_number,address,nation,date_of_birth,citizen_id,religion,nationality,gender,role_name) 
values ('7760636423614133','$2b$10$CU2YdkTwfaum391rHZ0jJu70ACvIMm1g/O9c4DCi7HtQtgYvIM4tu','Hoàng Văn','Giang','admin@gmail.com','123456789','123 Nguyen Van Linh','Kinh','1999-01-01','123456789','Không','Vietnam','male','admin');

insert into users (uid,hashed_password,first_name,last_name,email,phone_number,address,nation,date_of_birth,citizen_id,religion,nationality,gender,role_name) 
values ('d871b2a935f14b17','$2b$10$2kBT.C.sGFR0bRd1xRYxM.gxpXlzoasMRGweWFJMwxzGCMwmgkj6q','Hoang Van','Giang','student@gmail.com','123456789','123 Nguyen Van Linh','Kinh','1999-01-01','123456789','Không','Vietnam','male','student');

insert into users (uid,hashed_password,first_name,last_name,email,phone_number,address,nation,date_of_birth,citizen_id,religion,nationality,gender,role_name) 
values ('e04946e681ab4897','$2b$10$2sJ5Sac53ljFwLruM8dLyO7rkZq6wrD3vUo/.l0WWNlgzcsW5Zb7G',' Trần Văn','An','student2@gmail.com','123456789','123 Nguyen Van Linh','Kinh','1999-01-01','123456789','Không','Vietnam','male','student');

-- insert students
insert into students (id, uid, class_id, major_id,year_of_admission, graduation_year) values
('CT050413','d871b2a935f14b17','CT5D',2,2020,2025);

insert into students (id, uid, class_id, major_id,year_of_admission, graduation_year) values
('CT050415','e04946e681ab4897','AT16D',1,2020,2025);

insert into student_subject_classes(student_id, subject_class_id) values ('CT050413','cnpm1');
insert into student_subject_classes(student_id, subject_class_id) values ('CT050415','ltw1');

insert  into scores(subject_id, student_id, TP1, TP2, HK) values ('cnpm','CT050413',9.0,9.2,9);

select * from students;
 select * from users;
 select * from majors;
 select * from faculties;
 select * from subjects; 
 select * from lecturers;
 select * from scores;
 select * from subject_classes;
 select * from schedules;
 select * from student_subject_classes;
 select * from student_classes;
 
 