
/* 2023-06-12 14:56:37 [50 ms] */ 
CREATE TABLE `mydb`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL UNIQUE,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `country` VARCHAR(60) NOT NULL,
  `password` VARCHAR(120) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `profilePic` BLOB,
  PRIMARY KEY (`user_id`));
/* 2023-06-12 14:56:40 [19 ms] */ 
CREATE TABLE `mydb`.`FavoriteRecipes` (
  `user_id` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`),
  CONSTRAINT `favorites_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
/* 2023-06-12 14:56:43 [58 ms] */ 
  CREATE TABLE `mydb`.`recipes` (
  `recipes_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `ready_in_minutes` INT NOT NULL,
  `vegetarian` TINYINT NOT NULL,
  `vegan` TINYINT NOT NULL,
  `gluten_free` TINYINT NOT NULL,
  `servings` INT NOT NULL,
  `instructions` TEXT NOT NULL,
  `ingredients` JSON NOT NULL,
  `image` TEXT NULL,
  PRIMARY KEY (`recipes_id`),
  CONSTRAINT `recipes_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
/* 2023-06-12 14:56:44 [27 ms] */ 
  
CREATE TABLE `mydb`.`family_recipe` (
  `recipes_id` INT NOT NULL,
  `creatorBy` VARCHAR(100) NULL,
  `usualTime` VARCHAR(100) NULL,
  PRIMARY KEY (`recipes_id`),
  CONSTRAINT `recipe_recipe_id`
    FOREIGN KEY (`recipes_id`)
    REFERENCES `mydb`.`recipes` (`recipes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
/* 2023-06-12 14:56:45 [51 ms] */ 
CREATE TABLE `mydb`.`LikeRecipes` (
  `recipe_id` INT NOT NULL,
  `popularity` INT NOT NULL,
  PRIMARY KEY (`recipe_id`)
);
/* 2023-06-12 15:03:25 [50 ms] */ 
  CREATE TABLE `mydb`.`viewed` (
  `user_id` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`),
  CONSTRAINT `views_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
/* 2023-06-12 16:52:40 [22 ms] */ 
ALTER TABLE likerecipes 
	CHANGE popularity likes int NOT NULL
;
/* 2023-06-12 16:55:29 [53 ms] */ 
ALTER TABLE recipes 
	CHANGE recipes_id recipe_id int NOT NULL AUTO_INCREMENT
;
/* 2023-06-12 16:55:43 [41 ms] */ 
ALTER TABLE family_recipe 
	CHANGE recipes_id recipe_id int NOT NULL
;
/* 2023-06-12 19:17:08 [52 ms] */ 
ALTER TABLE family_recipe 
	CHANGE `creatorBy` `author` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
;
/* 2023-06-12 19:17:25 [46 ms] */ 
ALTER TABLE family_recipe 
	CHANGE `usualTime` `whenDoWeEat` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
;
/* 2023-06-12 19:18:48 [21 ms] */ 
ALTER TABLE family_recipe 
	ADD COLUMN ingredients JSON COMMENT '' AFTER `whenDoWeEat`;
/* 2023-06-12 19:19:11 [34 ms] */ 
ALTER TABLE family_recipe 
	CHANGE ingredients ingredients json NOT NULL
;
/* 2023-06-12 19:23:20 [55 ms] */ 
ALTER TABLE recipes 
	ADD COLUMN popularity INT COMMENT '' DEFAULT 0 AFTER `image` ;
/* 2023-06-12 19:24:00 [24 ms] */ 
ALTER TABLE recipes 
	CHANGE ready_in_minutes readyInMinutes int NOT NULL
;
/* 2023-06-12 19:25:38 [34 ms] */ 
ALTER TABLE recipes 
	CHANGE servings numberOfportions int NOT NULL
;
/* 2023-06-12 19:27:25 [69 ms] */ 
ALTER TABLE recipes 
	CHANGE popularity popularity int DEFAULT '0' NOT NULL
;
/* 2023-06-12 19:31:41 [22 ms] */ 
ALTER TABLE family_recipe 
	ADD COLUMN image text(65535) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '' AFTER `ingredients`;
/* 2023-06-12 19:32:21 [31 ms] */ 
ALTER TABLE family_recipe 
	ADD COLUMN user_id INT NOT NULL COMMENT '' AFTER `recipe_id`;
/* 2023-06-12 19:35:07 [46 ms] */ 
ALTER TABLE family_recipe 
	ADD COLUMN instructions JSON NOT NULL COMMENT '' AFTER `ingredients`;
/* 2023-06-14 21:19:51 [169 ms] */ 
ALTER TABLE family_recipe 
	ADD COLUMN title VARCHAR(100) COMMENT '' AFTER `user_id`;
