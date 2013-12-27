/*--Part_2--------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/* THIS CREATES A TABLE FROM THE DAILY METRIC VIEWS                       */
/*----------------------------------------------------------------------- */
/*--Start---------------------------------------------------------------- */

DROP TABLE public."tbl_dailyMetrics";
CREATE TABLE public."tbl_dailyMetrics" as
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

	
DROP TABLE public."tbl_dailyMetricsChart";
CREATE TABLE public."tbl_dailyMetricsChart" (
	"Sector" character varying(90),
	"Count" bigint,
	"fid" serial);

ALTER TABLE public."tbl_dailyMetricsChart" ADD PRIMARY KEY (fid);

INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Administrative and Support and Waste Management and Remediation Services' as "Sector",
	"int_secCountASWMRS" as "Count"
From 
	opengeo."vw_secCountASWMRS";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Agriculture, Forestry, Fishing and Hunting' as "Sector",
	"int_secCountAFFH" as "Count"
From
	opengeo."vw_secCountAFFH";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Construction' as "Sector",
	"int_secCountCon" as "Count"
From
	opengeo."vw_secCountCon";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Educational Services' as "Sector",
	"int_secCountES" as "Count"
From
	opengeo."vw_secCountES";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Finance and Insurance' as "Sector",
	"int_secCountFI" as "Count"
From
	opengeo."vw_secCountFI";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Health Care and Social Assistance' as "Sector",
	"int_secCountHCSA" as "Count"
From
	opengeo."vw_secCountHCSA";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Information' as "Sector",
	"int_secCountInf" as "Count"
From
	opengeo."vw_secCountInf";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Management' as "Sector",
	"int_secCountMan" as "Count"
From
	opengeo."vw_secCountMan";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Mining, Quarrying, and Oil and Gas Extraction' as "Sector",
	"int_secCountMQOGE" as "Count"
From
	opengeo."vw_secCountMQOGE";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Professional, Scientific, and Technical Services' as "Sector",
	"int_secCountPSTS" as "Count"
From
	opengeo."vw_secCountPSTS";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Public Administration' as "Sector",
	"int_secCountPA" as "Count"
From
	opengeo."vw_secCountPA";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Transportation and Warehousing' as "Sector",
	"int_secCountTW" as "Count"
From
	opengeo."vw_secCountTW";
	
INSERT INTO public."tbl_dailyMetricsChart" ("Sector","Count")
Select
	'Utilities' as "Sector",
	"int_secCountUtl" as "Count"
From
	opengeo."vw_secCountUtl";
	
/*--End------------------------------------------------------------------ */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/*  Now import public.tbl_dailyMetrics to GeoServer                       */
/*----------------------------------------------------------------------- */
