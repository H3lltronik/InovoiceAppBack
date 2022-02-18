DROP DATABASE IF EXISTS `invoices-app`;
CREATE DATABASE `invoices-app`;
USE `invoices-app`;

CREATE TABLE `invoices-app`.`address` (`id` int NOT NULL AUTO_INCREMENT, `street` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `postCode` varchar(255) NOT NULL, `country` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE `invoices-app`.`address_deleted` (`id` int NOT NULL AUTO_INCREMENT, `street` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `postCode` varchar(255) NOT NULL, `country` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `invoices-app`.`item` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `quantity` int NOT NULL, `price` int NOT NULL, `total` int NOT NULL, `invoiceId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE `invoices-app`.`item_deleted` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `quantity` int NOT NULL, `price` int NOT NULL, `total` int NOT NULL, `invoiceId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `invoices-app`.`invoice` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `paymentDue` datetime NOT NULL, `description` varchar(255) NOT NULL, `paymentTerms` int NOT NULL, `clientName` varchar(255) NOT NULL, `clientEmail` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `total` int NOT NULL, `senderAddressId` int NULL, `clientAddressId` int NULL, `userId` int NULL, UNIQUE INDEX `idx_sender` (`senderAddressId`), UNIQUE INDEX `idx_client` (`clientAddressId`), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE `invoices-app`.`invoice_deleted` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `paymentDue` datetime NOT NULL, `description` varchar(255) NOT NULL, `paymentTerms` int NOT NULL, `clientName` varchar(255) NOT NULL, `clientEmail` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `total` int NOT NULL, `senderAddressId` int NULL, `clientAddressId` int NULL, `userId` int NULL, UNIQUE INDEX `idx_sender` (`senderAddressId`), UNIQUE INDEX `idx_client` (`clientAddressId`), PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `invoices-app`.`user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `profilePicture` varchar(255) NULL, `password` varchar(255) NOT NULL, `refreshToken` varchar(255) NULL, UNIQUE INDEX `idx_user` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB;

ALTER TABLE `invoices-app`.`item` ADD CONSTRAINT `item_invoice` FOREIGN KEY (`invoiceId`) REFERENCES `invoices-app`.`invoice`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `invoices-app`.`invoice` ADD CONSTRAINT `invoice_sender` FOREIGN KEY (`senderAddressId`) REFERENCES `invoices-app`.`address`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `invoices-app`.`invoice` ADD CONSTRAINT `invoice_client` FOREIGN KEY (`clientAddressId`) REFERENCES `invoices-app`.`address`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `invoices-app`.`invoice` ADD CONSTRAINT `user_invoice` FOREIGN KEY (`userId`) REFERENCES `invoices-app`.`user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


CREATE TRIGGER `deleted_invoices` BEFORE DELETE ON `invoices-app`.`invoice` FOR EACH ROW INSERT INTO `invoices-app`.`invoice_deleted` (`id`, `createdAt` , `paymentDue` , `description` , `paymentTerms` , `clientName` , `clientEmail` , `status` , `total` , `senderAddressId` , `clientAddressId`, `userId`) VALUES (OLD.`id`, OLD.`createdAt` , OLD.`paymentDue` , OLD.`description` , OLD.`paymentTerms` , OLD.`clientName` , OLD.`clientEmail` , OLD.`status` , OLD.`total` , OLD.`senderAddressId` , OLD.`clientAddressId`, OLD.`userId`);
CREATE TRIGGER `deleted_address` BEFORE DELETE ON `invoices-app`.`address` FOR EACH ROW INSERT INTO `invoices-app`.`address_deleted` (`id` , `street` , `city` , `postCode` , `country`) VALUES (OLD.`id` , OLD.`street` , OLD.`city` , OLD.`postCode` , OLD.`country`);
CREATE TRIGGER `deleted_items` BEFORE DELETE ON `invoices-app`.`item` FOR EACH ROW INSERT INTO `invoices-app`.`item_deleted` (`id`, `name` , `quantity` , `price` , `total` , `invoiceId`) VALUES (OLD.`id`, OLD.`name` , OLD.`quantity` , OLD.`price` , OLD.`total` , OLD.`invoiceId`)
