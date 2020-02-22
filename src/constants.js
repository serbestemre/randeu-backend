const authSchema = require("./schemas/authSchema");
const adminSchema = require("./schemas/adminSchema");
const businessSchema = require("./schemas/businessSchema");

module.exports = {
  ENDPOINTS: {
    register: authSchema.register,
    login: authSchema.login,
    "admin/createSector": adminSchema.createSector,
    "admin/updateSector": adminSchema.updateSector,
    "admin/deleteSector": adminSchema.deleteSector,
    "admin/createBusinessType": adminSchema.createBusinessType,
    "admin/updateBusinessType": adminSchema.updateBusinessType,
    "admin/deleteBusinessType": adminSchema.deleteBusinessType,
    "admin/businessTypeList": adminSchema.getBusinessTypesBySector,
    "admin/createService": adminSchema.createService,
    "admin/updateService": adminSchema.updateService,
    "admin/deleteService": adminSchema.deleteService,
    "business/createBusiness": businessSchema.createBusiness,
    "business/updateBusiness": businessSchema.updateBusiness,
    "business/deleteBusiness": businessSchema.deleteBusiness,
    "business/addService": businessSchema.addService,
    "business/deleteService": businessSchema.deleteService,
    "business/hireEmployee": businessSchema.hireEmployee,
    "business/dischargeEmployee": businessSchema.dischargeEmployee,
    "business/employee/assignService": businessSchema.assignService,
    "business/employee/editService": businessSchema.editService,
    "business/employee/removeService": businessSchema.removeService
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
