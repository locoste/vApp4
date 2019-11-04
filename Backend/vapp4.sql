create database vapp4;
use vapp4;

create table cps(
id int auto_increment primary key,
cps_libele varchar(64),
ip_adress varchar(15),
cps_port int);

create table control (
id int auto_increment primary key,
cps int, 
mo varchar(256), 
ope varchar(256), 
product varchar(256),
customer varchar(64), 
product_cost int,
ressource_cost int, 
control_type varchar(64), 
control_size varchar(64), 
measure varchar(64), 
max_tolerence int,
foreign key (cps) references cps(id));

create table documents(
id int auto_increment primary key,
document_name varchar(64),
id_dcme varchar(64)
);

CREATE TABLE customer (
  customer_id int(6) NOT NULL AUTO_INCREMENT,
  company varchar(30) DEFAULT NULL,
  contact varchar(30) DEFAULT NULL,
  email varchar(30) DEFAULT NULL,
  phone_number varchar(30) DEFAULT NULL,
  PRIMARY KEY (customer_id)
);
INSERT INTO `customer` VALUES (1,'APR','Benjamin','informatique@apr.eu','0478023365'),(2,'APR','Toto','informatique@apr.eu','06369202111'),(3,'APR','Benjamin','benjamin@apr.eu','0659779794'),(4,'APR','Arnaud','alouvel@apr.eu','0478023351'),(5,'Admin','Benjamin Menghini','admin@admin.fr','0478023365'),(6,'TARDY','Yannick Gerphagnon','ygerphagnon@tardy.fr','0478023365'),(7,'GE','Nadine Morelo','n.morello@ge.com','0472685241'),(8,'IVECO','Loic Masson','loic.masson@iveco.com','0475962584'),(9,'ECAR','Marc Thomas','mthomas@ecar.fr','0467856931');

CREATE TABLE `documents` (
  `document_id` int(6) NOT NULL AUTO_INCREMENT,
  `document_name` varchar(256) DEFAULT NULL,
  `dcme_3dscan` varchar(30) DEFAULT NULL,
  `adress_id` varchar(256) DEFAULT NULL,
  `feature` int(6) DEFAULT NULL,
  `project` int(6) DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `feature` (`feature`),
  KEY `project` (`project`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`feature`) REFERENCES `features` (`feature_id`),
  CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`project`) REFERENCES `project` (`project_id`)
);
CREATE TABLE `users` (
  `user_id` int(6) NOT NULL AUTO_INCREMENT,
  `login` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `customer` int(6) DEFAULT NULL,
  `role` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `customer` (`customer`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`customer`) REFERENCES `customer` (`customer_id`)
);
INSERT INTO `users` VALUES (1,'informatique@apr.eu','mozilla69',1,'APR'),(3,'benjamin@apr.eu','toto',3,'guest'),(4,'alouvel@apr.eu','toto',4,'guest'),(5,'admin@admin.fr','admin',5,'guest'),(6,'ygerphagnon@tardy.fr','tardy',6,'guest');

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`session_id`)
);