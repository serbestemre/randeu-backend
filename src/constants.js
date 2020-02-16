const authSchema = require('./schemas/authSchema');

module.exports = {
  ENDPOINTS: {
    register: authSchema.register,
    'admin/createSector': ''
  },
  ROLES: {
    USER: 1,
    EMPLOYEE: 2,
    BUSINESS_OWNER: 3,
    SUPER_USER: 4
  },
  ENDPOINTS_ROLES: {
    register: [1, 2, 3, 4]
  }
};
