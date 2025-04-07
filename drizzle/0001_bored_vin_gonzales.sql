CREATE TABLE "funktionskreis" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "funktionskreis_name_unique" UNIQUE("name"),
	CONSTRAINT "funktionskreis_order_unique" UNIQUE("order")
);
--> statement-breakpoint
CREATE TABLE "kategorie" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "kategorie_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "verhaltenFunktionskreis" (
	"id" uuid PRIMARY KEY NOT NULL,
	"funktionskreisId" uuid NOT NULL,
	"verhaltenId" uuid NOT NULL,
	"kategorieId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verhalten" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "verhalten_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "verhaltenFunktionskreis" ADD CONSTRAINT "verhaltenFunktionskreis_funktionskreisId_funktionskreis_id_fk" FOREIGN KEY ("funktionskreisId") REFERENCES "public"."funktionskreis"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verhaltenFunktionskreis" ADD CONSTRAINT "verhaltenFunktionskreis_verhaltenId_verhalten_id_fk" FOREIGN KEY ("verhaltenId") REFERENCES "public"."verhalten"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verhaltenFunktionskreis" ADD CONSTRAINT "verhaltenFunktionskreis_kategorieId_kategorie_id_fk" FOREIGN KEY ("kategorieId") REFERENCES "public"."kategorie"("id") ON DELETE no action ON UPDATE no action;