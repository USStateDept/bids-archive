/* THIS QUERY CREATES A LIST OF LEADS ADDED TO THE DATATABLE 90 DAYS OR MORE AGO.	*/
/* IT IS THEN USED TO SEND EMAILS TO THE LEAD's SUBMITTING OFFICER, AND				*/
/* UPDATES THE CONTACT_TIMESTAMP TO BE USED THE NEXT TIME.							*/

/* This is just a temp copy of the database for testing 							*/
/*
DROP TABLE IF EXISTS opengeo."DATATABLE_test";
SELECT *
INTO opengeo."DATATABLE_test"
FROM "DATATABLE";
*/

/* Drop the tables of leads to contact if they exists 								*/
DROP TABLE IF EXISTS opengeo."BIDS_Status_Email_List_90day";
DROP TABLE IF EXISTS opengeo."BIDS_Status_Email_List_140day";
DROP TABLE IF EXISTS opengeo."BIDS_Status_Email_List_150day";
DROP TABLE IF EXISTS opengeo."BIDS_Status_Email_List_151day";


/* Selects records with a Contact_Timestamp of 90 days  	 						*/
/* and creates a table with the selection in order to be used 						*/
/* to send emails to these leads 													*/
/* TO: FSO																			*/
/* FROM: BIDS-Mailbox																*/
/* Allow options to link back to bids.state.gov to edit, or an archive button		*/
SELECT *
INTO opengeo."BIDS_Status_Email_List_90day"
FROM opengeo."DATATABLE_test"
WHERE "DATATABLE_test"."Contact_Timestamp" > ('now'::text::date - '90 days'::interval)
	AND "DATATABLE_test"."Contact_Timestamp" < ('now'::text::date - '89 days'::interval)
	AND "DATATABLE_test"."Archived" = '0'
	AND "DATATABLE_test"."Cleared" = '1';
ALTER TABLE Opengeo."BIDS_Status_Email_List_90day" ADD COLUMN fid BIGSERIAL PRIMARY KEY;


/* Selects records with a Contact_Timestamp of 140 days  	 						*/
/* and creates a table with the selection in order to be used 						*/
/* to send emails to these leads 													*/
/* TO: FSO																			*/
/* FROM: BIDS-Mailbox																*/
/* Allow options to link back to bids.state.gov to edit, or an archive button		*/
SELECT *
INTO opengeo."BIDS_Status_Email_List_140day"
FROM opengeo."DATATABLE_test"
WHERE "DATATABLE_test"."Contact_Timestamp" > ('now'::text::date - '140 days'::interval)
	AND "DATATABLE_test"."Contact_Timestamp" < ('now'::text::date - '139 days'::interval)
	AND "DATATABLE_test"."Archived" = '0'
	AND "DATATABLE_test"."Cleared" = '1';
ALTER TABLE Opengeo."BIDS_Status_Email_List_140day" ADD COLUMN fid BIGSERIAL PRIMARY KEY;


/* Selects records with a Contact_Timestamp of 150 days  	 						*/
/* and creates a table with the selection in order to be used 						*/
/* to send emails to these leads 													*/
/* TO: BIDS-Mailbox																	*/
/* FROM: BIDS-Mailbox																*/
/* Allow options to link back to bids.state.gov to edit, or an archive button		*/
SELECT *
INTO opengeo."BIDS_Status_Email_List_150day"
FROM opengeo."DATATABLE_test"
WHERE "DATATABLE_test"."Contact_Timestamp" > ('now'::text::date - '150 days'::interval)
	AND "DATATABLE_test"."Contact_Timestamp" < ('now'::text::date - '149 days'::interval)
	AND "DATATABLE_test"."Archived" = '0'
	AND "DATATABLE_test"."Cleared" = '1';
ALTER TABLE Opengeo."BIDS_Status_Email_List_150day" ADD COLUMN fid BIGSERIAL PRIMARY KEY;


/* Selects records with a Contact_Timestamp of 151 days  	 						*/
/* and creates a table with the selection in order to be used 						*/
/* to send emails to these leads 													*/
/* TO: FSO and BIDS-Mailbox															*/
/* FROM: BIDS-Mailbox																*/
/* Allow option to link back to bids.state.gov to edit								*/
SELECT *
INTO opengeo."BIDS_Status_Email_List_151day"
FROM opengeo."DATATABLE_test"
WHERE "DATATABLE_test"."Contact_Timestamp" > ('now'::text::date - '151 days'::interval)
	AND "DATATABLE_test"."Contact_Timestamp" < ('now'::text::date - '150 days'::interval)
	AND "DATATABLE_test"."Archived" = '0'
	AND "DATATABLE_test"."Cleared" = '1';
ALTER TABLE Opengeo."BIDS_Status_Email_List_151day" ADD COLUMN fid BIGSERIAL PRIMARY KEY;