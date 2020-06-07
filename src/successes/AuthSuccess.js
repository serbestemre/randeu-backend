const AuthSuccess = {};

// TODO Updated status Code should be 200

AuthSuccess.UserRegistered = () => ({
  statusCode: 200,
  message: `Kullanıcı başarıyla kayıt oldu`
});

AuthSuccess.UserLoggedin = () => ({
  statusCode: 200,
  message: `Kullanıcı başarıyla giriş yaptı`
});

AuthSuccess.ActivationMailSent = email => ({
  statusCode: 200,
  message: `Aktivasyon linki ${email} adresine tekrar gönderildi`
});

AuthSuccess.UserProfileActivated = () => ({
  statusCode: 200,
  message: `Kullanıcı profili başarıyla aktif edildi`
});


module.exports = AuthSuccess;
