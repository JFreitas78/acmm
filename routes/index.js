var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'No Ato - ACMM' });
});

router.post('/enviaremail', function(req, res, callback){

	if (req.body.acmm_contact_name == "" || req.body.acmm_contact_email == "" || req.body.acmm_contact_message == "") {
		return res.json({"responseCode" : 1, "responseDesc" : "Preenchimento de campos obrigatório!"});
	}
	else {

		if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || 
		   req.body['g-recaptcha-response'] === null) {
			return res.json({"responseCode" : 2,"responseDesc" : "Recaptcha obrigatório!"});
	  	}
	  	else {

		  	var secretKey = "6LdnsDIUAAAAALLijKJUZK0_Dg4IX1rcPT9xemuz";
		  	var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
		  	
		  	request(verificationUrl,function(error,response,body) {
		    
		 	    body = JSON.parse(body);
		 	    // Success will be true or false depending upon captcha validation.
			    if(body.success !== undefined && !body.success) {
			      return res.json({"responseCode" : 3,"responseDesc" : "Falha na verificação do recaptcha!"});
			    }
			    else {
					
					// var userMail = 'desenvolvedorinfobase@gmail.com';
					// var passwordMail = 'Desenvolv123';
					// var errorMail = 'Erro ao enviar o email!';
					// var sucessMail = 'Seu email foi enviado com sucesso!';
					// var fromMail = req.body.acmm_contact_name + '<' + req.body.acmm_contact_email + '>';
					// var toMail = 'desenvolvedorinfobase@gmail.com, desouto@gmail.com';
					// var messageMail = req.body.acmm_contact_message;


					// var smtpTransport = nodemailer.createTransport({
					// 	host: 'smtp.gmail.com',
					// 	secureConnection: false,
					// 	port: 587,
					// 	auth: {
					// 		user: userMail,
					// 		pass: passwordMail
					// 	}

					// });

					// var mailOptions = {

					// 	from: fromMail,
					// 	to: toMail,
					// 	subject: '[Mensagem] [Contato Site]',
					// 	html: messageMail

					// }

					// smtpTransport.sendMail(mailOptions, function(error, response){
					// 	if (error) {
					// 		return res.json({"responseCode" : 4,"responseDesc" : "Houve um erro em sua requisição! Tente novamente!"});
					// 	}
					// 	else {
							return res.json({"responseCode" : 0,"responseDesc" : "Email enviado com sucesso."});
					// 	}
					// });

				}

			});

		}

	}
});

module.exports = router;
