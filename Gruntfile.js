'use strict';
var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars')

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.registerTask('generateHTML', function() {
		var mainPageListing = [{
			"label": "ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ",
			"hash": "srigurugranthsahibjee"
		}, {
			"label": "ਨਿਤਨੇਮ",
			"hash": "nitnem"
		}]

		var nitnemPageListing = [{
			"label": "ਜਪੁਜੀ ਸਾਹਿਬ",
			"hash": "nitnem_japjeesahib"
		}, {
			"label": "ਜਾਪੁ ਸਾਹਿਬ",
			"hash": "nitnem_jaapsahib"
		}, {
			"label": "ਤ੍ਵ ਪ੍ਰਸਾਦਿ ਸ੍ਵਯੇ",
			"hash": "nitnem_tavprasadsavaiye"
		}, {
			"label": "ਚੌਪਈ ਸਾਹਿਬ",
			"hash": "nitnem_chaupaisahib"
		}, {
			"label": "ਅਨੰਦੁ ਸਾਹਿਬ",
			"hash": "nitnem_anandsahib"
		}, {
			"label": "ਰਹਰਾਸਿ ਸਾਹਿਬ",
			"hash": "nitnem_rehrassahib"
		}, {
			"label": "ਸੋਹਿਲਾ ਸਾਹਿਬ",
			"hash": "nitnem_sohilasahib"
		}]

		var tatkraList = [{
			"label": "ਜਪੁ",
			"hash": "srigurugranthsahibjee_ang_1",
			"angNo": "੧"
		}, {
			"label": "ਸੋ ਦਰੁ",
			"hash": "srigurugranthsahibjee_ang_8",
			"angNo": "੮"
		}, {
			"label": "ਸੋ ਪੁਰਖੁ",
			"hash": "srigurugranthsahibjee_ang_10",
			"angNo": "੧੦"
		}, {
			"label": "ਸੋਹਿਲਾ",
			"hash": "srigurugranthsahibjee_ang_12",
			"angNo": "੧੨"
		}, {
			"label": "ਸਿਰੀਰਾਗੁ",
			"hash": "srigurugranthsahibjee_ang_14",
			"angNo": "੧੪"
		}, {
			"label": "ਰਾਗੁਮਾਝ",
			"hash": "srigurugranthsahibjee_ang_94",
			"angNo": "੯੪"
		}, {
			"label": "ਰਾਗੁਗਉੜੀ",
			"hash": "srigurugranthsahibjee_ang_151",
			"angNo": "੧੫੧"
		}, {
			"label": "ਰਾਗੁਆਸਾ",
			"hash": "srigurugranthsahibjee_ang_347",
			"angNo": "੩੪੭"
		}, {
			"label": "ਰਾਗੁਗੂਜਰੀ",
			"hash": "srigurugranthsahibjee_ang_489",
			"angNo": "੪੮੯"
		}, {
			"label": "ਰਾਗੁਦੇਵਗੰਧਾਰੀ",
			"hash": "srigurugranthsahibjee_ang_527",
			"angNo": "੫੨੭"
		}, {
			"label": "ਰਾਗੁਬਿਹਾਗੜਾ",
			"hash": "srigurugranthsahibjee_ang_537",
			"angNo": "੫੩੭"
		}, {
			"label": "ਰਾਗੁਵਡਹੰਸੁ",
			"hash": "srigurugranthsahibjee_ang_557",
			"angNo": "੫੫੭"
		}, {
			"label": "ਰਾਗੁਸੋਰਠਿ",
			"hash": "srigurugranthsahibjee_ang_595",
			"angNo": "੫੯੫"
		}, {
			"label": "ਰਾਗੁਧਨਾਸਰੀ",
			"hash": "srigurugranthsahibjee_ang_660",
			"angNo": "੬੬੦"
		}, {
			"label": "ਰਾਗੁਜੈਤਸਰੀ",
			"hash": "srigurugranthsahibjee_ang_696",
			"angNo": "੬੯੬"
		}, {
			"label": "ਰਾਗੁਟੋਡੀ",
			"hash": "srigurugranthsahibjee_ang_711",
			"angNo": "੭੧੧"
		}, {
			"label": "ਰਾਗੁਬੈਰਾੜੀ",
			"hash": "srigurugranthsahibjee_ang_719",
			"angNo": "੭੧੯"
		}, {
			"label": "ਰਾਗੁਤਿਲੰਗ",
			"hash": "srigurugranthsahibjee_ang_721",
			"angNo": "੭੨੧"
		}, {
			"label": "ਰਾਗੁਸੂਹੀ",
			"hash": "srigurugranthsahibjee_ang_728",
			"angNo": "੭੨੮"
		}, {
			"label": "ਰਾਗੁਬਿਲਾਵਲੁ",
			"hash": "srigurugranthsahibjee_ang_795",
			"angNo": "੭੯੫"
		}, {
			"label": "ਰਾਗੁਗੋਂਡ",
			"hash": "srigurugranthsahibjee_ang_859",
			"angNo": "੮੫੯"
		}, {
			"label": "ਰਾਗੁਰਾਮਕਲੀ",
			"hash": "srigurugranthsahibjee_ang_876",
			"angNo": "੮੭੬"
		}, {
			"label": "ਰਾਗੁਨਟਨਾਰਾਇਨ",
			"hash": "srigurugranthsahibjee_ang_975",
			"angNo": "੯੭੫"
		}, {
			"label": "ਰਾਗੁਮਾਲੀਗਉੜਾ",
			"hash": "srigurugranthsahibjee_ang_984",
			"angNo": "੯੮੪"
		}, {
			"label": "ਰਾਗੁਮਾਰੂ",
			"hash": "srigurugranthsahibjee_ang_989",
			"angNo": "੯੮੯"
		}, {
			"label": "ਰਾਗੁਤੁਖਾਰੀ",
			"hash": "srigurugranthsahibjee_ang_1107",
			"angNo": "੧੧੦੭"
		}, {
			"label": "ਰਾਗੁਕੇਦਾਰਾ",
			"hash": "srigurugranthsahibjee_ang_1118",
			"angNo": "੧੧੧੮"
		}, {
			"label": "ਰਾਗੁਭੈਰਉ",
			"hash": "srigurugranthsahibjee_ang_1125",
			"angNo": "੧੧੨੫"
		}, {
			"label": "ਰਾਗੁਬਸੰਤੁ",
			"hash": "srigurugranthsahibjee_ang_1168",
			"angNo": "੧੧੬੮"
		}, {
			"label": "ਰਾਗੁਸਾਰਗ",
			"hash": "srigurugranthsahibjee_ang_1197",
			"angNo": "੧੧੯੭"
		}, {
			"label": "ਰਾਗੁਮਲਾਰ",
			"hash": "srigurugranthsahibjee_ang_1254",
			"angNo": "੧੨੫੪"
		}, {
			"label": "ਰਾਗੁਕਾਨੜਾ",
			"hash": "srigurugranthsahibjee_ang_1294",
			"angNo": "੧੨੯੪"
		}, {
			"label": "ਰਾਗੁਕਲਿਆਨ",
			"hash": "srigurugranthsahibjee_ang_1319",
			"angNo": "੧੩੧੯"
		}, {
			"label": "ਰਾਗੁਪ੍ਰਭਾਤੀ",
			"hash": "srigurugranthsahibjee_ang_1327",
			"angNo": "੧੩੨੭"
		}, {
			"label": "ਰਾਗੁਜੈਜਾਵੰਤੀ",
			"hash": "srigurugranthsahibjee_ang_1352",
			"angNo": "੧੩੫੨"
		}, {
			"label": "ਸਲੋਕਸਹਸਕ੍ਰਿਤੀਮਹਲਾ੧",
			"hash": "srigurugranthsahibjee_ang_1353",
			"angNo": "੧੩੫੩"
		}, {
			"label": "ਸਲੋਕਸਹਸਕ੍ਰਿਤੀਮਹਲਾ੫",
			"hash": "srigurugranthsahibjee_ang_1353",
			"angNo": "੧੩੫੩"
		}, {
			"label": "ਮਹਲਾ੫ਗਾਥਾ",
			"hash": "srigurugranthsahibjee_ang_1360",
			"angNo": "੧੩੬੦"
		}, {
			"label": "ਫੁਨਹੇਮਹਲਾ੫",
			"hash": "srigurugranthsahibjee_ang_1361",
			"angNo": "੧੩੬੧"
		}, {
			"label": "ਚਉਬੋਲੇਮਹਲਾ੫",
			"hash": "srigurugranthsahibjee_ang_1363",
			"angNo": "੧੩੬੩"
		}, {
			"label": "ਸਲੋਕਭਗਤਕਬੀਰਜੀਉਕੇ",
			"hash": "srigurugranthsahibjee_ang_1364",
			"angNo": "੧੩੬੪"
		}, {
			"label": "ਸਲੋਕਸੇਖਫਰੀਦਕੇ",
			"hash": "srigurugranthsahibjee_ang_1377",
			"angNo": "੧੩੭੭"
		}, {
			"label": "ਸਵਯੇਸ੍ਰੀਮੁਖਬਾਕਮਹਲਾ੫",
			"hash": "srigurugranthsahibjee_ang_1385",
			"angNo": "੧੩੮੫"
		}, {
			"label": "ਸਲੋਕਵਾਰਾਂਤੇਵਧੀਕ",
			"hash": "srigurugranthsahibjee_ang_1410",
			"angNo": "੧੪੧੦"
		}, {
			"label": "ਸਲੋਕਮਹਲਾ੯",
			"hash": "srigurugranthsahibjee_ang_1426",
			"angNo": "੧੪੨੬"
		}, {
			"label": "ਮੁੰਦਾਵਣੀਮਹਲਾ੫",
			"hash": "srigurugranthsahibjee_ang_1429",
			"angNo": "੧੪੨੯"
		}, {
			"label": "ਰਾਗਮਾਲਾ",
			"hash": "srigurugranthsahibjee_ang_1429",
			"angNo": "੧੪੨੯"
		}]

		var source = fs.readFileSync(path.normalize("template/index.html")).toString();
		var template = handlebars.compile(source);
		var html = template({
			homePageList: mainPageListing,
			nitnemPageList: nitnemPageListing,
			tatkraList: tatkraList
		});

		fs.writeFileSync(path.normalize("www/index.html"), html);
	});

	grunt.registerTask('htmlJsonConversion', function() {
        var _sggsJson = JSON.parse(fs.readFileSync('src/js/SGGS.json').toString());
        var _startSection = "<section id='{{_id}}' data-background='#FFFFFF'>"
        var _endSection = "</section>"
        var _startH_Tag = "<h1>"
        var _endH_Tag = "</h1>\n"
        var _startP_Tag = "<p><strong>"
        var _endP_Tag = "</strong></p>\n"

    	var _ang = '';
		var obj = {
			baani:[]
		};
		var gurbani = [];
        for(var i=0;i<_sggsJson.length;i++) {
        	// if(_ang.baani.length) {
        	// 	_ang.baani.splice(0);
			// }
			var panktiObj = {}
        	if(_sggsJson[i]["bold_Pankti"]) {
				// _ang += _startH_Tag + _sggsJson[i]["bold_Pankti"] + _endH_Tag
				panktiObj["bold"] = true;
				panktiObj["baani_content"] = _sggsJson[i]["bold_Pankti"];
				obj["baani"].push(panktiObj);
        		if(_sggsJson[i]["pageBreak"]) {
        			// _ang += _endSection;
					// _ang = _ang.replace("{{_id}}", _sggsJson[i]["ang"])
					obj["ang"] = _sggsJson[i]["ang"];
					gurbani.push(JSON.parse(JSON.stringify(obj)));
					obj = {
						baani:[]
					};			
				}

			} else if(_sggsJson[i]["arrayOfPankti"]) {
        		var _newPankti = true;
				var _noXML_Preserve = false;
        		for(var j=0;j<_sggsJson[i]["arrayOfPankti"].length;j++) {
					panktiObj = {}
        			if(_sggsJson[i]["arrayOfPankti"][j]["bold_Pankti"]) {
		        		// _ang += _startH_Tag + _sggsJson[i]["arrayOfPankti"][j]["bold_Pankti"] + _endH_Tag
						panktiObj["bold"] = true;
						panktiObj["baani_content"] = _sggsJson[i]["arrayOfPankti"][j]["bold_Pankti"];
						obj["baani"].push(panktiObj);
					} else if(_sggsJson[i]["arrayOfPankti"][j]["pankti"]) {
        				if(_sggsJson[i]["arrayOfPankti"][j]["tab"] && j != 0) {
        					// _ang = _ang.substring(0, _ang.length - _endP_Tag.length)
			        		// _ang += "&nbsp&nbsp&nbsp&nbsp" + _sggsJson[i]["arrayOfPankti"][j]["pankti"] + _endP_Tag
							// panktiObj["tab"] = true;
							// panktiObj["baani_content"] = "&nbsp&nbsp&nbsp&nbsp" + _sggsJson[i]["arrayOfPankti"][j]["pankti"];
							// obj["baani"].push(panktiObj);	
							obj["baani"][obj["baani"].length - 1]["baani_content"] += "&nbsp&nbsp&nbsp&nbsp" + _sggsJson[i]["arrayOfPankti"][j]["pankti"];
						} else if(_sggsJson[i]["arrayOfPankti"][j]["noXML_Preserve"] && j != 0) {
        					// _ang = _ang.substring(0, _ang.length - _endP_Tag.length)
			        		// _ang += _sggsJson[i]["arrayOfPankti"][j]["pankti"] + _endP_Tag
			        		// _noXML_Preserve = true;
							obj["baani"][obj["baani"].length - 1]["baani_content"] += _sggsJson[i]["arrayOfPankti"][j]["pankti"];
							// obj["baani"].push(panktiObj);	
						} else {
        					if(_noXML_Preserve) {
	        					_ang = _ang.substring(0, _ang.length - _endP_Tag.length)
				        		_ang += _sggsJson[i]["arrayOfPankti"][j]["pankti"] + _endP_Tag
				        		_noXML_Preserve = false;
								panktiObj["tab"] = true;
        					} else {
				        		_ang += _startP_Tag + _sggsJson[i]["arrayOfPankti"][j]["pankti"] + _endP_Tag
        					}
							panktiObj["baani_content"] = _sggsJson[i]["arrayOfPankti"][j]["pankti"];
							obj["baani"].push(panktiObj);	
        				}
        			}
	        		if(_sggsJson[i]["arrayOfPankti"][j]["pageBreak"]) {
						_ang += _endSection
	        			// _ang = _ang.replace("{{_id}}", _sggsJson[i]["arrayOfPankti"][j]["ang"])
						// gurbani.push(obj)
						obj["ang"] = _sggsJson[i]["arrayOfPankti"][j]["ang"];
						gurbani.push(JSON.parse(JSON.stringify(obj)));
						obj = {
							baani:[]
						};	
					}
	        		_newPankti = false;
        		}
        	}
        	if(i == _sggsJson.length) {
        		// No page break at last
    			_ang += _endSection
    			_ang = _ang.replace("{{_id}}", "1430")
    			// _arrayAngs.push(_ang)
    			_ang = '';
        	}
		}
        fs.writeFileSync('src/js/output.js', "window.data = " + JSON.stringify(gurbani, null, 4));
 	});

	require('load-grunt-tasks')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['htmlJsonConversion']);
};