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
	AND "Archived" = '0';

/* Value of all Active/Cleared Leads */
CREATE OR REPLACE VIEW public."vw_allLeadsValueSum" AS 
SELECT sum("DATATABLE"."Project_Size"::float8::numeric) AS "int_allLeadsValueSum"
FROM opengeo."DATATABLE"
WHERE "DATATABLE".fid IS NOT NULL AND "DATATABLE"."Cleared"::text = '1'::text AND "DATATABLE"."Archived"::text = '0'::text;
ALTER TABLE public."vw_allLeadsValueSum"
	OWNER TO postgres;
	
/* Count of all Active/Cleared Leads in all sectors */
CREATE OR REPLACE VIEW public."vw_weekLeadsCount" as
Select COUNT("Timestamp") As "int_weekLeadsCount"
From opengeo."DATATABLE" 
Where "Cleared" ='1'
	AND "Archived" = '0'
	AND "Timestamp" > (Current_Date - interval '7 days');

/* Value of Active/Cleared Leads added in past 7 days */
CREATE OR REPLACE VIEW public."vw_weekLeadsValueSum" AS 
SELECT sum("DATATABLE"."Project_Size"::double precision::numeric) AS "int_weekLeadsValueSum"
FROM opengeo."DATATABLE"
WHERE "DATATABLE".fid IS NOT NULL AND "DATATABLE"."Cleared"::text = '1'::text AND "DATATABLE"."Archived"::text = '0'::text AND "DATATABLE"."Timestamp" > ('now'::text::date - '7 days'::interval);
ALTER TABLE public."vw_weekLeadsValueSum"
	OWNER TO postgres;
	
/* Administrative and Support and Waste Management and Remediation Services Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountASWMRS" as
Select COUNT(fid) As "int_secCountASWMRS"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Administrative and Support and Waste Management and Remediation Services';


/* Agriculture, Forestry, Fishing and Hunting Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountAFFH" as
Select COUNT(fid) As "int_secCountAFFH"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Agriculture, Forestry, Fishing and Hunting';

/* Construction Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountCon" as
Select COUNT(fid) As "int_secCountCon"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Construction';

/* Educational Services Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountES" as
Select COUNT(fid) As "int_secCountES"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Educational Services';

/* Finance and Insurance Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountFI" as
Select COUNT(fid) As "int_secCountFI"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Finance and Insurance';

/* Health Care and Social Assistance Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountHCSA" as
Select COUNT(fid) As "int_secCountHCSA"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Health Care and Social Assistance';
	
/* Information Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountInf" as
Select COUNT(fid) As "int_secCountInf"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Information';

/* Manufacturing Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountMan" as
Select COUNT(fid) As "int_secCountMan"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Manufacturing';
	
/* Mining, Quarrying, and Oil and Gas Extraction Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountMQOGE" as
Select COUNT(fid) As "int_secCountMQOGE"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Mining, Quarrying, and Oil and Gas Extraction';
	
/* Professional, Scientific, and Technical Services Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountPSTS" as
Select COUNT(fid) As "int_secCountPSTS"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Professional, Scientific, and Technical Services';
	
/* Public Administration Leads Active/Cleared*/
CREATE OR REPLACE VIEW public."vw_secCountPA" as
Select COUNT(fid) As "int_secCountPA"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Public Administration';
	
/* Transportation and Warehousing Leads Active/Cleared */
CREATE OR REPLACE VIEW public."vw_secCountTW" as
Select COUNT(fid) As "int_secCountTW"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Transportation and Warehousing';
	
/* Utilities Leads Active/Cleared */
CREATE OR REPLACE VIEW public."vw_secCountUtl" as
Select COUNT(fid) As "int_secCountUtl"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Utilities';
	
/*--End------------------------------------------------------------------ */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/*  Now import each view               to GeoServer                       */
/*----------------------------------------------------------------------- */
