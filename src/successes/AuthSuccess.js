const AuthSuccess = {};

// TODO Updated status Code should be 200

AuthSuccess.UserRegistered = () => ({
  statusCode: 202,
  message: `Kullanıcı başarıyla kayıt oldu`
});

AuthSuccess.ActivationMailSent = email => ({
  statusCode: 200,
  message: `Aktivasyon linki ${email} adresine tekrar gönderildi`
});

AuthSuccess.UserProfileActivated = email => ({
  statusCode: 200,
  message: `Kullanıcı profili başarıyla aktif edildi`
});


module.exports = AuthSuccess;
