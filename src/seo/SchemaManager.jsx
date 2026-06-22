import { useLocation } from "react-router-dom";
import SchemaInjector from "./SchemaInjector";
import { schemas } from "./schemas";

const routeSchemaMap = {
  "/services/stand-up-pouch-manufacturer-in-bhiwandi": schemas.StandupZipperPouch,
  "/services/flat-bottom-pouch-supplier-in-bhiwandi": schemas.FlatBottomPouch,
  "/services/spout-pouch-in-mumbai": schemas.SpoutPouch,
  "/services/vacuum-pouch-In-bhiwandi": schemas.VacuumPouch,
  "/services/laminated-roll-stock-in-mumbai": schemas.LaminatedRollStock,
  "/services/poly-bags-manufacturer-in-mumbai": schemas.PolyBags,
  "/services/pillow-pouch": schemas.PillowPouch,
};

const SchemaManager = () => {
  const { pathname } = useLocation();

  const schema = routeSchemaMap[pathname];

  return <SchemaInjector data={schema} />;
};

export default SchemaManager;