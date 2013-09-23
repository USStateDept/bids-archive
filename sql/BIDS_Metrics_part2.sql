/*--Part_2--------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/* THIS CREATES A TABLE FROM THE DAILY METRIC VIEWS                       */
/*----------------------------------------------------------------------- */
/*--Start---------------------------------------------------------------- */

/* DROP TABLE public."tbl_dailyMetrics"; */
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
	
/*--End------------------------------------------------------------------ */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/*  Now import public.tbl_dailyMetrics to GeoServer                       */
/*----------------------------------------------------------------------- */
