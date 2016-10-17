-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: ebay
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `EmailId` varchar(45) NOT NULL,
  `Password` varchar(250) NOT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `CreditCardNumber` varchar(45) DEFAULT NULL,
  `DateOfBirth` datetime DEFAULT NULL,
  `LastLoggedIn` datetime DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='Will hold data for all the users (Sellers and buyers)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Gaurang','Mhatre','gaurangmhatre@gmail.com','$2a$10$uUmaWV59Ef.pIgFUL/nRAuPw4lmlX8NAT9PovmfdSRC9LZgQymyQS','san jose','12344674678966','1985-10-02 00:00:00','2016-10-16 14:25:21'),(2,'test','test','test@test.com','$2a$10$uUmaWV59Ef.pIgFUL/nRAuPw4lmlX8NAT9PovmfdSRC9LZgQymyQS','san diego','12344674678965','1985-04-02 00:00:00',NULL),(3,'Casey','Neistat','casey@gmail.com','$2a$10$uUmaWV59Ef.pIgFUL/nRAuPw4lmlX8NAT9PovmfdSRC9LZgQymyQS','New York','1234567891234567','1985-03-03 00:00:00','2016-10-16 02:27:54'),(4,'Tim','Ferriss','tim@sgmail.com','$2a$10$uUmaWV59Ef.pIgFUL/nRAuPw4lmlX8NAT9PovmfdSRC9LZgQymyQS','Taxas','9876543210987654','1985-03-02 00:00:00',NULL),(5,'Jay','Nirgudkar','jay@gmail.com','$2a$10$uUmaWV59Ef.pIgFUL/nRAuPw4lmlX8NAT9PovmfdSRC9LZgQymyQS','San Jose State University','1234567892134567','1990-02-02 00:00:00','2016-10-11 23:10:06'),(6,'Nitin','Gove','nitin@gmail.com','$2a$10$OD3fPMMSmBzlA38wUa/Twe.SQMYUhXuzzEuHpxJDZkvcaWDRAziFu','San Fernando','7894561230789456','2002-02-02 00:00:00',NULL),(7,'Kaushik','rama','kaushik@gmail.com','$2a$10$Jo0gXZmNNaYhfoU6jFCvD.paRV/xxXWCOqMSaLhmO6b7fqp3S71W6','san jose','1234567890123456','1992-02-02 00:00:00',NULL),(8,'durvesh','patil','durvesh@gmail.com','$2a$10$me6S0wcTdiJ1zCEFs/9keOQfT.iUtXVbwOd4./QDh4DbmmcknKnb6','san jose','1234567890123465','2011-01-01 00:00:00',NULL),(9,'a','b','a@b.com','$2a$10$p28HpH4bt9trSJ0/BvPhxuDC6hMxipj7Oo3vtXLF4VnPBZkBRPsyW','s','1324567890123456','1993-01-01 00:00:00',NULL),(10,'sagar','mane','sagar@gmail.com','$2a$10$rRcUBT2YJMbzYN5rkuiVDecwBriTlBbbfiRxAoITOoZsm9S4CdOkm','sa jose','1234567890123465','2001-01-01 00:00:00','2016-10-14 14:13:05'),(11,'Gaurang','Mhatre','gaurang@gmail.com','$2a$10$PZcsMqAf9WeiyeMpDy.SdOgNaqK/Jt5.LZLByU0zJVI2aAGfYYaPK','San Jose State University','undefined','1992-01-01 00:00:00','2016-10-16 20:00:17');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-16 23:36:17
