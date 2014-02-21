/* Drop the tables of leads to contact if they exists							*/
DROP TABLE IF EXISTS opengeo."BIDS_Status_Email_List";

/* Selects records with a Contact_Timestamp of certain ages 						*/
/* and creates a table with the selection in order to be used .						*/
/* Contact_Status specifies how old the contact is and how it should be contacted			*/
/* to send emails to these leads 									*/
/* TO: FSO												*/
/* FROM: BIDS-Mailbox											*/
/* Allow options to link back to bids.state.gov to edit, or an archive button				*/

SELECT *
INTO opengeo."BIDS_Status_Email_List"
FROM opengeo."DATATABLE"
WHERE "DATATABLE"."Contact_Timestamp" >= ('now'::text::date - '91 days'::interval)
	AND "DATATABLE"."Contact_Timestamp" < ('now'::text::date - '90 days'::interval)
	AND "DATATABLE"."Archived" = '0'
	AND "DATATABLE"."Cleared" = '1';
ALTER TABLE Opengeo."BIDS_Status_Email_List" ADD COLUMN Contact_Status integer;

INSERT INTO opengeo."BIDS_Status_Email_List" 
SELECT *
FROM opengeo."DATATABLE"
WHERE "DATATABLE"."Contact_Timestamp" >= ('now'::text::date - '141 days'::interval)
	AND "DATATABLE"."Contact_Timestamp" < ('now'::text::date - '140 days'::interval)
	AND "DATATABLE"."Archived" = '0'
	AND "DATATABLE"."Cleared" = '1';

INSERT INTO opengeo."BIDS_Status_Email_List" 
SELECT *
FROM opengeo."DATATABLE"
WHERE "DATATABLE"."Contact_Timestamp" >= ('now'::text::date - '151 days'::interval)
	AND "DATATABLE"."Contact_Timestamp" < ('now'::text::date - '150 days'::interval)
	AND "DATATABLE"."Archived" = '0'
	AND "DATATABLE"."Cleared" = '1';

INSERT INTO opengeo."BIDS_Status_Email_List" 
SELECT *
FROM opengeo."DATATABLE"
WHERE "DATATABLE"."Contact_Timestamp" >= ('now'::text::date - '152 days'::interval)
	AND "DATATABLE"."Contact_Timestamp" < ('now'::text::date - '151 days'::interval)
	AND "DATATABLE"."Archived" = '0'
	AND "DATATABLE"."Cleared" = '1';

UPDATE "opengeo"."BIDS_Status_Email_List"
SET Contact_Status = 
	CASE 
		WHEN "BIDS_Status_Email_List"."Contact_Timestamp" >= ('now'::text::date - '91 days'::interval) AND "BIDS_Status_Email_List"."Contact_Timestamp" < ('now'::text::date - '90 days'::interval)
			THEN 90
		WHEN "BIDS_Status_Email_List"."Contact_Timestamp" >= ('now'::text::date - '141 days'::interval) AND "BIDS_Status_Email_List"."Contact_Timestamp" < ('now'::text::date - '140 days'::interval)
			THEN 140
		WHEN "BIDS_Status_Email_List"."Contact_Timestamp" >= ('now'::text::date - '151 days'::interval) AND "BIDS_Status_Email_List"."Contact_Timestamp" < ('now'::text::date - '150 days'::interval) 
			THEN 150
		WHEN "BIDS_Status_Email_List"."Contact_Timestamp" >= ('now'::text::date - '152 days'::interval) AND "BIDS_Status_Email_List"."Contact_Timestamp" < ('now'::text::date - '151 days'::interval) 
			THEN 151
	END;