/*--Part_3--------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/* THIS UPDATES THE METRICS                                               */
/*----------------------------------------------------------------------- */
/*--Start---------------------------------------------------------------- */


/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/* THIS RECREATES TABLES FOR THE DAILY METRIC VIEWS (AND FOR A CHART).    */
/* THE FIRST TIME RUNNING THIS SCRIPT, COMMENT OUT LINE 8 ("DROP TABLE"). */
/* WHEN THESE TABLES ARE ORIGINALLY ADDED TO GEOSERVER, THINGS GET WEIRD. */
/* THIS QUERY FIXES IT.                                                   */
/*----------------------------------------------------------------------- */

/* Count of all Active/Cleared Leads in all sectors */
DROP TABLE opengeo."vw_allLeadsCount";
CREATE TABLE opengeo."vw_allLeadsCount" as
Select COUNT(fid) As "int_allLeadsCount"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0';

/* Value of all Active/Cleared Leads */
DROP TABLE opengeo."vw_allLeadsValueSum";
CREATE TABLE opengeo."vw_allLeadsValueSum" AS 
SELECT sum("DATATABLE"."Project_Size"::float8::numeric) AS "int_allLeadsValueSum"
FROM opengeo."DATATABLE"
WHERE "DATATABLE".fid IS NOT NULL AND "DATATABLE"."Cleared"::text = '1'::text AND "DATATABLE"."Archived"::text = '0'::text;
	
/* Count of all Active/Cleared Leads in all sectors */
DROP TABLE opengeo."vw_weekLeadsCount";
CREATE TABLE opengeo."vw_weekLeadsCount" as
Select COUNT("Timestamp") As "int_weekLeadsCount"
From opengeo."DATATABLE" 
Where "Cleared" ='1'
	AND "Archived" = '0'
	AND "Timestamp" > (Current_Date - interval '7 days');

/* Value of Active/Cleared Leads added in past 7 days */
DROP TABLE opengeo."vw_weekLeadsValueSum";
CREATE TABLE opengeo."vw_weekLeadsValueSum" AS 
SELECT sum("DATATABLE"."Project_Size"::double precision::numeric) AS "int_weekLeadsValueSum"
FROM opengeo."DATATABLE"
WHERE "DATATABLE".fid IS NOT NULL AND "DATATABLE"."Cleared"::text = '1'::text AND "DATATABLE"."Archived"::text = '0'::text AND "DATATABLE"."Timestamp" > ('now'::text::date - '7 days'::interval);
	
/* Administrative and Support and Waste Management and Remediation Services Active/Cleared*/
DROP TABLE opengeo."vw_secCountASWMRS";
CREATE TABLE opengeo."vw_secCountASWMRS" as
Select COUNT(fid) As "int_secCountASWMRS"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Administrative and Support and Waste Management and Remediation Services';

/* Agriculture, Forestry, Fishing and Hunting Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountAFFH";
CREATE TABLE opengeo."vw_secCountAFFH" as
Select COUNT(fid) As "int_secCountAFFH"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Agriculture, Forestry, Fishing and Hunting';

/* Construction Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountCon";
CREATE TABLE opengeo."vw_secCountCon" as
Select COUNT(fid) As "int_secCountCon"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Construction';

/* Educational Services Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountES";
CREATE TABLE opengeo."vw_secCountES" as
Select COUNT(fid) As "int_secCountES"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Educational Services';

/* Finance and Insurance Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountFI";
CREATE TABLE opengeo."vw_secCountFI" as
Select COUNT(fid) As "int_secCountFI"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Finance and Insurance';

/* Health Care and Social Assistance Active/Cleared*/
DROP TABLE opengeo."vw_secCountHCSA";
CREATE TABLE opengeo."vw_secCountHCSA" as
Select COUNT(fid) As "int_secCountHCSA"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Health Care and Social Assistance';
	
/* Information Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountInf";
CREATE TABLE opengeo."vw_secCountInf" as
Select COUNT(fid) As "int_secCountInf"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Information';

/* Manufacturing Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountMan";
CREATE TABLE opengeo."vw_secCountMan" as
Select COUNT(fid) As "int_secCountMan"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Manufacturing';
	
/* Mining, Quarrying, and Oil and Gas Extraction Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountMQOGE";
CREATE TABLE opengeo."vw_secCountMQOGE" as
Select COUNT(fid) As "int_secCountMQOGE"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Mining, Quarrying, and Oil and Gas Extraction';
	
/* Professional, Scientific, and Technical Services Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountPSTS";
CREATE TABLE opengeo."vw_secCountPSTS" as
Select COUNT(fid) As "int_secCountPSTS"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Professional, Scientific, and Technical Services';
	
/* Public Administration Leads Active/Cleared*/
DROP TABLE opengeo."vw_secCountPA";
CREATE TABLE opengeo."vw_secCountPA" as
Select COUNT(fid) As "int_secCountPA"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Public Administration';
	
/* Transportation and Warehousing Leads Active/Cleared */
DROP TABLE opengeo."vw_secCountTW";
CREATE TABLE opengeo."vw_secCountTW" as
Select COUNT(fid) As "int_secCountTW"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Transportation and Warehousing';
	
/* Utilities Leads Active/Cleared */
DROP TABLE opengeo."vw_secCountUtl";
CREATE TABLE opengeo."vw_secCountUtl" as
Select COUNT(fid) As "int_secCountUtl"
From opengeo."DATATABLE" 
Where "Cleared" = '1'
	AND "Archived" = '0'
	AND "Sector" like 'Utilities';

DROP TABLE opengeo."tbl_dailyMetricsChart";

CREATE TABLE opengeo."tbl_dailyMetricsChart" (
	"Sector" character varying(90),
	"Count" bigint,
	"fid" serial);

ALTER TABLE opengeo."tbl_dailyMetricsChart" ADD PRIMARY KEY (fid);

INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Administrative and Support and Waste Management and Remediation Services' as "Sector",
	"int_secCountASWMRS" as "Count"
From 
	opengeo."vw_secCountASWMRS";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Agriculture, Forestry, Fishing and Hunting' as "Sector",
	"int_secCountAFFH" as "Count"
From
	opengeo."vw_secCountAFFH";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Construction' as "Sector",
	"int_secCountCon" as "Count"
From
	opengeo."vw_secCountCon";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Educational Services' as "Sector",
	"int_secCountES" as "Count"
From
	opengeo."vw_secCountES";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Finance and Insurance' as "Sector",
	"int_secCountFI" as "Count"
From
	opengeo."vw_secCountFI";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Health Care and Social Assistance' as "Sector",
	"int_secCountHCSA" as "Count"
From
	opengeo."vw_secCountHCSA";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Information' as "Sector",
	"int_secCountInf" as "Count"
From
	opengeo."vw_secCountInf";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Management' as "Sector",
	"int_secCountMan" as "Count"
From
	opengeo."vw_secCountMan";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Mining, Quarrying, and Oil and Gas Extraction' as "Sector",
	"int_secCountMQOGE" as "Count"
From
	opengeo."vw_secCountMQOGE";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Professional, Scientific, and Technical Services' as "Sector",
	"int_secCountPSTS" as "Count"
From
	opengeo."vw_secCountPSTS";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Public Administration' as "Sector",
	"int_secCountPA" as "Count"
From
	opengeo."vw_secCountPA";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Transportation and Warehousing' as "Sector",
	"int_secCountTW" as "Count"
From
	opengeo."vw_secCountTW";
	
INSERT INTO opengeo."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Utilities' as "Sector",
	"int_secCountUtl" as "Count"
From
	opengeo."vw_secCountUtl";


/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/* END RECREATING OF TABLES FOR THE DAILY METRIC VIEWS.                   */
/*----------------------------------------------------------------------- */


/* THIS QUERY UPDATES A TABLE OF DAILY METRICS */
INSERT INTO opengeo."tbl_dailyMetrics" ("int_allLeadsCount", "int_allLeadsValueSum", "int_weekLeadsCount", "int_weekLeadsValueSum", "int_secCountASWMRS","int_secCountAFFH","int_secCountCon","int_secCountES","int_secCountFI","int_secCountHCSA","int_secCountInf","int_secCountMan","int_secCountMQOGE","int_secCountPSTS","int_secCountPA","int_secCountTW","int_secCountUtl", "Date", "Lat", "Long")
Select
	"int_allLeadsCount" as "int_allLeadsCount", 
	"int_allLeadsValueSum" as "int_allLeadsValueSum",
	"int_weekLeadsCount" as "int_weekLeadsCount",
	"int_weekLeadsValueSum" as "int_weekLeadsValueSum",
	"int_secCountASWMRS" as "int_secCountASWMRS",
	"int_secCountAFFH" as "int_secCountAFFH",
	"int_secCountCon" as "int_secCountCon",
	"int_secCountES" as "int_secCountES",
	"int_secCountFI" as "int_secCountFI",
	"int_secCountHCSA" as "int_secCountHCSA",
	"int_secCountInf" as "int_secCountInf",
	"int_secCountMan" as "int_secCountMan",
	"int_secCountMQOGE" as "int_secCountMQOGE",
	"int_secCountPSTS" as "int_secCountPSTS",
	"int_secCountPA" as "int_secCountPA",
	"int_secCountTW" as "int_secCountTW",
	"int_secCountUtl" as "int_secCountUtl",
	CURRENT_DATE as "Date",
	0 as "Lat",
	0 as "Long"	
From 
	opengeo."vw_allLeadsCount", 
	opengeo."vw_allLeadsValueSum",
	opengeo."vw_weekLeadsCount",
	opengeo."vw_weekLeadsValueSum",
	opengeo."vw_secCountASWMRS",
	opengeo."vw_secCountAFFH",
	opengeo."vw_secCountCon",
	opengeo."vw_secCountES",
	opengeo."vw_secCountFI",
	opengeo."vw_secCountHCSA",
	opengeo."vw_secCountInf",
	opengeo."vw_secCountMan",
	opengeo."vw_secCountMQOGE",
	opengeo."vw_secCountPSTS",
	opengeo."vw_secCountPA",
	opengeo."vw_secCountTW",
	opengeo."vw_secCountUtl";
	
/*--End------------------------------------------------------------------ */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */