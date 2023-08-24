-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2023 at 08:08 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `profilePic` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `username`, `password`, `type`, `profilePic`) VALUES
(1, 'admin', 'admin', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'superadmin', 'adminpic.png');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `postedBy` varchar(80) NOT NULL,
  `recipeId` int(11) NOT NULL,
  `body` text NOT NULL,
  `datePosted` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `postedBy`, `recipeId`, `body`, `datePosted`) VALUES
(1, 'aziAcosta', 73, 'first comment', '2023-07-23 10:40:27'),
(2, 'aziAcosta', 73, 'Test this comment', '2023-07-23 10:40:57'),
(3, 'aziAcosta', 73, 'try to comment now', '2023-07-23 10:52:41'),
(4, 'aziAcosta', 73, 'this is a post', '2023-07-23 10:54:12'),
(5, 'aziAcosta', 73, 'comment attempt', '2023-07-23 10:54:59'),
(7, 'aziAcosta', 73, 'check again', '2023-07-23 11:13:52'),
(8, 'blazeDreyden', 73, 'comment from blaze', '2023-07-23 11:37:34'),
(9, 'meynard', 73, '12:39PM comment', '2023-07-23 12:39:38'),
(10, 'meynard', 73, '12:44PM comment', '2023-07-23 12:44:37'),
(11, 'aziAcosta', 73, 'this is Azi', '2023-07-23 12:45:35'),
(12, 'aziAcosta', 73, 'try to comment again', '2023-07-23 19:35:08'),
(13, 'jdCoke', 74, 'try to comment', '2023-07-23 19:39:03'),
(14, 'jdCoke', 73, 'this is a comment from JD', '2023-07-23 19:54:45'),
(15, 'jdCoke', 73, 'check if working', '2023-07-23 19:57:34'),
(16, 'jdCoke', 74, '2nd comment', '2023-07-23 19:59:53'),
(17, 'blazeDreyden', 80, 'Nice', '2023-07-27 10:53:21'),
(18, 'jdCoke', 80, 'I will try this one', '2023-07-27 10:53:42'),
(19, 'aziAcosta', 78, 'first comment', '2023-07-27 11:14:38'),
(20, 'jdCoke', 78, 'looks nice', '2023-07-27 13:05:11'),
(21, 'sample', 81, 'this is a comment', '2023-07-29 09:29:43'),
(22, 'johnsmith', 77, 'this is a comment', '2023-08-01 20:19:27'),
(23, 'johnsmith', 77, 'comment 2', '2023-08-01 20:19:38'),
(24, 'wonyoung', 77, 'good', '2023-08-06 17:49:42'),
(25, 'meynard', 86, 'good', '2023-08-06 23:11:18'),
(26, 'wonyoung', 75, 'very nice', '2023-08-06 23:12:40'),
(27, 'meynard', 80, 'wow', '2023-08-06 23:21:50'),
(28, 'meynard', 95, 'yes!', '2023-08-06 23:48:22'),
(29, 'meynard', 95, 'will cook this one', '2023-08-06 23:48:35'),
(30, 'blazeDreyden', 95, 'cook this for us mom', '2023-08-09 11:09:17'),
(31, 'blazeDreyden', 77, 'love it', '2023-08-09 12:08:37'),
(32, 'meynard', 101, 'comment test', '2023-08-17 20:58:25'),
(33, 'meynard', 101, 'comment test for delete', '2023-08-17 20:58:31'),
(34, 'harry', 101, 'expecto patronum', '2023-08-17 20:59:28'),
(35, 'harry', 101, 'avada kedavra', '2023-08-17 21:01:06'),
(36, 'harry', 101, 'useless comment', '2023-08-17 21:03:51'),
(37, 'harry', 101, 'delete me', '2023-08-17 21:04:45'),
(38, 'wonyoung', 100, 'wow!!! nice!', '2023-08-17 21:31:55'),
(39, 'rayMont', 100, 'good', '2023-08-17 21:33:03'),
(41, 'wonyoung', 77, 'testing', '2023-08-17 21:42:41'),
(42, 'wonyoung', 77, 'I am wonyoung', '2023-08-17 22:55:39'),
(43, 'wonyoung', 77, 'teach me how', '2023-08-17 22:58:06'),
(44, 'wonyoung', 77, 'meow', '2023-08-17 23:37:03'),
(50, 'wonyoung', 102, 'bad food', '2023-08-18 00:00:37'),
(51, 'meynard', 96, 'looks sweet', '2023-08-19 21:32:00'),
(53, 'jdCoke', 77, 'cheers!', '2023-08-21 21:18:09'),
(54, 'jdCoke', 99, 'wow!', '2023-08-21 21:18:43'),
(56, 'meynard', 102, 'comment', '2023-08-23 20:31:23');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `commentId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `username`, `commentId`, `recipeId`) VALUES
(10, 'blazeDreyden', 0, 75),
(21, 'aziAcosta', 0, 75),
(125, 'meynard', 0, 75),
(306, 'jdCoke', 0, 74),
(313, 'jdCoke', 0, 73),
(329, 'blazeDreyden', 0, 73),
(335, 'sheene', 0, 73),
(336, 'aziAcosta', 0, 73),
(338, 'blazeDreyden', 0, 78),
(340, 'jdCoke', 0, 80),
(345, 'sample', 0, 81),
(347, 'aziAcosta', 0, 79),
(348, 'jdCoke', 0, 86),
(349, 'meynard', 0, 85),
(350, 'richie', 0, 77),
(351, 'meynard', 0, 80),
(352, 'johnsmith', 0, 77),
(353, 'johnsmith', 0, 94),
(354, 'sheene', 0, 77),
(355, 'rayMont', 0, 77),
(356, 'luffy', 0, 77),
(357, 'sample', 0, 77),
(358, 'wonyoung', 0, 77),
(361, 'blizzard', 0, 77),
(372, 'blazeDreyden', 0, 95),
(374, 'blazeDreyden', 0, 77),
(375, 'hermione', 0, 77),
(381, 'wonyoung', 0, 74),
(382, 'aziAcosta', 0, 77),
(383, 'harry', 0, 77),
(385, 'harry', 0, 101),
(386, 'meynard', 0, 95),
(387, 'meynard', 0, 96);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `message`, `date`) VALUES
(1, 'Anonymous', 'First sample message', '2023-08-22 23:08:55'),
(2, 'Unknown', 'This is a sample message number 2', '2023-08-22 23:10:37'),
(3, 'Rider', 'Hello darkness my old friend', '2023-08-22 23:43:15'),
(4, 'Hellscream', 'Burrrrrrrrnnnnnnnnnnnnnnnn!!!!!!', '2023-08-22 23:43:32'),
(7, 'Syrius Black', 'Hello darkness my old friend!', '2023-08-23 22:16:23');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `title` varchar(89) NOT NULL,
  `ingredients` varchar(255) NOT NULL,
  `filePath` varchar(255) NOT NULL,
  `privacy` int(11) NOT NULL,
  `uploadDate` datetime NOT NULL DEFAULT current_timestamp(),
  `views` int(11) NOT NULL,
  `uploadedBy` varchar(60) NOT NULL,
  `category` varchar(80) NOT NULL,
  `howtocook` varchar(1500) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `ingredients`, `filePath`, `privacy`, `uploadDate`, `views`, `uploadedBy`, `category`, `howtocook`, `description`) VALUES
(74, 'Cook steak like a chef', '2 (6 ounce) filet mignon steaks\r\n\r\n1 teaspoon olive oil\r\n\r\nCoarse kosher salt and freshly ground black pepper\r\n\r\n1/2 cup Cabernet Sauvignon\r\n\r\n2 tablespoons butter', '64b7d12c60789Cheffy-Garlic-Butter-Steak_7.webp', 0, '2023-07-19 20:03:56', 230, 'aziAcosta', 'asiancuisine', 'Bring to room temp: Take the steak out of the fridge 30 minutes prior to bring to room temperature.\r\n\r\nDry steaks: Pat dry with paper towels.,\r\nHeat skillet: Heat oil in a heavy based skillet over high heat until it is very hot – you should see smoke!\r\n\r\n', 'A steak is a thick cut of meat generally sliced across the muscle fibers, sometimes including a bone. It is normally grilled or fried. Steak can be diced, cooked in sauce, such as in steak and kidney pie, or minced and formed into patties, such as hamburg'),
(75, 'Home Made Pizza', '1 package (1/4 ounce) active dry yeast\r\n\r\n1 teaspoon sugar\r\n\r\n1-1/4 cups warm water (110° to 115°)\r\n\r\n1/4 cup canola oil\r\n\r\n1 teaspoon salt\r\n\r\n3-1/2 to 4 cups all-purpose flour\r\n\r\n1/2 pound ground beef\r\n\r\n1 small onion, chopped\r\n\r\n1 can (15 ounces) tomato', '64b7d237ca53eSimply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.webp', 0, '2023-07-19 20:08:23', 249, 'aziAcosta', 'europeandish', 'In large bowl, dissolve yeast and sugar in water; let stand for 5 minutes. Add oil and salt. Stir in flour 1 cup at a time until a soft dough forms.\r\n\r\nTurn onto a floured surface; knead until smooth and elastic 2-3 minutes. Place in a greased bowl turnin', 'Make perfect pizza at home with this classic homemade pizza recipe, including a pizza dough recipe, topping suggestions, and step-by-step instructions with photos.'),
(77, 'Perfect Sushi Rice', '2 cups uncooked glutinous white rice (sushi rice),\r\n\r\n3 cups water,\r\n\r\n½ cup rice vinegar,\r\n\r\n1 tablespoon vegetable oil,\r\n\r\n¼ cup white sugar,\r\n\r\n1 teaspoon salt', '64bfaa398e240sushi.jpg', 1, '2023-07-25 18:55:53', 394, 'meynard', 'asiancuisine', 'Gather all ingredients.\r\n\r\nRinse the rice in a strainer or colander under cold running water until the water runs clear.\r\n\r\nCombine rice and water in a saucepan over medium-high heat and bring to a boil., Reduce heat to low, cover, and cook until rice is tender and all water has been absorbed, about 20 minutes., Remove from stove and set aside until cool enough to handle.\r\n\r\nMeanwhile combine rice vinegar - oil, - sugar - and salt in a small saucepan over medium heat. Cook until the sugar has dissolved. Allow to cool  then stir into the cooked rice. While mixture will appear very wet at first, keep stirring and rice will dry as it cools.\r\n', 'Here is my recipe for the perfect sushi rice. You can eat this alone or roll into your favorite sushi roll with ingredients of choice. I use strips of carrots, cucumbers and slices of avocado. You can adjust the amount of vinegar in this recipe to suit your taste.'),
(78, 'Spinach and Sun-Dried Tomato Pasta', '1 cup vegetable broth\r\n\r\n12 dehydrated sun-dried tomatoes\r\n\r\n1 (8 ounce) package uncooked penne pasta\r\n\r\n2 tablespoons pine nuts\r\n\r\n1 tablespoon olive oil\r\n\r\n¼ teaspoon crushed red pepper flakes\r\n\r\n1 clove garlic, minced\r\n\r\n1 bunch fresh spinach', '64bfae2ed13a5spinachandsundriedtomatopastasalad1-1-of-1.jpg', 1, '2023-07-25 19:12:46', 146, 'meynard', 'vegetarian', 'In a small saucepan bring the broth to a boil. Remove from heat. Place the sun-dried tomatoes in the broth 15 minutes  or until softened. Drain reserving broth, and coarsely chop.,\r\n\r\nBring a large pot of lightly salted water to a boil. Place penne pasta ', 'I created this simple Sicilian-style pasta dish one day when trying to use up some sun-dried tomatoes.'),
(79, 'Greek Couscous Salad', '½ cup water,\r\n\r\n¼ cup chicken broth,\r\n\r\n1 teaspoon minced garlic,\r\n\r\n½ cup pearl (Israeli) couscous,\r\n\r\n1 cup canned chickpeas (garbanzo beans), rinsed and drained,\r\n\r\n¼ cup chopped sun-dried tomatoes,\r\n\r\n¼ cup sliced Kalamata olives\r\n\r\n2 tablespoons crum', '64bfaee8602831389405-19d4e5ab57bb43c6a023b8a3b9b267b3.webp', 0, '2023-07-25 19:15:52', 31, 'meynard', 'asiancuisine', 'Pour water and chicken broth into a saucepan; stir in the garlic and bring to a boil. Stir in pearl couscous, cover the pan and remove from heat. Allow couscous to stand until water has been absorbed, about 5 minutes; fluff with a fork. Allow couscous to burn', 'This hearty Greek couscous salad uses Israeli couscous. So delicious!'),
(80, 'Salmon Couscous Salad', '1/2 cup mayonnaise,\r\n\r\n1/2 cup buttermilk,\r\n\r\n1/4 cup prepared pesto,\r\n\r\n1 lemon, juiced,\r\n\r\n1 clove garlic,\r\n\r\nground black pepper to taste,\r\n\r\nCouscous:,\r\n\r\n1 (5.8 ounce) package herb and garlic couscous,\r\n\r\nSalmon:,\r\n\r\n1/2 pound salmon filet, with skin', '64bfb0378f17f7561932_Salmon-Couscous-Salad_TheDailyGourmet_4x3-e770324e8ab44d2097bbbc9c48be0122.webp', 1, '2023-07-25 19:21:27', 186, 'blazeDreyden', 'salad', 'Add mayonnaise buttermilk pesto, lemon juice, and garlic to the bowl of a food processor. Blend until smooth. Season to taste with black pepper. Set dressing aside.,\r\n\r\nMeanwhile heat a skillet over medium-high heat. Season salmon with Greek seasoning. Cu', 'This salmon couscous salad recipe features salmon, couscous, and arugula salad layered in a bowl and drizzled with homemade pesto dressing for a unique presentation. This dish is a nod to a dish I tried at a local restaurant.'),
(81, 'Tarragon Chicken Salad', '4 boneless, skinless chicken breasts\r\n\r\n1 tablespoon olive oil\r\n\r\n1 pinch salt\r\n\r\n1 pinch freshly ground black pepper\r\n\r\n\r\n1/2 cup mayonnaise\r\n\r\n1/4 cup plain Greek yogurt\r\n\r\n2 tablespoons freshly squeezed lemon juice\r\n\r\n1 teaspoon Dijon mustard\r\n\r\n2 tabl', '64c1ed950a124chicken_taragon.jpg', 1, '2023-07-27 12:07:49', 41, 'jdCoke', 'salad', 'Gather the ingredients. Preheat the oven to 350 F.\r\n\r\nRub the chicken breasts with the olive oil and place them on a sheet pan. Sprinkle with salt and pepper. Roast them in the oven for 35 to 40 minutes, until the chicken is cooked through. Set aside to c', 'Chicken salad is a deli and sandwich favorite for many. Chunks of cooked skinless, boneless chicken breast tossed in mayonnaise dressing often with diced celery is delicious. We love it on bread or just served on the side with crackers and fruit, but this'),
(85, 'Honey Walnut Shrimp', '1 cup water\r\n\r\n⅔ cup white sugar\r\n\r\n½ cup walnuts\r\n\r\n4 large egg whites\r\n\r\n⅔ cup mochiko (glutinous rice flour)\r\n\r\n1 cup vegetable oil for frying\r\n\r\n1 pound large shrimp, peeled and deveined\r\n\r\n¼ cup mayonnaise\r\n\r\n2 tablespoons honey\r\n\r\n1 tablespoon canne', '64c45ed2de686honey-walnut-shrimp-5.jpg', 0, '2023-07-27 17:45:26', 100, 'jdCoke', 'asiancuisine', 'Stir together water and sugar in a small saucepan over high heat. Bring to a boil and add walnuts. Boil for 2 minutes, then drain and place walnuts on a cookie sheet to dry.\r\n\r\nWhip egg whites in a medium bowl until foamy. Stir in mochiko until it has a p', 'This honey walnut shrimp is a Hong Kong-style recipe! Crispy battered shrimp are tossed in a creamy sauce and topped with sugar-coated walnuts.'),
(86, 'sample', 'sample\r\n\r\nsample\r\n\r\nsample\r\n\r\nsample\r\n\r\nsample\r\n', '64c46b5664c48b56cf5a82570ac42edbe03559c0d8c12.jpg', 0, '2023-07-29 09:28:11', 106, 'sample', 'asiancuisine', 'sample\r\n\r\nsamplesample\r\n\r\nsample\r\n', 'sample samplesample'),
(87, 'Burger', 'sugar\r\n\r\nspice\r\n\r\neverything nice', '64c6157e980a1fast-food-burgers.webp', 0, '2023-07-30 15:47:10', 49, 'dkong', 'europeandish', '111111111111\r\n\r\n222222222\r\n\r\n3333333333\r\n\r\n\r\n4444444444', 'burger basic cooking best from our kusina'),
(94, 'tempura', 'shrimp\r\n\r\ning1\r\n\r\ning2\r\n\r\ning3', '64cbb7769882d1107115_l-2.jpg', 0, '2023-08-01 20:15:40', 54, 'johnsmith', 'asiancuisine', 'testing\r\n\r\n\r\ntesting\r\n\r\ntesting', 'testing'),
(95, 'Grilled Lobster Tails', '1/4 cup olive oil, or melted unsalted butter\r\n\r\n1/4 cup freshly squeezed lemon juice, plus wedges for serving\r\n\r\n1 tablespoon finely chopped fresh dill\r\n\r\n1 teaspoon kosher salt\r\n\r\n6 medium lobster tails', '64cf61e47c326grilled-lobster-tails-recipe-335995-hero-01-f720dfe3288d4096bfbbfe981b077514.webp', 1, '2023-08-06 17:03:32', 111, 'sheene', 'europeandish', 'Gather the ingredients.\r\n\r\nPreheat the grill for medium-high heat.\r\n\r\nCombine the olive oil, lemon juice, dill, and salt in a small bowl, stirring until the salt has dissolved. Set aside.\r\n\r\nTo split the lobster tails in half, place them on a cutting boar', 'This grilled lobster is perfect for any occasion. Even if you don\'t have a lot of experience in grilling shellfish, this will be an easy recipe for you if you start with either fresh or frozen lobster tails.\r\n\r\nThis recipe assumes you aren\'t starting with'),
(96, 'Topokki', '350g / 12 ounces Korean rice cakes, separated\r\n\r\n150g / 5.3 ounces Korean fish cakes, rinsed over hot water & cut into bite size pieces\r\n\r\n2 cups Korean soup stock (dried kelp and dried anchovy stock), use this recipe\r\n\r\n60g / 2 ounces onion, thinly slice', '64d476efaad3bR_(1).jpg', 0, '2023-08-10 13:34:39', 29, 'wonyoung', 'asiancuisine', 'Unless your rice cakes are soft already, soak them in warm water for 10 mins.\r\n\r\nBoil the soup stock in a shallow pot over medium high heat and dissolve the tteokbokki sauce by stirring it with a spatula. Once the seasoned stock is boiling, add the rice c', 'Tteokbokki is one of the most popular Korean street foods in Korea. Among other things, today’s recipe is made with Korean rice cakes, Korean fish cakes, Korean soup stock / dashi stock and gochujang (Korean chili paste)!!\r\n\r\nIt’s super delicious, umami r'),
(98, 'SPICY PORK BULGOGI (JEYUK BOKKEUM)', '2 pounds thinly sliced pork shoulder or butt (or a combination of pork shoulder or butt and pork belly)\r\n1/2 medium onion, sliced\r\n\r\n3 scallions, cut into 2-inch pieces\r\n\r\n6 tablespoons gochujang\r\n\r\n1 or 2 tablespoons gochugaru\r\n\r\n3 tablespoons soy sauce\r', '64d4b708a65e640C97F5E-053F-44B3-9E03-9B4AD4AC776E.webp', 0, '2023-08-10 18:08:08', 46, 'wonyoung', 'asiancuisine', 'Thinly slice the meat, if not pre-sliced.\r\n\r\n\r\nMix all marinade ingredients well in a large bowl. Add the meat and toss everything well to evenly coat the meat with the marinade. Add the onion and scallions and toss again. Let it sit for about 30 minutes.\r\n\r\nGrill or pan fry in a skillet (in 2 batches) over medium high heat until slightly caramelized. Adjust the heat as necessary.', 'You can never go wrong with the classic Korean bulgogi recipe, especially when made with the ever-popular pork meat.\r\n\r\nLet me introduce you to the incredible Spicy Pork Bulgogi! It’s the superstar of Korean pork dishes and a hit at every Korean barbecue '),
(99, 'Mixed sead food Clam Bake Recipe | Homemade Recipes', '1 cup cold water\r\n\r\n2 cups dry white wine\r\n\r\n2 1/2 tbsp. Old Bay seasoning\r\n\r\n1 tsp. coarse sea salt\r\n\r\n4 garlic cloves, crushed\r\n\r\n1 red onion, chopped\r\n\r\n2 lb. potatoes, halved\r\n\r\n2 lobsters\r\n\r\n2 dozen Manila clams\r\n\r\n4 ears fresh corn, cut into four\r\n\r', '64d5877b923c1Seafood.webp', 0, '2023-08-11 08:57:31', 87, 'blazeDreyden', 'asiancuisine', 'dd the water, wine, Old Bay, garlic, and salt into a huge stockpot and bring it to a boil..\r\n\r\nAdd the onion and potatoes into the pot first, cover, then cook on medium/high heat for 15 minutes.\r\n\r\njjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj\r\n\r\n\r\nkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk\r\n\r\n\r\n\r\nlllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll\r\n\r\n\r\n\r\nmmmmmmmmmmmmmmmmmmmmmmmmmm\r\n\r\n\r\n\r\nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn\r\n\r\n\r\nooooooooooooooooooooooooooooooooooooooooo\r\n\r\n\r\nppppppppppppppppppppppppppppppppp\r\n\r\n\r\n\r\nqqqqqqqqqqqqqqqqqqqqqqqqqq', 'Lobster, clams, potatoes, corn, onions, and lemon, all in one dish. \r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nulla facilisi morbi tempus iaculis urna. Nunc vel risus commodo viverra maecenas. Vitae congue eu consequat ac felis donec et. Nulla facilisi cras fermentum odio eu feugiat pretium. Quis blandit turpis cursus in. A pellentesque sit amet porttitor eget dolor morbi non. Pharetra magna ac placerat vestibulum lectus mauris. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Aliquam purus sit amet luctus venenatis lectus magna. Varius sit amet mattis vulputate enim nulla. Senectus et netus et malesuada fames ac turpis egestas integer.\r\n\r\nParturient montes nascetur ridiculus mus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Tempor id eu nisl nunc mi ipsum. Aliquet porttitor lacus luctus accumsan. Pretium lectus quam id leo. Orci phasellus egestas'),
(100, 'Lobster Thermidor', '1 medium (1 1/2 pound) cooked lobster\r\n\r\n2 tablespoons butter\r\n\r\n1 shallot, finely chopped\r\n\r\n1 ⅜ cups fresh fish stock\r\n\r\n¼ cup white wine\r\n\r\n¼ cup heavy cream\r\n\r\n½ teaspoon hot English mustard\r\n\r\n2 tablespoons chopped fresh parsley\r\n\r\n1 tablespoon fresh', '64d5b2845ace287997400-56a2f6f75f9b58b7d0cfe47a.jpg', 0, '2023-08-11 12:01:08', 77, 'blazeDreyden', 'asiancuisine', 'Cut lobster in half lengthwise, and remove any meat from the claws, tail, and head. Cut meat into pieces and place back into the shells.\r\n\r\nMelt butter in a large skillet over medium heat. Add shallot; cook and stir until tender. Mix in fish stock, white wine, and cream. Bring to a boil, and cook until reduced by half. Mix in parsley, lemon juice, mustard, salt, and pepper.\r\n\r\npreheat oven boilerrrrrr\r\n\r\n', 'This stunning lobster Thermidor is surprisingly simple to make. Lobster shells are stuffed with cooked lobster in a creamy white wine sauce, then topped with Parmesan cheese and broiled until golden'),
(101, 'Vegetable Teppanyaki', '1/4 white cabbage, julienned\r\n\r\n2 carrots, julienned\r\n\r\n1 zucchini, thinly sliced\r\n\r\n4 spring onions, chopped\r\n\r\n1 small red capsicum, thinly sliced\r\n\r\n1 small white onion, thinly sliced\r\n\r\n1 tbsp rice wine vinegar\r\n\r\n1 tbsp light soy sauce\r\n\r\n2 tsp mirin', '64d85df859c98bf8986bfc977b0951aec5902fcfa4630.jpg', 1, '2023-08-13 12:37:12', 80, 'wonyoung', 'vegetarian', 'Heat up a large griddle and set it to high.\r\n\r\nAdd sesame oil and once it’s near its smoking point add the vegetables. Let it sit in the griddle to partly brown on one side.\r\n\r\nCombine the rice wine vinegar, light soy sauce and mirin then sprinkle it over the vegetables while stir frying to give it some moisture. Cook vegetable for 1 to 2 minutes making sure it’s still crispy.\r\n\r\nSeason with sea salt if needed then place in serving platters, serve garnished with toasted sesame seeds.', 'Vegetable Teppanyaki is a Japanese dish of mixed vegetables cooked in a teppan, vegetables can be any mixture of cabbage, bean sprouts, carrots, capsicum, courgettes, beans and mushrooms but not limited to it.'),
(102, 'Mughali Chicken', '4 cardamom pods\r\n\r\n10 garlic cloves, peeled\r\n\r\n6 whole cloves\r\n\r\n4-1/2 teaspoons chopped fresh gingerroot\r\n\r\n1 tablespoon unblanched almonds\r\n\r\n1 tablespoon salted cashews\r\n\r\n1 teaspoon ground cinnamon\r\n\r\n6 small red onions, halved and sliced\r\n\r\n4 jalapen', '64dcbb0639da6Mughali-Chicken_EXPS_TOHON19_41746_B06_11_15b.jpg', 0, '2023-08-16 20:03:18', 41, 'rayMont', 'asiancuisine', 'Remove seeds from cardamom pods; place in a food processor. Add the garlic, cloves, ginger, almonds, cashews and cinnamon; cover and process until blended. Set aside.\r\n\r\nIn a large skillet, saute onions and jalapenos in oil until tender. Stir in water and the garlic mixture. Add the chicken, milk, yogurt and turmeric. Bring to a boil. Reduce heat; simmer, uncovered, until chicken juices run clear, 8-10 minutes. Sprinkle with cilantro. Serve with naan or rice if desired.', 'I enjoy cooking for my family and try to incorporate healthy new foods into our menus. This authentic Indian dish is a favorite. —Aruna Kancharla, Bentonville, Arkansas'),
(106, 'Filipino Pork Sisig', 'Pork belly\r\n\r\nVegetable oil\r\n\r\nPineapple juice\r\n\r\nWater\r\n\r\nUnsalted butter\r\n\r\nChicken liver (fresh) or store bought liver pate\r\n\r\nRed onion\r\n\r\nRed or green chilies\r\n\r\nCalamansi juice, can substitute with lemon or lime juice\r\n\r\nSoy sauce\r\n\r\nSalt & pepper ', '64e388322ac83Sisig-Pork-Recipe.jpg', 0, '2023-08-21 23:52:18', 11, 'meynard', 'asiancuisine', 'To give pork sisig its delicious crunchy textures, you can either grill or pan fry the pork.\r\n\r\nIn this pork sisig recipe, we first boil the pork belly until tender and let it dry.\r\n\r\nWe then pan-fry the pork belly in a cast-iron skillet until it turns brown and crispy. Once we add the cooked chicken liver and seasonings we cook everything together in butter for even more crispy textures.', 'This easy pork sisig recipe is for one of the most popular Filipino foods. A combination of crunchy pork belly, citrusy calamansi juice, soy sauce and chilies will transport your taste buds to the Philippines. In only about 30 minutes, enjoy this specialty bursting with flavors.');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `userTo` varchar(100) NOT NULL,
  `userFrom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `userTo`, `userFrom`) VALUES
(13, 'meynard', 'jdCoke'),
(67, 'meynard', 'sheene'),
(68, 'aziAcosta', 'jdCoke'),
(73, 'meynard', 'blazeDreyden'),
(75, 'meynard', 'aziAcosta'),
(77, 'jdCoke', 'sample'),
(81, 'blazeDreyden', 'jdCoke'),
(82, 'sample', 'jdCoke'),
(84, 'meynard', 'dkong'),
(88, 'meynard', 'richie'),
(90, 'blazeDreyden', 'meynard'),
(141, 'meynard', 'johnsmith'),
(144, 'meynard', 'rayMont'),
(145, 'meynard', 'luffy'),
(148, 'meynard', 'sample'),
(151, 'aziAcosta', 'wonyoung'),
(154, 'sheene', 'meynard'),
(159, 'meynard', 'blizzard'),
(187, 'meynard', 'hermione'),
(188, 'meynard', 'wonyoung'),
(191, 'sheene', 'blazeDreyden'),
(198, 'meynard', 'harry');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `signUpDate` datetime NOT NULL DEFAULT current_timestamp(),
  `profilePic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `firstName`, `lastName`, `username`, `email`, `password`, `signUpDate`, `profilePic`) VALUES
(2, 'Meynard', 'Olicia', 'meynard', 'olicia.meynard@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-18 00:56:39', 'qxkj97e87_img_1.jpg'),
(4, 'Blaze', 'Olicia', 'blazeDreyden', 'blaze@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-18 20:10:51', '64cf5f65690feDSC_6603_-_Copy.JPG'),
(5, 'Sheene Shazy Lou', 'Olicia', 'sheene', 'tabladasheene@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-18 20:13:58', '64cf620f91e742x2_(2).jpg'),
(6, 'Azi', 'Acosta', 'aziAcosta', 'azi@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-18 20:17:47', 'az.webp'),
(8, 'Jane', 'Deleon', 'jdCoke', 'janedeleon@olicia.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-22 07:36:23', 'jd.jpg'),
(9, 'Donkey', 'Kong', 'dkong', 'dk@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-25 16:38:34', 'ddddddd_dk.jpg'),
(10, 'Monkey', 'Luffy', 'luffy', 'luffy@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-25 16:40:15', '64cf65fd9f6b6OIP_(3).jpg'),
(11, 'Sample', 'Sample', 'sample', 'sample@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-29 09:26:44', '64cf669d46c4ffghyf.jpg'),
(12, 'Ray Marvin', 'Montero', 'rayMont', 'ray@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-30 19:41:18', '64cf65952cdbf5dd3047639f836b39515030997dd73c5.jpg'),
(13, 'Richaurdie', 'Fernandezz', 'richie', 'rich@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-07-30 19:48:50', '64c674c32e44eR.jpg'),
(14, 'John', 'Smith', 'johnsmith', 'meynard@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-08-01 20:14:14', '64c8f7c8ba048llllllll.jpg'),
(15, 'Wonyoung', 'Jang', 'wonyoung', 'wonyoung@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-08-06 17:45:46', '64cf6fade708aa7b61f6c63963b5529bbfd3709361722.jpg'),
(16, 'Blizzard', 'Frosty', 'blizzard', 'blizzard@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-08-06 23:53:46', NULL),
(21, 'Hermione', 'Granger', 'hermione', 'hermione@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-08-09 17:24:40', NULL),
(22, 'Harry', 'Potter', 'harry', 'harryP@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-08-17 19:32:39', NULL),
(28, 'Super', 'Mario', 'mario', 'mario@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', '2023-08-24 10:34:34', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_comments2` (`postedBy`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_favorites2` (`username`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `users_to_recipe` (`uploadedBy`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_subscribers3` (`userTo`),
  ADD KEY `users_to_subscribers4` (`userFrom`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=389;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `users_to_comments` FOREIGN KEY (`postedBy`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `users_to_comments2` FOREIGN KEY (`postedBy`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `users_to_favorites` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `users_to_favorites2` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_to_recipe` FOREIGN KEY (`uploadedBy`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `users_to_recipes2` FOREIGN KEY (`uploadedBy`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD CONSTRAINT `users_to_subscribers` FOREIGN KEY (`userTo`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `users_to_subscribers2` FOREIGN KEY (`userFrom`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `users_to_subscribers3` FOREIGN KEY (`userTo`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_to_subscribers4` FOREIGN KEY (`userFrom`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
