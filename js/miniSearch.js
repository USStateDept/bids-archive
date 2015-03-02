			miniSearchFunc = function() {
				winResults.show();
				var count = 0;
				var filter = "";
				var sec = secBox.displayField;
				var secVal = secBox.getValue();
				var keyy = "Keyword";
				var keyVal = txtKey.getValue();
				var pra = "Project_Announced";
				var dBeginVal = dBegin.getValue();
				
				urlWhole = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=opengeo%3ADATATABLE&maxfeatures=230&outputformat=json";

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
					filter=filter + "</Or>"
					count = count + 1;
				}

				if (count == 1) {
					urlWhole = urlWhole + "&Filter=%3CFilter%3E" + filter + "%3C/Filter%3E";
				}

				if (count > 1) {
					filter = "&Filter=%3CFilter%3E%3CAnd%3E" + filter + "%3C/And%3E%3C/Filter%3E";
					urlWhole = urlWhole + filter;
				}

				var tProxy = new GeoExt.data.ProtocolProxy({
					protocol : new OpenLayers.Protocol.HTTP({
						url : urlWhole,
						format : new OpenLayers.Format.GeoJSON()
					})
				});

				store.proxy = tProxy;
				store.reload();
				
				miniGrid.getView().refresh();
				
				ga('send', 'event', 'Metrics_Panel', 'Metrics_Search_Panel', {'nonInteraction': 1});
				
			}