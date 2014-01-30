			searchFunc = function() {
				var count = 0;
				var filter = "";
				var sec = secBox.displayField;
				var secVal = secBox.getValue();
				var fs = "Project_Funding_Source";
				var fsVal = fsBox.getValue();
				var keyy = "Keyword";
				var keyVal = txtKey.getValue();
				var ten = "Tender_Date";
				var tBeginVal = tBegin.getValue();
				var tEndVal = tEnd.getValue();
				var pra = "Project_Announced";
				var dBeginVal = dBegin.getValue();
				var dEndVal = dEnd.getValue();
				var stat = statBox.displayField;
				var statVal = statBox.getValue();
				var arc = arcBox.displayField;
				var arcVal = arcBox.getValue();
				var siz = "Project_Size";
				var sizeVal = sizeBox.getValue();

				//urlWhole = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3ADATATABLE";
				
				/////////////////
				//////Size
				//////////////////
				if (sizeVal != '') {
					if (sizeVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = sizeVal.split(",");
						filter = filter + "<Or>";
						for (var i = 0; i < parts.length; i++) {
							if (parts[i] == 'Less than $25M') {
								begin = '0';
								end = '24999999';
								filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
							}
							if (parts[i] == '$25-49M') {
								begin = '25000000';
								end = '49999999';
								filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
							}
							if (parts[i] == '$50-99M') {
								begin = '50000000';
								end = '99999999';
								filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
							}
							if (parts[i] == '$100M or more') {
								begin = '100000000';
								filter = filter + "<PropertyIsGreaterThan><PropertyName>" + siz + "</PropertyName><Literal>" + begin + "</Literal></PropertyIsGreaterThan>";
							}
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						if (sizeVal == 'Less than $25M') {
							begin = '0';
							end = '24999999';
							filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
						}
						if (sizeVal == '$25-49M') {
							begin = '25000000';
							end = '49999999';
							filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
						}
						if (sizeVal == '$50-99M') {
							begin = '50000000';
							end = '99999999';
							filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
						}
						if (sizeVal == '$100M or more') {
							begin = '100000000';
							filter = filter + "<PropertyIsGreaterThan><PropertyName>" + siz + "</PropertyName><Literal>" + begin + "</Literal></PropertyIsGreaterThan>";
						}
					}
					count = count + 1;
				}
				
				/////////////////
				//////Tender Date
				//////////////////
				if (tBeginVal != '') {
					var begin = Ext.util.Format.date(tBeginVal, 'm/d/Y');
					var end = Ext.util.Format.date(tEndVal, 'm/d/Y');
					filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + ten + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
					count = count + 1;
				}
				
				/////////////////
				//////Announced Date
				//////////////////
				if (dBeginVal != '') {
					var begin = Ext.util.Format.date(dBeginVal, 'm/d/Y');
					var end = Ext.util.Format.date(dEndVal, 'm/d/Y');
					filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + pra + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
					count = count + 1;
				}

				/////////////////
				//////Status
				//////////////////
				if (statVal.length > 0) {
					if (statVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = statVal.split(",");
						filter = filter + "<Or>";
						console.log(filter);
						for (var i = 0; i < parts.length; i++) {
							filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + stat + "%3C/PropertyName%3E%3CLiteral%3E" + parts[i] + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
							console.log(filter);
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + stat + "%3C/PropertyName%3E%3CLiteral%3E" + statVal + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
					}
					count = count + 1;
				}

				/////////////////
				//////Archived OLD
				//////////////////
			/*	if (arcVal.length > 0) {
					if (arcVal == "Archived") {
						arcVal = 1;
					} else {
						arcVal = 0;
					}
				} else {
					arcVal = 0;
				}
				filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + arc + "%3C/PropertyName%3E%3CLiteral%3E" + arcVal + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
				count = count + 1;
*/
				/////////////////
				//////Archived NEW
				//////////////////
				if (arcVal.length > 0) {
					if (arcVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = arcVal.split(",");
						filter = filter + "<Or>";
						console.log(filter);
						for (var i = 0; i < parts.length; i++) {
							if (parts[i] == "Archived") {
								parts[i] = 1;
							} else {
								parts[i] = 0;
							}
							filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + arc + "%3C/PropertyName%3E%3CLiteral%3E" + parts[i] + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
							console.log(filter);
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						if (arcVal == "Archived") {
							arcVal = 1;
						} else {
							arcVal = 0;
						}
						filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + arc + "%3C/PropertyName%3E%3CLiteral%3E" + arcVal + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
					}
					count = count + 1;
				}

				/////////////////
				//////Sector
				//////////////////
				if (secVal.length > 0) {
					if (secVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = secVal.split(",");
						filter = filter + "<Or>";
						console.log(filter);
						for (var i = 0; i < parts.length; i++) {
							parts[i] = parts[i].replace(" ", "*");
							filter = filter + "%3CPropertyIsLike wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3E" + sec + "%3C/PropertyName%3E%3CLiteral%3E*" + parts[i] + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						secVal = secVal.replace(" ", "*");
						filter = filter + "%3CPropertyIsLike wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3E" + sec + "%3C/PropertyName%3E%3CLiteral%3E*" + secVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					}
					count = count + 1;
				}
				
				///////////////
				////////Funding Source
				//////////////
				if (fsVal.length > 0) {
					if (fsVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = fsVal.split(",");
						filter = filter + "<Or>";
						console.log(filter);
						for (var i = 0; i < parts.length; i++) {

							filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + fs + "%3C/PropertyName%3E%3CLiteral%3E" + parts[i] + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
							console.log(filter);
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + fs + "%3C/PropertyName%3E%3CLiteral%3E" + fsVal + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
					}
					count = count + 1;
				}
				
				///////////////////
				//////Keyword
				//////////////////
				if (keyVal.length > 0) {
					keyVal = keyVal.replace(" ", "*");
					filter = filter + "<Or>%3CPropertyIsLike wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3E" + keyy + "%3C/PropertyName%3E%3CLiteral%3E*" + keyVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					filter = filter + "%3CPropertyIsLike matchCase=\"false\" wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3ECountry%3C/PropertyName%3E%3CLiteral%3E*" + keyVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					filter = filter + "%3CPropertyIsLike matchCase=\"false\" wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3ESector%3C/PropertyName%3E%3CLiteral%3E*" + keyVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					filter = filter + "%3CPropertyIsLike matchCase=\"false\" wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3EProject_Funding_Source%3C/PropertyName%3E%3CLiteral%3E*" + keyVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					filter = filter + "%3CPropertyIsLike matchCase=\"false\" wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3EImplementing_Entity%3C/PropertyName%3E%3CLiteral%3E*" + keyVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					filter = filter + "%3CPropertyIsLike matchCase=\"false\" wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3EProject_Title%3C/PropertyName%3E%3CLiteral%3E*" + keyVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					filter = filter + "%3CPropertyIsLike matchCase=\"false\" wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3EProject_Description%3C/PropertyName%3E%3CLiteral%3E*" + keyVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					filter = filter + "</Or>"
					count = count + 1;
				}

				if (count == 1) {
					urlWhole = urlWhole + "&Filter=%3CFilter%3E%3CAnd%3E" + filter + "%3CPropertyIsEqualTo%3E%0A%09%09%09%3CPropertyName%3ECleared%3C%2FPropertyName%3E%0A%09%09%09%3CLiteral%3E1%3C%2FLiteral%3E%0A%09%09%3C%2FPropertyIsEqualTo%3E%0A%09%3C%2FAnd%3E%3C/Filter%3E";
				}

				if (count > 1) {
					filter = "&Filter=%3CFilter%3E%3CAnd%3E" + filter + "%3CPropertyIsEqualTo%3E%0A%09%09%09%3CPropertyName%3ECleared%3C%2FPropertyName%3E%0A%09%09%09%3CLiteral%3E1%3C%2FLiteral%3E%0A%09%09%3C%2FPropertyIsEqualTo%3E%0A%09%3C%2FAnd%3E%3C/Filter%3E";
					urlWhole = urlWhole + filter;
				}

				var tProxy = new GeoExt.data.ProtocolProxy({
					protocol : new OpenLayers.Protocol.HTTP({
						url : urlWhole + "&outputformat=json&Filter%3D%3CFilter%3E%3CAnd%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3ECleared%3C%2FPropertyName%3E%3CLiteral%3E1%3C%2FLiteral%3E%3C%2FPropertyIsEqualTo%3E%3C%2FAnd%3E%3C%2FFilter%3E",
						format : new OpenLayers.Format.GeoJSON()
					})
				});

				store.proxy = tProxy;
				store.reload();
				grid.getView().refresh();
				
				ga('send', 'event', 'Search_Panel', 'Search_Search_Panel', {'nonInteraction': 1});
				
			}