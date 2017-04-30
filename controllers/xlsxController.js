var xlsx = require('xlsx');

module.exports.initMsg = function(url,message) {
	//open file
	var wb = xlsx.readFile(url);
	//scan worksheets
	var j=-1, sheetSize=wb.SheetNames.length;

	while(j++<sheetSize){
		//get worksheet name
		var wsName = wb.SheetNames[j];
		//get worksheet by name
		var ws = wb.Sheets[wsName];
		//get cell range
		if(ws['!ref']==undefined){
			return false;
		}
		var range = (ws['!ref']).split(":");
		var r = range[0].replace( /^\D+/g,''),
			R = range[1].replace( /^\D+/g,''),
			c = alphaOnly(range[0]),
			C = alphaOnly(range[1]);
		//scan col A for id
		for(i=r ; i<=R ; i++) {
			var currAdd = (c+i).toString();
			var cell = ws[currAdd];
			if(message.id==cell.v) {
				message.bill = ws[nextChar(c)+i.toString()].v;
				message.day = ws[nextChar(nextChar(c))+i.toString()].v;
			}//id found
		}//scaning rows
	}//scaning worksheets
	return true;
}

function alphaOnly(a) {
    var b = '';
    for (var i = 0; i < a.length; i++) {
        if (a[i] >= 'A' && a[i] <= 'z') b += a[i];
    }
    return b;
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}