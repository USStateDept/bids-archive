DROP TABLE IF EXISTS "IMPORT";

CREATE TABLE "IMPORT"
(
"fid" integer,
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

COPY "IMPORT" FROM 'C:\OpenGeo\webapps\bids\sql\update.csv' CSV DELIMITER ',' HEADER;

SELECT AddGeometryColumn( 'public', 'IMPORT', 'the_geom', 4326, 'POINT', 2 );

UPDATE public."IMPORT" SET the_geom = ST_SetSRID(ST_GeomFromText('POINT(' || "Lon" || ' ' || "Lat" || ')'),4326);

alter table public."IMPORT" alter column "Timestamp" type timestamp with time zone using now();
alter table public."IMPORT" alter column "Contact_Timestamp" type timestamp with time zone using now();
alter table public."IMPORT" alter column "Tender_Date" type date using "Tender_Date"::date;
alter table public."IMPORT" alter column "Project_Announced" type date using "Project_Announced"::date;

ALTER TABLE public."IMPORT" ADD COLUMN "popup_HTML" text;

UPDATE public."IMPORT"
	SET "popup_HTML" = 
		'<div class="popupLead"><div class="popupLeadTitle">' || "Project_Title" || '</div>' 
		|| '<div class="popupLeadDetails">'
		|| '<b>Country: </b>' || "Country" || '<br>'
		|| '<b>Sector: </b>' || "Sector" || '<br>'
		|| '<b>Date Added: </b>' || "Timestamp"::timestamp::date || '<br>'
		|| '<b>Primary Funding Source: </b>' || "Project_Funding_Source" || '<br>'
		|| '<b>Project Size (USD): </b>' || "Project_Size" || '<br>'
		|| '<b>Status: </b>' || "Status" || '<br>'
		|| CASE WHEN "Archived" = '0' THEN '' ELSE '<br><b>Archived: </b>' END || CASE WHEN "Archived" = '0' THEN '' ELSE 'Yes' END || CASE WHEN "Archived" IS NULL THEN '<br>' ELSE '<br>' END
		|| CASE WHEN "Project_Description" IS NULL THEN '' ELSE '<b>Description: </b><br>' END || CASE WHEN "Project_Description" IS NULL THEN '' ELSE "Project_Description" END || CASE WHEN "Project_Description" IS NULL THEN '<br>' ELSE '<br>' END
		|| CASE WHEN "Post_Comments" IS NULL THEN '' ELSE '<br><b>Post Comments: </b><br>' END || CASE WHEN "Post_Comments" IS NULL THEN '' ELSE "Post_Comments" END || CASE WHEN "Post_Comments" IS NULL THEN '<br>' ELSE '<br><br>' END
		|| CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE '<a href="' END || CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE "Link_To_Project" END || CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE '" target="_blank" ' END 
			|| CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE ' onclick="javascript:ga(''send'', ''event'', ''External_Link'', ''' END || CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE "Project_Title" END || CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});">Project Website</a>&nbsp;&nbsp;&nbsp;' END
		|| CASE WHEN "Business_URL" IS NULL THEN '' ELSE '<a href="' END || CASE WHEN "Business_URL" IS NULL THEN '' ELSE "Business_URL" END || CASE WHEN "Business_URL" IS NULL THEN '' ELSE '" target="_blank" ' END 
			|| CASE WHEN "Business_URL" IS NULL THEN '' ELSE ' onclick="javascript:ga(''send'', ''event'', ''Business_Tab_Link'', ''' END || CASE WHEN "Business_URL" IS NULL THEN '' ELSE "Project_Title" END || CASE WHEN "Business_URL" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});">Embassy Website</a>&nbsp;&nbsp;&nbsp;' END
		|| CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE '<a href="mailto:' END || CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE "Submitting_Officer_Contact" END || CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE '" ' END 
			|| CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE ' onclick="javascript:ga(''send'', ''event'', ''Contact'', ''' END || CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE "Project_Title" END || CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});">Contact</a></font></div></div>' END;

INSERT INTO opengeo."DATATABLE"
SELECT *
FROM public."IMPORT";

DROP TABLE "IMPORT";