-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2019 at 12:47 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventoryapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Electronic'),
(2, 'Furniture'),
(3, 'Vehicle'),
(4, 'Drinks'),
(5, 'Foods'),
(6, 'Tools'),
(7, 'Tools'),
(8, 'Tools');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `id_category` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_added` timestamp NULL DEFAULT NULL,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `id_category`, `quantity`, `date_added`, `date_updated`) VALUES
(1, 'BMW Car', 'Do you want to look cool? just buy this car', 'www.bmw.com', 3, 10, '2019-08-07 17:00:00', '2019-08-24 17:00:00'),
(2, 'Spring Bed', 'The most comfortable place to lay down', 'www.springbed.id', 2, 0, '2019-08-20 17:00:00', '2019-08-24 17:00:00'),
(3, 'KFC Food', 'Everyones favorite food', 'www.orderkfc.co', 4, 99, '2019-08-14 17:00:00', '2019-08-24 17:00:00'),
(4, 'Gaming Chair ', 'The best gaming chair out here', 'www.gamingchair.com', 3, 60, '2019-08-11 17:00:00', '2019-08-25 17:00:00'),
(5, 'Gaming Headset', 'The best gaming headset out here', 'www.gamingheadset.com', 3, 82, '2019-08-11 17:00:00', '2019-08-25 17:00:00'),
(6, 'ASUS ROG Laptop', 'The best gaming laptop', 'www.asus.com', 1, 55, '2019-08-21 17:00:00', '2019-08-25 17:00:00'),
(45, 'ASUS ROG Laptop', 'new gaming laptop', 'www.asus.com', 1, 55, '2019-08-29 17:00:00', '2019-08-29 17:00:00'),
(46, 'ASUS ROG Laptop', 'new gaming laptop', 'www.asus.com', 1, 55, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 'Gaming Chair\n', 'The best gaming chair out here', 'www.abcdefg.com', 3, 81, '2019-08-29 17:00:00', '2019-08-30 10:40:52'),
(49, 'Gaming Chair\n', 'The best gaming chair out here', 'www.abcdefg.com', 3, 81, '2019-08-30 10:45:28', '2019-08-30 10:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created`, `modified`) VALUES
(10, 'fahrul', 'rozi', 'kappa@gmail.com', '$2a$10$4gjbGxL0W0klIz881IVkJu76XAZB/4VW/oCoc0yqs7Tg8bp/xWGjy', '2019-08-29 09:40:50', '2019-08-29 09:40:50'),
(48, 'fahrul', 'rozi', 'fahrulrjs@gmail.com', '$2a$10$uN4NfQoGOqYz2Bibp8jS6eMbDuDt4plBd5435Dd9SJlXQnWnajWQi', '2019-08-29 19:51:06', '2019-08-29 19:51:06'),
(49, 'fahrul', 'rozi', 'fahrulrozi@gmail.com', '$2a$10$yLM76dMZRv9pOMN6xei.x.KRBw1Wc.0OWc8nOiBUcyC21pnUSBluW', '2019-08-29 20:23:02', '2019-08-29 20:23:02'),
(50, 'fahrul', 'rozi', 'kappa123@kappa.com', '$2a$10$0vnWpuIRJzcJAlmjDgmtnOiarBG6syrG/lJsik.vClVaQDQF3Ckn2', '2019-08-29 20:40:22', '2019-08-29 20:40:22'),
(51, 'fahrul', 'rozi', 'lalala@kappa.com', '$2a$10$WnC2dCPDsRj40gQp9Ygy9ODPQkbAtGL/P1WlqbxQzN.kYT7M66HZi', '2019-08-29 21:24:48', '2019-08-29 21:24:48'),
(52, 'fahrul', 'rozi', 'fahrul@h.com', '$2a$10$CBhYDe7rpOmiJHz5scoGAeUnx7HPQL2TOTlvjhqz4HsZrKwAU61bm', '2019-08-30 09:38:21', '2019-08-30 09:38:21'),
(53, 'fahrul', 'rozi', 'fahrulrozi23@gmail.com', '$2a$10$hfLW15Aw51ciIL6I4ps62.GvGxwliYW31eQdIwxyHd9.YFBl7O/vq', '2019-08-30 09:50:32', '2019-08-30 09:50:32'),
(54, 'fahrul', 'rozi', 'fhrj@gmail.com', '$2a$10$i4xWstKCM4xdYp8dr8W3luFZLz.9KuAuLSPR792e2ppAMkH2b22XC', '2019-08-30 09:58:08', '2019-08-30 09:58:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`id_category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
