const authSchema = require("./schemas/authSchema");
const adminSchema = require("./schemas/adminSchema");
const businessSchema = require("./schemas/businessSchema");

module.exports = {
  ENDPOINTS: {
    register: authSchema.register,
    login: authSchema.login,
    "admin/createBusinessType": adminSchema.createBusinessType,
    "admin/updateBusinessType": adminSchema.updateBusinessType,
    "admin/deleteBusinessType": adminSchema.deleteBusinessType,
    "admin/businessTypeList": adminSchema.getBusinessTypesBySector,
    "admin/createSector": adminSchema.createSector,
    "admin/updateSector": adminSchema.updateSector,
    "admin/deleteSector": adminSchema.deleteSector,
    "admin/createService": adminSchema.createService,
    "business/createBusiness": businessSchema.createBusiness
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
