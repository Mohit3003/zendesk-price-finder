$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '120px' });
 
  var tv_model,requestData;
 
  client.get('ticket.customField:custom_field_114099896612').then(
	function(data) {
		tv_model = data['ticket.customField:custom_field_114099896612'];
		console.log(tv_model);//B01GA3Z1M2
        showInfo(tv_model,client);
	}
  );
});

function showInfo(tv_model,client) {
	
	var tv_price;	
	var access_key_id = "AWSAccessKeyId=YOURAWSACCESSKEY";
	var secret_key = "YOURSECRETKEY";;
	var associate_Id= "&AssociateTag=YOURASSOCIATETAG";
	var idType= "&IdType=ASIN";
	var itemId= "&ItemId="+tv_model;
	var operation = "&Operation=ItemLookup";
	var responseGroup= "&ResponseGroup=Offers";//"&ResponseGroup=Images%2CItemAttributes%2COffers%2CReviews";//"&ResponseGroup=Offers";
	var service = "&Service=AWSECommerceService";
	var UTCstring = new Date().toISOString();
	var encodedUTCstring1 = UTCstring.replace(":", "%3A");	
	var encodedUTCstring2 = encodedUTCstring1.replace(":", "%3A");	
	var timestamp = "&Timestamp=" + encodedUTCstring2;//"&Timestamp=2017-11-24T19%3A53%3A13.000Z";//"&Timestamp=" + encodedUTCstring2;
	console.log("timestamp= " + timestamp);
	var url = "http://webservices.amazon.co.uk/onca/xml?";
	var version = "&Version=2017-08-01";//&Version=2017-08-01

	var sign_string = "GET\nwebservices.amazon.co.uk\n/onca/xml\n"+access_key_id+associate_Id+itemId+operation+responseGroup+service+timestamp+version;

	console.log(sign_string);
	
	var signature2 = CryptoJS.HmacSHA256(sign_string, secret_key);
	console.log("signature2 = " + signature2);
	var abcd= signature2.toString(CryptoJS.enc.Base64);
	console.log("abcd = " + abcd);
	var one  = abcd.replace("+","%2B");
	var two = one.replace("=", "%3D");//"Z7gskyukGO9LnqEBV%2FM4nHCx4JLu7crOmNXTeRy%2BLm8%3D";//one.replace("=", "%3D");
	var signature = "&Signature=" + two;//"&Signature=vRDsTIheAGP1ZICPA%2FUy7l1%2BCniD0M8XHtdPmkwpS%2FE%3D";//"&Signature=" + two;
	console.log("signature = " + signature);
	var endpoint = url+access_key_id+associate_Id+idType+itemId+operation+responseGroup+service+timestamp+version+signature;
	console.log("endpoint= " + endpoint);
	
	var settings = {
		url: endpoint,
		type: 'GET',
		contentType: 'application/xml'
	};
	
	client.request(settings).then(
		function(response) {
			console.log(999);
			/*parser = new DOMParser();
			xmlDoc = parser.parseFromString(response,"text/xml");	
			console.log(xmlDoc);
			var mbbs = xmlDoc.getElementsByTagName("Offers").offer.offerListing.Price.Amount;
			console.log(mbbs);	*/
		}
	);
}
 
function sendData(data, tv_model){
	 var requester_data = {
		'tv_model' : tv_model,
		'tv_price ': data	    
  };
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
} 
