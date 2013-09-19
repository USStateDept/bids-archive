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
	"int_weekSumValueLeads" as "int_weekSumValueLeads",
	"int_allSecCountInf" as "int_allSecCountInf",
	"int_allSecCountIct" as "int_allSecCountIct",
	"int_allSecCountAge" as "int_allSecCountAge",
	"int_allSecCountGos" as "int_allSecCountGos",
	"int_allSecCountNar" as "int_allSecCountNar",
	"int_allSecCountEne" as "int_allSecCountEne",
	CURRENT_DATE as "Date",
	0 as "Lat",
	0 as "Long"
From 
	opengeo."vw_allLeadsCount", 
	opengeo."vw_allLeadsValueSum",
	opengeo."vw_weekLeadsCount",
	opengeo."vw_weekSumValueLeads",
	opengeo."vw_allSecCountInf",
	opengeo."vw_allSecCountIct",
	opengeo."vw_allSecCountAge",
	opengeo."vw_allSecCountGos",
	opengeo."vw_allSecCountNar",
	opengeo."vw_allSecCountEne";
	
/*--End------------------------------------------------------------------ */
/*----------------------------------------------------------------------- */
/*----------------------------------------------------------------------- */
/*  Now import public.tbl_dailyMetrics to GeoServer                       */
/*----------------------------------------------------------------------- */
