-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: tripper
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `idAlbum` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `idTrip` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `cover` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`idAlbum`),
  KEY `album_trip_fk` (`idTrip`),
  CONSTRAINT `album_trip_fk` FOREIGN KEY (`idTrip`) REFERENCES `trip` (`idTrip`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (16,'4d2de23a-965e-42dd-ae2a-b46f1cce6a0f',10,'First','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fgeorge1.jpg?alt=media&token=d8b42ded-3802-4487-95e9-af4228bfa841'),(17,'f77e205b-fa54-44a2-a7cd-5ff6594a1a0f',10,'Second','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fh1.png?alt=media&token=107ad43c-122e-4b6f-bd6b-a03fb45c99f1'),(19,'b34cf642-4e0b-4829-9c48-a2e33281ee17',10,'Canelones','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fbar.webp?alt=media&token=4b67c367-79be-4ad4-9357-161256f3ec95');
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrental`
--

DROP TABLE IF EXISTS `carrental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrental` (
  `idCarRental` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `idEvent` int DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `features` set('AIR_CONDITIONED','BLUETOOTH','SMOKE_FREE','CONNECTED_CAR') DEFAULT NULL,
  `seats` int DEFAULT NULL,
  `doors` int DEFAULT NULL,
  `cost` decimal(8,2) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `pickupDate` datetime DEFAULT NULL,
  `dropoffDate` datetime DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `mpg` varchar(10) DEFAULT NULL,
  `transmission` enum('AUTOMATIC','MANUAL') NOT NULL,
  PRIMARY KEY (`idCarRental`),
  KEY `idPerson` (`idPerson`),
  KEY `carRental_event_fk` (`idEvent`),
  CONSTRAINT `carRental_event_fk` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE,
  CONSTRAINT `carrental_ibfk_1` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrental`
--

LOCK TABLES `carrental` WRITE;
/*!40000 ALTER TABLE `carrental` DISABLE KEYS */;
INSERT INTO `carrental` VALUES (4,2,NULL,'Kia Rio','AIR_CONDITIONED',5,5,208.47,'https://www.avis.com/content/dam/cars/l/2018/kia/2018-kia-rio-ex-hatchback-white.png','2021-06-02 00:00:00','2021-06-04 00:00:00','SYD',NULL,'AUTOMATIC'),(14,2,46,'Kia Rio','AIR_CONDITIONED,SMOKE_FREE',5,4,157.29,'https://www.avis.com/content/dam/cars/l/2019/ford/2019-ford-fiesta-se-5door-2wd-hatchback-white.png','2021-06-10 19:58:14','2021-06-12 19:58:14','Miami International Airport','27/35','AUTOMATIC'),(15,3,49,'Seat Ibiza','AIR_CONDITIONED',4,5,61.42,'https://www.avis.com/content/dam/cars/l/2018/seat/2018-seat-ibiza-reference-5door-hatchback-white.png','2021-07-17 11:40:00','2021-07-19 11:40:00','Barajas Airport',NULL,'MANUAL'),(16,3,50,'Opel Crossland X','AIR_CONDITIONED',5,5,81.30,'https://www.avis.com/content/dam/cars/l/2018/opel/2018-opel-grandland-x-innovation-suv-white.png','2021-07-17 11:52:53','2021-07-19 11:52:53','Barajas Airport',NULL,'MANUAL');
/*!40000 ALTER TABLE `carrental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `idEvent` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `idTrip` int NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `type` enum('FLIGHT','HOTEL','RESTAURANT','POI','CAR_RENTAL') NOT NULL,
  `includesTime` tinyint(1) DEFAULT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  PRIMARY KEY (`idEvent`),
  KEY `event_trip_fk` (`idTrip`),
  CONSTRAINT `event_trip_fk` FOREIGN KEY (`idTrip`) REFERENCES `trip` (`idTrip`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (6,'52283b0a-d2b5-11eb-bb75-54e1ad512f86',10,'Tokyo','FLIGHT',0,'2021-05-26','2021-05-29'),(20,'522aa341-d2b5-11eb-bb75-54e1ad512f86',10,'Sydney','FLIGHT',0,'2021-05-27','2021-05-30'),(23,'522aa5b4-d2b5-11eb-bb75-54e1ad512f86',10,'Tokyo','FLIGHT',0,'2021-05-24','2021-05-28'),(26,'522aa7aa-d2b5-11eb-bb75-54e1ad512f86',10,'93 Macquarie Street, 93','HOTEL',0,'2021-05-29','2021-05-29'),(27,'522aaa07-d2b5-11eb-bb75-54e1ad512f86',10,'55 Shelley Street, 55','HOTEL',0,'2021-05-29','2021-05-29'),(28,'522aabcc-d2b5-11eb-bb75-54e1ad512f86',10,'28 Spring Street, Bondi Junction, -','HOTEL',0,'2021-05-30','2021-05-31'),(42,'522aadb2-d2b5-11eb-bb75-54e1ad512f86',10,'2100 NW 42nd Ave, Terminal D East, Gate D23, Miami, FL 33166','RESTAURANT',1,'2021-06-01','2021-06-01'),(45,'522aaf6c-d2b5-11eb-bb75-54e1ad512f86',10,'Lincoln Rd (btwn West & Washington Ave), Miami Beach','POI',1,'2021-06-01','2021-06-01'),(46,'522ab11a-d2b5-11eb-bb75-54e1ad512f86',10,'Miami International Airport','CAR_RENTAL',1,'2021-06-10','2021-06-12'),(47,'522ab317-d2b5-11eb-bb75-54e1ad512f86',10,'1817 James Avenue','HOTEL',0,'2021-06-18','2021-06-20'),(48,'02fc55ff-1229-4da1-985d-6d1fcc156c6f',10,'Av. dos Cavaleiros, 60 (R. da Quinta do Salrego), 2790-045 Oeiras','POI',1,'2021-07-08','2021-07-08'),(49,'cf13cf13-4674-41b2-88fe-9e0d92556c3b',20,'Barajas Airport','CAR_RENTAL',1,'2021-07-17','2021-07-19'),(50,'b54cdd54-078a-413d-807d-09501d876225',22,'Barajas Airport','CAR_RENTAL',1,'2021-07-17','2021-07-19');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `idFavorite` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `code` varchar(50) NOT NULL,
  `type` enum('RESTAURANT','POI','HOTEL') NOT NULL,
  PRIMARY KEY (`idFavorite`),
  KEY `idPerson` (`idPerson`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (5,2,'103677','HOTEL'),(7,2,'hZm7TunlrksQbgS0ssXbUg','RESTAURANT'),(8,2,'Gv5X1-qLTGZbwoz829-Xxg','RESTAURANT'),(9,2,'4a5884e9f964a52088b71fe3','POI'),(10,2,'4abd5b7df964a520e68920e3','POI'),(11,2,'4b479d70f964a520773726e3','POI'),(12,2,'4f05e5919a523e111faa1a45','POI'),(14,2,'4d09e3bb9de0b1f7c6258053','POI'),(15,2,'4b0588a1f964a520d8d022e3','POI'),(16,2,'4b0588a8f964a520d6d222e3','POI'),(17,2,'4b0d9f73f964a5207d4c23e3','POI');
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight` (
  `idFlight` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `idEvent` int DEFAULT NULL,
  `flightClass` enum('ECONOMY','PREMIUM_ECONOMY','BUSINESS','FIRST') NOT NULL,
  `total` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`idFlight`),
  KEY `idPerson` (`idPerson`),
  KEY `flight_event_fk` (`idEvent`),
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`) ON DELETE CASCADE,
  CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
INSERT INTO `flight` VALUES (8,2,23,'ECONOMY',3614.19),(10,2,NULL,'ECONOMY',3582.45),(11,2,NULL,'ECONOMY',3735.46),(17,2,6,'ECONOMY',4140.22),(31,2,20,'ECONOMY',21621.84),(33,3,NULL,'ECONOMY',1942.09);
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flightitinerary`
--

DROP TABLE IF EXISTS `flightitinerary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flightitinerary` (
  `idFlightItinerary` int NOT NULL AUTO_INCREMENT,
  `idFlight` int NOT NULL,
  `duration` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idFlightItinerary`),
  KEY `flightItinerary_flight_fk` (`idFlight`),
  CONSTRAINT `flightitinerary_ibfk_1` FOREIGN KEY (`idFlight`) REFERENCES `flight` (`idFlight`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flightitinerary`
--

LOCK TABLES `flightitinerary` WRITE;
/*!40000 ALTER TABLE `flightitinerary` DISABLE KEYS */;
INSERT INTO `flightitinerary` VALUES (8,8,'PT29H36M'),(9,8,'PT44H9M'),(10,10,'PT29H36M'),(11,10,'PT44H9M'),(12,11,'PT24H32M'),(13,11,'PT22H55M'),(24,17,'PT26H10M'),(25,17,'PT24H28M'),(51,31,'PT32H55M'),(52,31,'PT28H50M'),(55,33,'PT8H10M'),(56,33,'PT8H35M');
/*!40000 ALTER TABLE `flightitinerary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flightsegment`
--

DROP TABLE IF EXISTS `flightsegment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flightsegment` (
  `idFlightSegment` int NOT NULL AUTO_INCREMENT,
  `idFlightItinerary` int DEFAULT NULL,
  `duration` varchar(20) DEFAULT NULL,
  `carrier` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idFlightSegment`),
  KEY `flightSegment_flightItinerary_fk` (`idFlightItinerary`),
  CONSTRAINT `flightsegment_ibfk_1` FOREIGN KEY (`idFlightItinerary`) REFERENCES `flightitinerary` (`idFlightItinerary`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flightsegment`
--

LOCK TABLES `flightsegment` WRITE;
/*!40000 ALTER TABLE `flightsegment` DISABLE KEYS */;
INSERT INTO `flightsegment` VALUES (15,8,'PT3H55M','DL'),(16,8,'PT2H35M','DL'),(17,8,'PT14H10M','DL'),(18,9,'PT9H20M','DL'),(19,9,'PT5H15M','DL'),(20,9,'PT3H55M','DL'),(21,10,'PT3H55M','DL'),(22,10,'PT2H35M','DL'),(23,10,'PT14H10M','DL'),(24,11,'PT9H20M','DL'),(25,11,'PT5H15M','DL'),(26,11,'PT3H55M','DL'),(27,12,'PT4H6M','UA'),(28,12,'PT6H38M','UA'),(29,12,'PT11H15M','UA'),(30,13,'PT10H5M','UA'),(31,13,'PT5H23M','UA'),(32,13,'PT4H2M','UA'),(55,24,'PT4H6M','UA'),(56,24,'PT14H','NH'),(57,25,'PT10H10M','UA'),(58,25,'PT5H8M','UA'),(59,25,'PT4H2M','UA'),(131,51,'PT4H6M','United Airlines'),(132,51,'PT4H14M','United Airlines'),(133,51,'PT17H35M','United Airlines'),(134,52,'PT9H55M','Hawaiian Airlines'),(135,52,'PT9H50M','Hawaiian Airlines'),(136,52,'PT4H','Delta Air Lines'),(143,55,'PT8H10M','Air Europa'),(144,56,'PT8H35M','Air Europa');
/*!40000 ALTER TABLE `flightsegment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotelreservation`
--

DROP TABLE IF EXISTS `hotelreservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotelreservation` (
  `idHotelReservation` int NOT NULL AUTO_INCREMENT,
  `idPerson` int NOT NULL,
  `idEvent` int DEFAULT NULL,
  `hotelCode` int DEFAULT NULL,
  `hotelImage` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `checkIn` date DEFAULT NULL,
  `checkOut` date DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `adults` int DEFAULT NULL,
  `children` int DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idHotelReservation`),
  KEY `idPerson` (`idPerson`),
  KEY `hotelReservation_event_fk` (`idEvent`),
  CONSTRAINT `hotelReservation_event_fk` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE,
  CONSTRAINT `hotelreservation_ibfk_1` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotelreservation`
--

LOCK TABLES `hotelreservation` WRITE;
/*!40000 ALTER TABLE `hotelreservation` DISABLE KEYS */;
INSERT INTO `hotelreservation` VALUES (3,2,27,114611,'http://photos.hotelbeds.com/giata/bigger/11/114611/114611a_hb_ro_076.jpg','Adina Apartment Hotel Sydney Darling Harbour','2021-05-30','2021-06-01',4,2,2,'55 Shelley Street, 55','+292497000 | +292497000 | +292496900'),(6,2,26,85800,'http://photos.hotelbeds.com/giata/bigger/08/085800/085800a_hb_a_002.jpg','Sir Stamford at Circular Quay','2021-05-30','2021-06-01',5,2,0,'93 Macquarie Street, 93','02 9252 4600 | 61292524600 | 02 9252 4600 | 61292524286'),(7,2,28,409270,'http://photos.hotelbeds.com/giata/bigger/40/409270/409270a_hb_a_001.jpg','Quest Bondi Junction Serviced Apartments','2021-06-18','2021-06-21',4,2,0,'28 Spring Street, Bondi Junction, -','+61 (0)2 9078 1700 | +61 (0)2 9078 1700 | +61 (0)2 9078 1799'),(10,2,47,189373,'http://photos.hotelbeds.com/giata/bigger/18/189373/189373a_hb_a_002.jpg','Pestana South Beach Art Deco Hotel','2021-06-18','2021-06-20',4,2,0,'1817 James Avenue','+0013053412410 | +0013053412401 | 0013053412409 | +0013055315697');
/*!40000 ALTER TABLE `hotelreservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotelroom`
--

DROP TABLE IF EXISTS `hotelroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotelroom` (
  `idHotelRoom` int NOT NULL AUTO_INCREMENT,
  `idHotelReservation` int NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `totalAmount` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`idHotelRoom`),
  KEY `hotelRoom_hotelReservation_fk` (`idHotelReservation`),
  CONSTRAINT `hotelRoom_hotelReservation_fk` FOREIGN KEY (`idHotelReservation`) REFERENCES `hotelreservation` (`idHotelReservation`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotelroom`
--

LOCK TABLES `hotelroom` WRITE;
/*!40000 ALTER TABLE `hotelroom` DISABLE KEYS */;
INSERT INTO `hotelroom` VALUES (2,3,'APT.B2','PREMIER TWO BEDROOM - INTERCONNECTING','http://photos.hotelbeds.com/giata/bigger/11/114611/114611a_hb_ro_048.jpg',564.43),(5,6,'DBL.DX-KG','DOUBLE DELUXE KING BED','',366.80),(6,7,'STU.QN','SUPERIOR QUEEN','http://photos.hotelbeds.com/giata/bigger/40/409270/409270a_hb_ro_001.jpg',322.32),(7,10,'DBL.ST','ART DECO WITH KING SIZE BED','http://photos.hotelbeds.com/giata/bigger/18/189373/189373a_hb_ro_009.jpg',426.34);
/*!40000 ALTER TABLE `hotelroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persistent_logins`
--

DROP TABLE IF EXISTS `persistent_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persistent_logins` (
  `username` varchar(64) NOT NULL,
  `series` varchar(64) NOT NULL,
  `token` varchar(64) NOT NULL,
  `last_used` timestamp NOT NULL,
  PRIMARY KEY (`series`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persistent_logins`
--

LOCK TABLES `persistent_logins` WRITE;
/*!40000 ALTER TABLE `persistent_logins` DISABLE KEYS */;
/*!40000 ALTER TABLE `persistent_logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `idPerson` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profilePic` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`idPerson`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'6bdaf274-d2ba-11eb-bb75-54e1ad512f86','test','user','sample@mail.com','password',NULL),(2,'6bdb0f5b-d2ba-11eb-bb75-54e1ad512f86','John','Charleston','john@hotmail.com','$2a$10$Gj5g.njqqJJ.PDhlYAee..thCG9NDA2Bc.FUsVk90dL6mU5.0Epk6','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Fprofile%2F6bdb0f5b-d2ba-11eb-bb75-54e1ad512f86%2Fcarlos.jpg?alt=media&token=68a7ceb0-6709-48e3-9c90-00e776697b33'),(3,'6bdb1133-d2ba-11eb-bb75-54e1ad512f86','Carlos','Alcantara','carlos@gmail.com','$2a$10$wzzxGAZpnXJoJl0FZU40JecR5Kl9tbGYgwXi8pnYTxYiBRf93rW9K','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Fprofile%2F6bdb1133-d2ba-11eb-bb75-54e1ad512f86%2Fcarlos.png?alt=media&token=05d478b6-82c2-41f9-b7f2-b887dc174ca6');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `idPicture` int NOT NULL AUTO_INCREMENT,
  `idAlbum` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `pictureUrl` varchar(250) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`idPicture`),
  KEY `picture_album_fk` (`idAlbum`),
  CONSTRAINT `picture_album_fk` FOREIGN KEY (`idAlbum`) REFERENCES `album` (`idAlbum`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (55,16,'george1.jpg','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fgeorge1.jpg?alt=media&token=d8b42ded-3802-4487-95e9-af4228bfa841','2021-02-08'),(56,16,'george3.jpg','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fgeorge3.jpg?alt=media&token=c132cd9c-b75a-4d23-aa08-6892999c8844','2021-02-08'),(57,16,'george5.jpg','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fgeorge5.jpg?alt=media&token=d5921614-5f57-4234-8bf9-d5cba3ded61d','2021-02-08'),(58,16,'george4.png','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fgeorge4.png?alt=media&token=766d3b99-ec01-4e7b-82b4-2d92464578a4','2021-02-08'),(59,17,'h1.png','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fh1.png?alt=media&token=107ad43c-122e-4b6f-bd6b-a03fb45c99f1','2020-12-29'),(60,17,'hotel.png','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fhotel.png?alt=media&token=53e2f585-1a2c-436f-aabe-00f3d8e7622c','2021-04-15'),(61,17,'h2.png','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fh2.png?alt=media&token=09289f9a-f778-4bed-91de-a24d0ce41c61','2020-12-29'),(67,19,'bar.webp','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fbar.webp?alt=media&token=4b67c367-79be-4ad4-9357-161256f3ec95','2021-01-23'),(68,19,'beach.webp','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F0%2Fbeach.webp?alt=media&token=5af12425-fbf9-4038-86ac-ded561fc3546','2021-01-23');
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placerelation`
--

DROP TABLE IF EXISTS `placerelation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placerelation` (
  `idPlaceRelation` int NOT NULL AUTO_INCREMENT,
  `idFlightSegment` int DEFAULT NULL,
  `iataCode` char(3) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `terminal` varchar(10) DEFAULT NULL,
  `at` datetime DEFAULT NULL,
  `type` enum('D','A') DEFAULT NULL,
  PRIMARY KEY (`idPlaceRelation`),
  KEY `placeRelation_flightSegment_fk` (`idFlightSegment`),
  CONSTRAINT `placerelation_ibfk_1` FOREIGN KEY (`idFlightSegment`) REFERENCES `flightsegment` (`idFlightSegment`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placerelation`
--

LOCK TABLES `placerelation` WRITE;
/*!40000 ALTER TABLE `placerelation` DISABLE KEYS */;
INSERT INTO `placerelation` VALUES (25,15,'SDQ',NULL,NULL,'2021-05-24 19:54:00','D'),(26,15,'JFK',NULL,'4','2021-05-24 23:49:00','A'),(27,16,'LGA',NULL,'0','2021-05-25 07:00:00','D'),(28,16,'ATL',NULL,'S','2021-05-25 09:35:00','A'),(29,17,'ATL',NULL,'I','2021-05-25 11:20:00','D'),(30,17,'HND',NULL,'3','2021-05-26 14:30:00','A'),(31,18,'HND',NULL,'3','2021-05-26 16:45:00','D'),(32,18,'SEA',NULL,NULL,'2021-05-26 10:05:00','A'),(33,19,'SEA',NULL,NULL,'2021-05-27 07:30:00','D'),(34,19,'JFK',NULL,'4','2021-05-27 15:45:00','A'),(35,20,'JFK',NULL,'4','2021-05-27 19:59:00','D'),(36,20,'SDQ',NULL,NULL,'2021-05-27 23:54:00','A'),(37,21,'SDQ',NULL,NULL,'2021-05-26 19:54:00','D'),(38,21,'JFK',NULL,'4','2021-05-26 23:49:00','A'),(39,22,'LGA',NULL,'0','2021-05-27 07:00:00','D'),(40,22,'ATL',NULL,'S','2021-05-27 09:35:00','A'),(41,23,'ATL',NULL,'I','2021-05-27 11:20:00','D'),(42,23,'HND',NULL,'3','2021-05-28 14:30:00','A'),(43,24,'HND',NULL,'3','2021-05-28 16:45:00','D'),(44,24,'SEA',NULL,NULL,'2021-05-28 10:05:00','A'),(45,25,'SEA',NULL,NULL,'2021-05-29 07:30:00','D'),(46,25,'JFK',NULL,'4','2021-05-29 15:45:00','A'),(47,26,'JFK',NULL,'4','2021-05-29 19:59:00','D'),(48,26,'SDQ',NULL,NULL,'2021-05-29 23:54:00','A'),(49,27,'SDQ',NULL,NULL,'2021-05-26 15:28:00','D'),(50,27,'EWR',NULL,'B','2021-05-26 19:34:00','A'),(51,28,'EWR',NULL,'C','2021-05-26 21:00:00','D'),(52,28,'SFO',NULL,'3','2021-05-27 00:38:00','A'),(53,29,'SFO',NULL,'I','2021-05-27 01:45:00','D'),(54,29,'HND',NULL,NULL,'2021-05-28 05:00:00','A'),(55,30,'HND',NULL,'I','2021-05-28 18:20:00','D'),(56,30,'LAX',NULL,'7','2021-05-28 12:25:00','A'),(57,31,'LAX',NULL,'7','2021-05-28 14:15:00','D'),(58,31,'EWR',NULL,'C','2021-05-28 22:38:00','A'),(59,32,'EWR',NULL,'C','2021-05-29 00:13:00','D'),(60,32,'SDQ',NULL,NULL,'2021-05-29 04:15:00','A'),(105,55,'SDQ',NULL,NULL,'2021-05-26 06:05:00','D'),(106,55,'EWR',NULL,'C','2021-05-26 10:11:00','A'),(107,56,'JFK',NULL,'7','2021-05-26 18:15:00','D'),(108,56,'HND',NULL,NULL,'2021-05-27 21:15:00','A'),(109,57,'HND',NULL,NULL,'2021-05-28 22:55:00','D'),(110,57,'LAX',NULL,'B','2021-05-28 17:05:00','A'),(111,58,'LAX',NULL,'7','2021-05-28 21:15:00','D'),(112,58,'EWR',NULL,'C','2021-05-29 05:23:00','A'),(113,59,'EWR',NULL,'C','2021-05-29 06:21:00','D'),(114,59,'SDQ',NULL,NULL,'2021-05-29 10:23:00','A'),(256,131,'SDQ',NULL,NULL,'2021-05-27 06:05:00','D'),(257,131,'EWR',NULL,'C','2021-05-27 10:11:00','A'),(258,132,'EWR',NULL,'C','2021-05-27 12:43:00','D'),(259,132,'IAH',NULL,'C','2021-05-27 15:57:00','A'),(260,133,'IAH',NULL,'E','2021-05-27 20:25:00','D'),(261,133,'SYD',NULL,NULL,'2021-05-29 05:00:00','A'),(262,134,'SYD',NULL,'1','2021-05-29 21:40:00','D'),(263,134,'HNL',NULL,'2','2021-05-29 11:35:00','A'),(264,135,'HNL',NULL,'1','2021-05-29 15:05:00','D'),(265,135,'JFK',NULL,'5','2021-05-30 06:55:00','A'),(266,136,'JFK',NULL,'4','2021-05-30 08:30:00','D'),(267,136,'SDQ',NULL,NULL,'2021-05-30 12:30:00','A'),(280,143,'SDQ',NULL,NULL,'2021-07-15 20:50:00','D'),(281,143,'MAD',NULL,'1','2021-07-16 11:00:00','A'),(282,144,'MAD',NULL,'1','2021-07-17 16:10:00','D'),(283,144,'SDQ',NULL,NULL,'2021-07-17 18:45:00','A');
/*!40000 ALTER TABLE `placerelation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poi`
--

DROP TABLE IF EXISTS `poi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poi` (
  `idPoi` int NOT NULL AUTO_INCREMENT,
  `idEvent` int DEFAULT NULL,
  `idFavorite` int DEFAULT NULL,
  `id` varchar(50) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `visitDate` datetime DEFAULT NULL,
  `formattedAddress` varchar(100) DEFAULT NULL,
  `imageUrl` varchar(100) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `categoryIconUrl` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idPoi`),
  KEY `poi_event_fk` (`idEvent`),
  KEY `poi_favorite_fk` (`idFavorite`),
  CONSTRAINT `poi_event_fk` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE,
  CONSTRAINT `poi_favorite_fk` FOREIGN KEY (`idFavorite`) REFERENCES `favorite` (`idFavorite`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poi`
--

LOCK TABLES `poi` WRITE;
/*!40000 ALTER TABLE `poi` DISABLE KEYS */;
INSERT INTO `poi` VALUES (3,45,10,'4abd5b7df964a520e68920e3','Lincoln Road Mall','2021-06-01 19:59:45','Lincoln Rd (btwn West & Washington Ave), Miami Beach','https://fastly.4sqi.net/img/general/720x540/32240909_zZUHYX1HtSltvIMLq0XSqXE1wk68iS4JcJ1tqDsiey0.jpg',4,'Shopping Mall','https://ss3.4sqi.net/img/categories_v2/shops/mall_32.png'),(4,NULL,9,'4a5884e9f964a52088b71fe3','Dolphin Mall',NULL,'11401 NW 12th St, Miami','https://fastly.4sqi.net/img/general/480x720/VFiObnTBCkrIHYlM6ZkYMbZmKn_vZAhHxMTX_Ia3P2c.jpg',4,'Shopping Mall','https://ss3.4sqi.net/img/categories_v2/shops/mall_32.png'),(5,NULL,11,'4b479d70f964a520773726e3','Cinemark',NULL,'15601 Sheridan St, Davie','https://fastly.4sqi.net/img/general/720x540/552PDQ1YXVKYLAEGII31A33UDBMPT121K3LD5ZMWRTLEFDOW.jpg',4,'Movie Theater','https://ss3.4sqi.net/img/categories_v2/arts_entertainment/movietheater_32.png'),(6,NULL,12,'4f05e5919a523e111faa1a45','Stradivarius',NULL,'Rua Augusta (Rossio), 1100-048 Lisbon','',NULL,'Women\'s Store','https://ss3.4sqi.net/img/categories_v2/shops/apparel_women_32.png'),(7,NULL,14,'4d09e3bb9de0b1f7c6258053','Calouste Gulbenkian Foundation (Fundação Calouste Gulbenkian)',NULL,'Av. de Berna, 45A (217823000), 1067-001 Lisbon','https://fastly.4sqi.net/img/general/720x540/19410211_JVMUk6u_JTqeIER5dRxU9hIBBgtszyGDz4as_F8-blY.jpg',4,'Museum','https://ss3.4sqi.net/img/categories_v2/arts_entertainment/museum_32.png'),(8,NULL,15,'4b0588a1f964a520d8d022e3','Hard Rock Cafe Lisboa',NULL,'Avenida Da Liberdade, 2 (R. dos Condes), 1250-144 Lisbon','https://fastly.4sqi.net/img/general/427x640/61778317_wLXbKtt4d8h80SDM9VAq7-YTEgi7PTW4A0OQawE7jm0.jpg',4,'American Restaurant','https://ss3.4sqi.net/img/categories_v2/food/default_32.png'),(9,NULL,16,'4b0588a8f964a520d6d222e3','CascaiShopping',NULL,'EN 9, 2645-543 Alcabideche','https://fastly.4sqi.net/img/general/612x612/6285025_2ENPnZoD4Bnvif8teXvjVnxQuUZOI1BCmF8GFnlIxaI.jpg',3,'Shopping Mall','https://ss3.4sqi.net/img/categories_v2/shops/mall_32.png'),(10,NULL,17,'4b0d9f73f964a5207d4c23e3','Centro Comercial Alegro Alfragide',NULL,'Av. dos Cavaleiros, 60 (R. da Quinta do Salrego), 2790-045 Oeiras','https://fastly.4sqi.net/img/general/960x720/32887777_CAFwpTfOE7Dh1VthvRc2dSDkwvMk_sQNoOUkzd6-IX0.jpg',3,'Shopping Mall','https://ss3.4sqi.net/img/categories_v2/shops/mall_32.png'),(11,48,NULL,'4b0d9f73f964a5207d4c23e3','Centro Comercial Alegro Alfragide','2021-07-08 14:21:06','Av. dos Cavaleiros, 60 (R. da Quinta do Salrego), 2790-045 Oeiras','https://fastly.4sqi.net/img/general/960x720/32887777_CAFwpTfOE7Dh1VthvRc2dSDkwvMk_sQNoOUkzd6-IX0.jpg',3,'Shopping Mall','https://ss3.4sqi.net/img/categories_v2/shops/mall_32.png');
/*!40000 ALTER TABLE `poi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `idRestaurant` int NOT NULL AUTO_INCREMENT,
  `idEvent` int DEFAULT NULL,
  `idFavorite` int DEFAULT NULL,
  `id` varchar(50) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `imageUrl` varchar(100) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `displayAddress` varchar(100) DEFAULT NULL,
  `cuisines` varchar(100) DEFAULT NULL,
  `visitDate` datetime DEFAULT NULL,
  PRIMARY KEY (`idRestaurant`),
  KEY `restaurant_event_fk` (`idEvent`),
  KEY `restaurant_favorite_fk` (`idFavorite`),
  CONSTRAINT `restaurant_event_fk` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE,
  CONSTRAINT `restaurant_favorite_fk` FOREIGN KEY (`idFavorite`) REFERENCES `favorite` (`idFavorite`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (5,42,8,'Gv5X1-qLTGZbwoz829-Xxg','Corona Beach House','https://s3-media3.fl.yelpcdn.com/bphoto/xcxecZ-oes9yelpSnFSU6w/o.jpg',4,'2100 NW 42nd Ave, Terminal D East, Gate D23, Miami, FL 33166','American (Traditional), Sports Bars','2021-06-01 18:03:32'),(6,NULL,7,'hZm7TunlrksQbgS0ssXbUg','Versailles Restaurant','https://s3-media4.fl.yelpcdn.com/bphoto/L10-BztNrnL-zYtFOGciVw/o.jpg',4,'3555 SW 8th St, Miami, FL 33135','Cuban, Coffee & Tea, Latin American',NULL);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip` (
  `idTrip` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `idPerson` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `countries` varchar(100) DEFAULT NULL,
  `budget` decimal(8,2) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `coverPhoto` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`idTrip`),
  KEY `idPerson` (`idPerson`),
  CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (10,'f6f6c797-d2a4-11eb-bb75-54e1ad512f86',2,'Dubai Trip','Afghanistan',5.00,'2021-06-23','2021-07-14','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F2%2Fdubai.jpg?alt=media&token=28c7eb3f-837e-475f-b364-52e8f09eb12d'),(12,'f5e8ae12-d2a4-11eb-bb75-54e1ad512f86',2,'Chicago Road Trip','United States',8500.00,'2021-05-22','2021-05-23','https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F2%2Fcar-rental.jpg?alt=media&token=9990936d-65ee-46ca-aa48-3505deeabad4'),(20,'1b19b77c-50e6-4dda-81fd-60cfe02f4899',3,'Spaniard Tour','Spain',1200.00,'2021-07-15','2021-07-16',''),(22,'3bca8dac-534b-4b91-a450-cb233ba89b75',3,'Mountains road trip','Anguilla',1546.00,'2021-07-15','2021-07-16','');
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-22 12:38:22
