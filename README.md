# T.C. Merkez Bankası Döviz Kurları Rest-API

## Setup

```
git clone git@github.com:ayberkanilatsiz/tcmb-rest-api.git
npm install
npm start
```

- /api/months
		- Verilen ayın kurları
- /api/yesterday
		- Dünün kurları
- /api
		- Verilen tarihin kurları
## Response
Herhangi bir kur için örnek:
```
{
	"currencyCode": "USD",
	"unit": "1",
	"name": "ABD DOLARI",
	"forex": {
		"buying": 7.5096,
		"selling": 7.5231
	},
	"banknote": {
		"buying": 7.5043,
		"selling": 7.5344
	}
}
```
## Request Örnekleri
```
http://127.0.0.1:5000/month?date=10-03-2021 // (Mart ayındaki günlük bütün kurlar)

http://127.0.0.1:5000/api?date=10-03-2021 // (Verilen tarihteki kurlar)

http://127.0.0.1:5000/api/yesterday // (Dünün kurları)
```