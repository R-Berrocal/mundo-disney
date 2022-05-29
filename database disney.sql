-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2022 a las 06:35:26
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `disney`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `character_`
--

CREATE TABLE `character_` (
  `idcharacter` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `weigh` int(11) DEFAULT NULL,
  `history` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `character_`
--

INSERT INTO `character_` (`idcharacter`, `image`, `name`, `age`, `weigh`, `history`, `createdAt`, `updatedAt`) VALUES
(1, 'url1', 'valentina romero', 1, 90, 'No hay mucho que contar', '2022-05-23 00:26:11', '2022-05-23 00:26:11'),
(2, 'url2', 'Roberto Berrocal', 1, 100, 'No hay mucho que contar', '2022-05-23 00:55:54', '2022-05-23 00:55:54'),
(3, 'url3', 'Iron man', 52, 70, 'Es un personaje de avengers con un traje echo por el mismo', '2022-05-28 16:50:42', '2022-05-28 16:54:01'),
(4, 'url4', 'Capitan America', 104, 90, 'Es un super soldado creado en la segunda guerra mundial', '2022-05-28 16:51:33', '2022-05-28 16:54:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genre`
--

CREATE TABLE `genre` (
  `idgenre` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genre`
--

INSERT INTO `genre` (`idgenre`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Romantico', 'url1', '2022-05-28 22:02:39', '2022-05-28 22:03:33'),
(2, 'Acción', 'url2', '2022-05-28 22:04:18', '2022-05-28 22:04:18'),
(3, 'Comedia', 'url3', '2022-05-28 22:04:30', '2022-05-28 22:04:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie`
--

CREATE TABLE `movie` (
  `idmovie` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `creation_date` date NOT NULL,
  `qualification` tinyint(4) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movie`
--

INSERT INTO `movie` (`idmovie`, `image`, `title`, `creation_date`, `qualification`, `createdAt`, `updatedAt`) VALUES
(1, 'url1', 'harry potter', '1996-06-06', 0, '2022-05-23 02:24:55', '2022-05-23 02:24:55'),
(2, 'url2', 'Mision imposible', '1990-03-02', 0, '2022-05-23 00:51:57', '2022-05-23 00:51:57'),
(3, 'url3', 'Avengers', '2012-05-04', 3, '2022-05-28 16:57:30', '2022-05-28 16:57:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie_has_characters`
--

CREATE TABLE `movie_has_characters` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `movieIdmovie` int(11) NOT NULL,
  `characterIdcharacter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movie_has_characters`
--

INSERT INTO `movie_has_characters` (`createdAt`, `updatedAt`, `movieIdmovie`, `characterIdcharacter`) VALUES
('2022-05-23 02:26:27', '2022-05-23 02:26:27', 1, 1),
('2022-05-23 00:55:59', '2022-05-23 00:55:59', 1, 2),
('2022-05-23 00:52:18', '2022-05-23 00:52:18', 2, 1),
('2022-05-28 17:00:14', '2022-05-28 17:00:14', 3, 3),
('2022-05-28 17:00:19', '2022-05-28 17:00:19', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie_has_genres`
--

CREATE TABLE `movie_has_genres` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `movieIdmovie` int(11) NOT NULL,
  `genreIdgenre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movie_has_genres`
--

INSERT INTO `movie_has_genres` (`createdAt`, `updatedAt`, `movieIdmovie`, `genreIdgenre`) VALUES
('2022-05-29 04:28:23', '2022-05-29 04:28:23', 2, 3),
('2022-05-29 06:01:10', '2022-05-29 06:01:10', 3, 2),
('2022-05-29 06:01:10', '2022-05-29 06:01:10', 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_`
--

CREATE TABLE `user_` (
  `iduser` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `condition` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `character_`
--
ALTER TABLE `character_`
  ADD PRIMARY KEY (`idcharacter`);

--
-- Indices de la tabla `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`idgenre`);

--
-- Indices de la tabla `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`idmovie`);

--
-- Indices de la tabla `movie_has_characters`
--
ALTER TABLE `movie_has_characters`
  ADD PRIMARY KEY (`movieIdmovie`,`characterIdcharacter`),
  ADD KEY `characterIdcharacter` (`characterIdcharacter`);

--
-- Indices de la tabla `movie_has_genres`
--
ALTER TABLE `movie_has_genres`
  ADD PRIMARY KEY (`movieIdmovie`,`genreIdgenre`),
  ADD KEY `genreIdgenre` (`genreIdgenre`);

--
-- Indices de la tabla `user_`
--
ALTER TABLE `user_`
  ADD PRIMARY KEY (`iduser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `character_`
--
ALTER TABLE `character_`
  MODIFY `idcharacter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `genre`
--
ALTER TABLE `genre`
  MODIFY `idgenre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `movie`
--
ALTER TABLE `movie`
  MODIFY `idmovie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_`
--
ALTER TABLE `user_`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movie_has_characters`
--
ALTER TABLE `movie_has_characters`
  ADD CONSTRAINT `movie_has_characters_ibfk_1` FOREIGN KEY (`movieIdmovie`) REFERENCES `movie` (`idmovie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie_has_characters_ibfk_2` FOREIGN KEY (`characterIdcharacter`) REFERENCES `character_` (`idcharacter`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movie_has_genres`
--
ALTER TABLE `movie_has_genres`
  ADD CONSTRAINT `movie_has_genres_ibfk_1` FOREIGN KEY (`movieIdmovie`) REFERENCES `movie` (`idmovie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie_has_genres_ibfk_2` FOREIGN KEY (`genreIdgenre`) REFERENCES `genre` (`idgenre`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
