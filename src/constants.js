const authSchema = require("./schemas/authSchema");
const adminSchema = require("./schemas/adminSchema");
const businessSchema = require("./schemas/businessSchema");

const constants = {
  ROLES: {
    USER: 1,
    EMPLOYEE: 2,
    BUSINESS_OWNER: 3,
    SUPER_USER: 4
  }
};
constants.ENDPOINTS_SCHEMAS = {
  register: { schema: authSchema.register },
  login: { schema: authSchema.login },
  "admin/createSector": {
    schema: adminSchema.createSector,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "admin/updateSector": {
    schema: adminSchema.updateSector,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "admin/deleteSector": {
    schema: adminSchema.deleteSector,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "admin/createBusinessType": {
    schema: adminSchema.createBusinessType,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "admin/deleteBusinessType": {
    schema: adminSchema.deleteBusinessType,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "admin/updateBusinessType": {
    schema: adminSchema.updateBusinessType,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "admin/businessTypeList": {
    schema: adminSchema.getBusinessTypesBySector,
    authorization: [constants.ROLES.BUSINESS_OWNER, constants.ROLES.SUPER_USER]
  },
  "admin/createService": {
    schema: adminSchema.createService,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "admin/serviceList": {
    schema: adminSchema.serviceList,
    authorization: [constants.ROLES.SUPER_USER, constants.ROLES.BUSINESS_OWNER]
  },
  "admin/updateService": {
    schema: adminSchema.updateService,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "admin/deleteService": {
    schema: adminSchema.deleteService,
    authorization: [constants.ROLES.SUPER_USER]
  },
  "business/createBusiness": {
    schema: businessSchema.createBusiness,
    authorization: [constants.ROLES.USER]
  },
  "business/updateBusiness": {
    schema: businessSchema.updateBusiness,
    authorization: [constants.ROLES.SUPER_USER, constants.ROLES.BUSINESS_OWNER]
  },
  "business/deleteBusiness": {
    schema: businessSchema.deleteBusiness,
    authorization: [constants.ROLES.BUSINESS_OWNER, constants.ROLES.SUPER_USER]
  },
  "business/addService": {
    schema: businessSchema.addService,
    authorization: [constants.ROLES.BUSINESS_OWNER, constants.ROLES.SUPER_USER]
  },
  "business/deleteService": {
    schema: businessSchema.deleteService,
    authorization: [constants.ROLES.BUSINESS_OWNER]
  },
  "business/hireEmployee": {
    schema: businessSchema.hireEmployee,
    authorization: [constants.ROLES.BUSINESS_OWNER]
  },
  "business/dischargeEmployee": {
    schema: businessSchema.dischargeEmployee,
    authorization: [constants.ROLES.BUSINESS_OWNER]
  },
  "business/employee/assignService": {
    schema: businessSchema.assignOrEditService,
    authorization: [constants.ROLES.BUSINESS_OWNER]
  },
  "business/employee/editService": {
    schema: businessSchema.assignOrEditService,
    authorization: [constants.ROLES.BUSINESS_OWNER]
  },
  "business/employee/removeService": {
    schema: businessSchema.removeService,
    authorization: [constants.ROLES.BUSINESS_OWNER]
  }
};

module.exports = constants;
