CREATE TABLE `aiConversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`context` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aiConversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`state` enum('MT','PR') NOT NULL,
	`content` text NOT NULL,
	`approved` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `economicData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`state` enum('MT','PR') NOT NULL,
	`metric` varchar(100) NOT NULL,
	`value` varchar(255) NOT NULL,
	`unit` varchar(50) NOT NULL,
	`year` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `economicData_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `aiConversations` ADD CONSTRAINT `aiConversations_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;