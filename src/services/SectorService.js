const SectorDataAccess = require("../dataAccess/Sector");
const AdminError = require("../errors/AdminError");

exports.createSectorService = async sectorName => {
  const sector = await SectorDataAccess.findSectorByNameDB({ sectorName });
  if (sector)
    throw AdminError.sectorAlreadyExists();

  return SectorDataAccess.createSectorDB(sectorName);
};

exports.getSectorsService = async () => {
  const sectors = await SectorDataAccess.findSectorsDB();
  if (!sectors)
    throw AdminError.SectorNotFound();

  return SectorDataAccess.findSectorsDB();
};

exports.updateSectorService = async (id, sectorName) => {
  const sector = await SectorDataAccess.findSectorByIdDB(id);

  if (!sector)
    throw AdminError.SectorNotFound();

  if (sector.sectorName === sectorName)
    throw AdminError.sectorAlreadyExists();
};
