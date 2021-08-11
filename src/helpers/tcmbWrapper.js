const { instance } = require("./axiosWrapper");
const moment = require("moment");
const parser = require('xml2json');

function getCurrentDate(date) {
	const _date = moment(date);

	const q1 = _date.format("YYYYMM")
	const q2 = _date.format("DDMMYYYY");

	return { q1, q2 };
}

function beautifyObject(obj){
	return {
		currencyCode:obj.CurrencyCode,
		unit:obj.Unit,
		name:obj.Isim,
		forex:{
			buying: parseFloat(obj.ForexBuying),
			selling: parseFloat(obj.ForexSelling)
		},
		banknote:{
			buying: typeof obj.BanknoteBuying === "string" ? parseFloat(obj.BanknoteBuying) : 0,
			selling: typeof obj.BanknoteSelling === "string" ? parseFloat(obj.BanknoteSelling) : 0
		}

	}
}

function getCurrenciesWithDate(date) {
	return new Promise( async (resolve,reject) => {
		try{
			const { q1, q2 } = getCurrentDate(date);
			const url = q1+"/"+q2+".xml"	
			const resp = await instance.get(url);
			const jsonData = JSON.parse(parser.toJson(resp.data));
			const _data = jsonData["Tarih_Date"]["Currency"].map((c) => beautifyObject(c));
			resolve(_data);
		}catch(e){
			reject(e);
		}
	})
}

function getCurrenciesWithSelectedDate(_date){

	return new Promise( async (resolve,reject) => {
		try{
			
			const date = moment(_date,"DD-MM-YYYY");
			const data = await getCurrenciesWithDate(date);
			resolve({
				currencies:data,
				date,
			});

		}catch(e){
			reject(e);
		}
	})
}

function getCurrenciesWithMonth(date){
	return new Promise( async (resolve,reject) => {
		const daysInMonth = moment(date,'DD-MM-YYYY').daysInMonth();
		const currencies = [];
		for( let i = 1; i <= daysInMonth; i++ ){
			const currentDate = moment.utc(date,'DD-MM-YYYY')
			currentDate.set('date',i);
			try{
				
				const _currencies = await getCurrenciesWithSelectedDate(currentDate);
				currencies.push(_currencies);
			}catch(e){
				// console.log("----");
			}
		}
		resolve(currencies);
	})
}

module.exports = { getCurrenciesWithDate, getCurrenciesWithSelectedDate, getCurrenciesWithMonth }