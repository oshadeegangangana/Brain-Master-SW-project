# for install needed Node Modules
npm i --save express sequelize mysql2 body-parser fastest-validator cors
sequelize init

# Tables initiation

# User
sequelize model:generate --name User --attributes f_name:string,l_name:string,email:string,mobile_no:string,age:integer,password:string,role:string,total_marks:float

# Paper
sequelize model:generate --name Paper --attributes paper_name:string,paper_type:string,added_by:integer

# GK-Question
sequelize model:generate --name GK_Question --attributes paper_id:integer,question:string,option_1:string,option_2:string,option_3:string,option_4:string,answer:string

# IQ-Question
sequelize model:generate --name IQ_Question --attributes paper_id:integer,question_type:string,question:string,option_1:string,option_2:string,option_3:string,option_4:string,answer:string

# Exam
sequelize model:generate --name Exam --attributes paper_id:integer,participant_user:integer,marks:float

# Optional | not activated yet

# Question
sequelize model:generate --name Question --attributes asked_by:integer,question:string,status:string

# Answer
sequelize model:generate --name Answer --attributes question_id:integer,answered_by:integer,answer:string

# News
sequelize model:generate --name News --attributes title:string,news_body:string,added_by:integer

# Event
sequelize model:generate --name Event --attributes title:string,desc:string,date:string,venue:string,added_by:integer

# Advertisement 
sequelize model:generate --name Advertisement --attributes desc:string,ad_img:string,status:string,added_by:integer,approved_by:integer

# Knowledge
sequelize model:generate --name Knowledge --attributes desc:string,file:string,added_by:integer