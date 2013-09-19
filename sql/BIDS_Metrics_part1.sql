/*--Part_1--------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/* THIS CREATES A SET OF VIEWS TO ESTABLISH A DAILY METRIC                */
/*----------------------------------------------------------------------- */
/*--Start---------------------------------------------------------------- */

/* Count of all Active/Cleared Leads in all sectors */
CREATE OR REPLACE VIEW public."vw_allLeadsCount" as
Select COUNT(fid) As "int_allLeadsCount"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Status" <> 'Archived';

/* Value of all Active/Cleared Leads */
CREATE OR REPLACE VIEW public."vw_allLeadsValueSum" AS 
SELECT sum("DATATABLE"."Project_Size"::float8::numeric) AS "int_allLeadsValueSum"
FROM opengeo."DATATABLE"
WHERE "DATATABLE".fid IS NOT NULL AND "DATATABLE"."Cleared"::text = '1'::text AND "DATATABLE"."Status"::text <> 'Archived'::text;
ALTER TABLE public."vw_allLeadsValueSum"
	OWNER TO postgres;
	
/* Count of all Active/Cleared Leads in all sectors */
CREATE OR REPLACE VIEW public."vw_weekLeadsCount" as
Select COUNT("Timestamp") As "int_weekLeadsCount"
From opengeo."DATATABLE" 
Where "Cleared" ='1'
	AND "Status" <> 'Archived'
	AND "Timestamp" > (Current_Date - interval '7 days');

/* Value of Active/Cleared Leads added in past 7 days */
CREATE OR REPLACE VIEW public."vw_weekSumValueLeads" AS 
SELECT sum("DATATABLE"."Project_Size"::double precision::numeric) AS "int_weekSumValueLeads"
FROM opengeo."DATATABLE"
WHERE "DATATABLE".fid IS NOT NULL AND "DATATABLE"."Cleared"::text = '1'::text AND "DATATABLE"."Status"::text <> 'Archived'::text AND "DATATABLE"."Timestamp" > ('now'::text::date - '7 days'::interval);
ALTER TABLE public."vw_weekSumValueLeads"
	OWNER TO postgres;
	
/* Infrastructure Sector Leads (Active/Cleared) */
CREATE OR REPLACE VIEW public."vw_allSecCountInf" as
Select COUNT(fid) As "int_allSecCountInf"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Status" <> 'Archived'
	AND "Sector" like 'Infrastructure';

	
/* ICT Sector Leads (Active/Cleared) */
CREATE OR REPLACE VIEW public."vw_allSecCountIct" as
Select COUNT(fid) As "int_allSecCountIct"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Status" <> 'Archived'
	AND "Sector" like 'ICT';

/* Agriculture & Environment Sector Leads (Active/Cleared) */
CREATE OR REPLACE VIEW public."vw_allSecCountAge" as
Select COUNT(fid) As "int_allSecCountAge"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Status" <> 'Archived'
	AND "Sector" like 'Ag and Environment';

/* Governance & Services Sector Leads (Active/Cleared) */
CREATE OR REPLACE VIEW public."vw_allSecCountGos" as
Select COUNT(fid) As "int_allSecCountGos"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Status" <> 'Archived'
	AND "Sector" like 'Governance and Services';

/* Natural Resources Sector Leads (Active/Cleared) */
CREATE OR REPLACE VIEW public."vw_allSecCountNar" as
Select COUNT(fid) As "int_allSecCountNar"
From opengeo."DATATABLE"
Where "Cleared" = '1'
	AND "Status" <> 'Archived'
	AND "Sector" like 'Natural Resources';

/* Energy Sector Leads (Active/Cleared) */
CREATE OR REPLACE VIEW public."vw_allSecCountEne" as
Select COUNT(fid) As "int_allSecCountEne"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Status" <> 'Archived'
	AND "Sector" like 'Energy';
	
/*--End------------------------------------------------------------------ */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/*  Now import each view               to GeoServer                       */
/*----------------------------------------------------------------------- */
