DROP TABLE "DATATABLE";

CREATE TABLE "DATATABLE"
(
"Timestamp" timestamp with time zone,
"Contact_Timestamp" timestamp with time zone,
"Lon" character varying(15),
"Lat" character varying(15),
"Country" character varying(50),
"Specific_Location" character varying(255),
"DOS_Region" character varying(50),
"Project_Title" character varying(160),
"Project_Number" character varying(50),
"Sector" character varying(125),
"Project_Size" character varying(15),
"Project_Description" character varying(1300),
"Keyword" character varying(255),
"Source" character varying(80),
"Project_Announced" character varying(30),
"Tender_Date" character varying(30),
"Project_Funding_Source" character varying(100),
"Borrowing_Entity" character varying(200),
"Implementing_Entity" character varying(255),
"Project_POCs" character varying(255),
"Post_Comments" character varying(500),
"Submitting_Officer" character varying(50),
"Submitting_Officer_Contact" character varying(50),
"Link_To_Project" character varying(400),
"Business_URL" character varying(255),
"US_Firm_Contact" character varying(15),
"US_Firm_Wins" character varying(15),
"Cleared" character varying(15),
"Status" character varying(15),
"Archived" character varying(15)
);

set client_encoding to 'latin1';

COPY "DATATABLE" FROM 'C:\Program Files (x86)\OpenGeo\OpenGeo Suite\webapps\bids\sql\txtcsv2.csv' DELIMITER ',' CSV;

SELECT AddGeometryColumn( 'public', 'DATATABLE', 'the_geom', 4326, 'POINT', 2 );

UPDATE public."DATATABLE" SET the_geom = ST_SetSRID(ST_GeomFromText('POINT(' || "Lon" || ' ' || "Lat" || ')'),4326);

alter table public."DATATABLE" alter column "Tender_Date" type date using "Tender_Date"::date;
alter table public."DATATABLE" alter column "Project_Announced" type date using "Project_Announced"::date;
