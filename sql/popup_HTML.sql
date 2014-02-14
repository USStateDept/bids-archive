/* This script adds a new column to the DATATABLE, and populates it with a concatenation of data and HTML formatting */

--ALTER TABLE "opengeo"."DATATABLE" DROP COLUMN "popup_HTML";

ALTER TABLE "opengeo"."DATATABLE" ADD COLUMN "popup_HTML" text;

UPDATE "opengeo"."DATATABLE"
	SET "popup_HTML" = 
		'<div class="popupLead"><div class="popupLeadTitle">' || "Project_Title" || '</div>' 
		|| '<div class="popupLeadDetails">'
		|| '<b>Country: </b>' || "Country" || '<br>'
		|| '<b>Sector: </b>' || "Sector" || '<br>'
		|| '<b>Date Added: </b>' || "Timestamp"::timestamp::date || '<br>'
		|| '<b>Primary Funding Source: </b>' || "Project_Funding_Source" || '<br>'
		|| '<b>Project Size (USD): </b>' || "Project_Size" || '<br>'
		|| '<b>Status: </b>' || "Status" || '<br>'
		|| CASE WHEN "Archived" = '0' THEN '' ELSE '<br><b>Archived: </b>' END || CASE WHEN "Archived" = '0' THEN '' ELSE 'Yes' END 
		|| CASE WHEN "Project_Description" IS NULL THEN '' ELSE '<br><br><b>Description: </b><br>' END || CASE WHEN "Project_Description" IS NULL THEN '' ELSE "Project_Description" END 
		|| CASE WHEN "Post_Comments" IS NULL THEN '' ELSE '<br><br><b>Post Comments: </b><br>' END || CASE WHEN "Post_Comments" IS NULL THEN '' ELSE "Post_Comments" END
		|| CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE '<br><br><a href=\"' END || CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE "Link_To_Project" END || CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE '" target="_blank" onclick=\"javascript:ga(''send'', ''event'', ''External_Link'', ''' END || CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE "Project_Title" END || CASE WHEN "Link_To_Project" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});''">Project Website</a>&nbsp;' END
		|| CASE WHEN "Business_URL" IS NULL THEN '' ELSE '<br><br><a href=\"' END || CASE WHEN "Business_URL" IS NULL THEN '' ELSE "Business_URL" END || CASE WHEN "Business_URL" IS NULL THEN '' ELSE '" target="_blank" onclick=\"javascript:ga(''send'', ''event'', ''Business_Tab_Link'', ''' END || CASE WHEN "Business_URL" IS NULL THEN '' ELSE "Project_Title" END || CASE WHEN "Business_URL" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});''">Embassy Website</a>&nbsp;' END
		|| CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE '<br><br><a href=\"' END || CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE "Submitting_Officer_Contact" END || CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE '" target="_blank" onclick=\"javascript:ga(''send'', ''event'', ''Contact'', ''' END || CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE "Project_Title" END || CASE WHEN "Submitting_Officer_Contact" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});''">Contact Embassy</a></font></div></div>' END;
