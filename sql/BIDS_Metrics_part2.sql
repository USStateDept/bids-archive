/*--Part_2--------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/* THIS CREATES A TABLE FROM THE DAILY METRIC VIEWS                       */
/*----------------------------------------------------------------------- */
/*--Start---------------------------------------------------------------- */

/* DROP TABLE public."tbl_dailyMetrics"; */
CREATE TABLE public."tbl_dailyMetricsChart" as
Select
	"Administrative and Support and Waste Management and Remediation Services" as "Sector",
	"int_secCountASWMRS" as "Count",
	"Agriculture, Forestry, Fishing and Hunting" as "Sector",
	"int_secCountAFFH" as "Count",
	"Construction" as "Sector",
	"int_secCountCon" as "int_secCountCon",
	"Educational Services" as "Sector",
	"int_secCountES" as "int_secCountES",
	"Finance and Insurance" as "Sector",
	"int_secCountFI" as "int_secCountFI",
	"Health Care and Social Assistance" as "Sector",
	"int_secCountHCSA" as "int_secCountHCSA",
	"Information" as "Sector",
	"int_secCountInf" as "int_secCountInf",
	"Management" as "Sector",
	"int_secCountMan" as "int_secCountMan",
	"Mining, Quarrying, and Oil and Gas Extraction" as "Sector",
	"int_secCountMQOGE" as "int_secCountMQOGE",
	"Professional, Scientific, and Technical Services" as "Sector",
	"int_secCountPSTS" as "int_secCountPSTS",
	"Public Administration" as "Sector",
	"int_secCountPA" as "int_secCountPA",
	"Transportation and Warehousing" as "Sector",
	"int_secCountTW" as "int_secCountTW",
	"Utilities" as "Sector",
	"int_secCountUtl" as "int_secCountUtl"
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
/*  Now import public.tbl_dailyMetrics to GeoServer                       */
/*----------------------------------------------------------------------- */
