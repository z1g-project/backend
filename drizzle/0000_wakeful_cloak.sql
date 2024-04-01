-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "app" (
	"name" text PRIMARY KEY NOT NULL,
	"description" text,
	"url" text NOT NULL,
	"image" text NOT NULL,
	CONSTRAINT "app_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"email" text PRIMARY KEY NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL
);

*/