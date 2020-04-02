const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmailToUser = (email, name) => {
  sgMail.send({
    to: email,
    from: "randeu.official@gmail.com",
    subject: "RandeU Ailesine Hoşgeldin!",
    text: `Merhaba ${name} seni aramızda gördüğümüz için mutluyuz.
    Nereden ve ne zaman randevu almak istersen iste sana yardımcı olmak için adeta sabırsızlanıyoruz!`
  });
};

const sendWelcomeEmailToBusiness = (email, name, businessName) => {
  sgMail.send({
    to: email,
    from: "randeu.official@gmail.com",
    subject: "RandeU Ailesine Hoşgeldiniz!",
    text: `Merhaba ${name} seni aramızda gördüğümüz için mutluyuz. ${businessName} adlı iş yerinin tüm randevu süreçlerinde sana ve müşterilerine yardımcı  olmak için adeta sabırsızlanıyoruz!`
  });
};


module.exports = {
  sendWelcomeEmailToUser,
  sendWelcomeEmailToBusiness
};
