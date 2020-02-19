const express = require('express');
const validator = require('../helpers/validate');

const router = express.Router({ mergeParams: true });

const adminController = require('../controllers/adminController');

router.post('/createSector', validator, adminController.createSector);

// Get all sector list
router.get('/sectorList', adminController.getSectors);

// Update a sector according to the given ID in parameter
router.put('/updateSector', validator, adminController.updateSector);

router.delete('/deleteSector', validator, adminController.deleteSector);

router.post(
  '/createBusinessType',
  validator,
  adminController.createBusinessType
);

router.put(
  '/updateBusinessType',
  validator,
  adminController.updateBusinessType
);

router.delete(
  '/deleteBusinessType',
  validator,
  adminController.deleteBusinessType
);

router.get(
  '/businessTypeList',
  validator,
  adminController.getBusinessTypesBySector
);

router.post('/createService', validator, adminController.createService);

module.exports = router;
