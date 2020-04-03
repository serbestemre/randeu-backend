const sgMail = require("@sendgrid/mail");
const CONTSTANTS = require("../constants");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmailToUser = (email, name) => {
  sgMail.send({
    to: email,
    from: CONTSTANTS.SERVER_MAIL,
    subject: "RandeU Ailesine Hoşgeldin!",
    text: `Merhaba ${name} seni aramızda gördüğümüz için çok mutluyuz.`,
    html: `
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>RandeU Aktivasyon Linki</title>
        <style type="text/css">
        </style>    
      </head>
      <body style="margin:0; padding:0; background-color:#F2F2F2;">
        <center>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2">
              <tr>
                  <td align="center" valign="top">
                    <p>
                        Artık dilediğin zamanda dilediğin yerden randevu alabileceksin! Hemen aktivasyon mailindeki link tıkla ve ilk randevunu al!
                    </p> 
                  </td>
              </tr>
          </table>
        </center>
      </body>
      </html>`
  });
};

const sendWelcomeEmailToBusiness = (email, name, businessName) => {
  sgMail.send({
    to: email,
    from: CONTSTANTS.SERVER_MAIL,
    subject: "RandeU Ailesine Hoşgeldiniz!",
    text: `Merhaba ${name} seni aramızda gördüğümüz için çok mutluyuz.`,
    html: `
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>RandeU Aktivasyon Linki</title>
        <style type="text/css">
        </style>    
      </head>
      <body style="margin:0; padding:0; background-color:#F2F2F2;">
        <center>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2">
              <tr>
                  <td align="center" valign="top">
                    <p>
                        ${businessName} adlı iş yerinin tüm randevu süreçlerinde sana ve müşterilerine yardımcı olmak için adeta sabırsızlanıyoruz!
                        <br> Haydi hemen aktivasyon mailindeki linke tıkla ve müşterilerinle buluş!
                    </p> 
                  </td>
              </tr>
          </table>
        </center>
      </body>
      </html>`
  });
};

const sendActivationEmailToUser = (userId, email, activationLink) => {
  console.log("EMAİL activationLink: ", activationLink);

  sgMail.send({
    to: email,
    from: CONTSTANTS.SERVER_MAIL,
    subject: "RandeU Aktivasyon Kodu",
    text: `Aramıza katılmak için linke tıklayarak hesabını aktifleştirir misin?`,
    html: `
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>RandeU Aktivasyon Linki</title>
        <style type="text/css">
        </style>    
      </head>
      <body style="margin:0; padding:0; background-color:#F2F2F2;">
        <center>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2">
              <tr>
                  <td align="center" valign="top">
                    <p>Aramıza katılmak için yanlızca bir adım kaldı! Hemen
                    <a href="${activationLink}" target="_blank" 
                    style="color:#66cccc; text-decoration:underline;">buraya</a> 
                    tıklayarak hesabını aktifleştir!</p> 
                  </td>
              </tr>
          </table>
        </center>
      </body>
      </html>`
  });
};


module.exports = {
  sendWelcomeEmailToUser,
  sendWelcomeEmailToBusiness,
  sendActivationEmailToUser
};
