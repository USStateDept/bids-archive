/* THIS QUERY CREATES A LIST OF LEADS ADDED TO THE DATATABLE 90 DAYS OR MORE AGO.	*/
/* IT IS THEN USED TO SEND EMAILS TO THE LEAD's SUBMITTING OFFICER, AND				*/
/* UPDATES THE CONTACT_TIMESTAMP TO BE USED THE NEXT TIME.							*/

/* This is just a temp copy of the database for testing */
/*
DROP TABLE IF EXISTS opengeo."DATATABLE_test";
SELECT *
INTO opengeo."DATATABLE_test"
FROM "DATATABLE";
*/

/* Drop the table of leads to contact if it exists */
DROP TABLE IF EXISTS opengeo."BIDS_Status_Email_List";

/* Selects records with a Contact_Timestamp 90 days or older, 	*/
/* and creates a table with the selection in order to be used 	*/
/* to send emails to these leads 								*/
SELECT *
INTO opengeo."BIDS_Status_Email_List"
FROM opengeo."DATATABLE_test"
WHERE "DATATABLE_test"."Contact_Timestamp" < ('now'::text::date - '90 days'::interval)
AND "DATATABLE_test"."Archived" = '0'
AND "DATATABLE_test"."Cleared" = '1';

/* Updates DATATABLE with new Contact_Timestamp" */
UPDATE  opengeo."DATATABLE_test"
SET     "Contact_Timestamp" = 'now'
WHERE "DATATABLE_test"."Contact_Timestamp" < ('now'::text::date - '90 days'::interval)
AND "DATATABLE_test"."Archived" = '0'
AND "DATATABLE_test"."Cleared" = '1';