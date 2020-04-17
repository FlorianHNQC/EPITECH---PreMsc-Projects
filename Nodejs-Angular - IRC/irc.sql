-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 05 avr. 2020 à 19:31
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `irc`
--

-- --------------------------------------------------------

--
-- Structure de la table `channels`
--

DROP TABLE IF EXISTS `channels`;
CREATE TABLE IF NOT EXISTS `channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `channels`
--

INSERT INTO `channels` (`id`, `name`, `created_by`) VALUES
(5, 'general', 'chris'),
(4, 'pokemon', 'lyna'),
(6, 'epitech', 'chris');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `channel` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `message`, `created_by`, `created_at`, `channel`) VALUES
(1, 'premier message', 'aurelie', '2020-04-03 00:00:00', 'epitech'),
(2, 'dssd', 'lyna', '2020-04-03 00:00:00', 'epitech'),
(3, 'deuxieme message', 'lyna', '2020-04-03 00:00:00', 'pokemon'),
(4, 'dsds', 'dsd', '2020-04-05 00:00:00', 'pokemon'),
(5, 'fdserzrr', 'dsd', '2020-04-05 00:00:00', 'pokemon'),
(6, 'hello', 'dsd', '2020-04-05 00:00:00', 'epitech'),
(7, 'hello', 'dsd', '2020-04-05 00:00:00', 'epitech'),
(8, 'coucou', 'chris', '2020-04-05 00:00:00', 'epitech'),
(9, 'dsds', 'dsds', '2020-04-05 21:08:09', 'general'),
(10, 'test', 'fdsfse', '2020-04-05 21:18:39', 'general'),
(11, 'dsd', 'dsdqs', '2020-04-05 21:20:05', 'general'),
(12, 'fdsfs', 'admin', '2020-04-05 21:20:55', 'general');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `is_admin`) VALUES
(1, 'chris@email.com', 'chris', 'chris', 0),
(2, 'aurelie@email.com', 'aurelie', 'aurelie', 0),
(3, 'lyna@email.com', 'lyna', 'lyna', 0),
(4, 'pierrick@mail.fr', 'pierrick', 'pierrick', 0),
(5, 'admin@email.com', 'admin', 'admin', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
