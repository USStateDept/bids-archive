/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/* THIS CREATES A TABLE FROM THE DAILY METRIC VIEWS FOR A CHART           */
/* THE FIRST TIME RUNNING THIS SCRIPT, COMMENT OUT LINE 8 ("DROP TABLE")  */
/*----------------------------------------------------------------------- */
/*--Start---------------------------------------------------------------- */

DROP TABLE public."tbl_dailyMetricsChart";

CREATE TABLE public."tbl_dailyMetricsChart" (
	"Sector" character varying(90),
	"Count" bigint
);

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
/*  Now import public.tbl_dailyMetricsChart to GeoServer                  */
/*  Specify EPSG:900913 as the projection                                 */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */