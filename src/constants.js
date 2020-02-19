const authSchema = require('./schemas/authSchema');
const adminSchema = require('./schemas/adminSchema');

module.exports = {
  ENDPOINTS: {
    register: authSchema.register,
    login: authSchema.login,
    'admin/deleteBusinessType': adminSchema.deleteBusinessType,
    'admin/updateBusinessType': adminSchema.updateBusinessType,
    'admin/businessTypeList': adminSchema.getBusinessTypesBySector,
    'admin/createSector': adminSchema.createSector,
    'admin/createService': adminSchema.createService
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
