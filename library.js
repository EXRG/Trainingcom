var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "0123456789+/=";

function decode(emailAddress)
{
	var out = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	emailAddress = emailAddress.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	do {

		enc1 = keyStr.indexOf(emailAddress.charAt(i++));
		enc2 = keyStr.indexOf(emailAddress.charAt(i++));
		enc3 = keyStr.indexOf(emailAddress.charAt(i++));
		enc4 = keyStr.indexOf(emailAddress.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		out = out + String.fromCharCode(chr1);

		if (enc3 != 64) {
			out = out + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			out = out + String.fromCharCode(chr3);
		}

		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";

	} while (i < emailAddress.length);

	return out;
}

function createlink(anchorElement, emailAddress)
{
	anchorElement.href = 'mailto:' + decode(emailAddress);
}