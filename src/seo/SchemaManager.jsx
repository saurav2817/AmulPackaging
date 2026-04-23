import { useLocation } from "react-router-dom";
import SchemaInjector from "./SchemaInjector";
import { schemas } from "./schemas";

const routeSchemaMap = {
  "/services/standup-zipper-pouch": schemas.StandupZipperPouch,
  "/services/flat-bottom-pouch": schemas.FlatBottomPouch,
  "/services/spout-pouch": schemas.SpoutPouch,
  "/services/vacuum-pouch": schemas.VacuumPouch,
  "/services/laminated-roll-stock": schemas.LaminatedRollStock,
  "/services/poly-bags": schemas.PolyBags,
};

const SchemaManager = () => {
  const { pathname } = useLocation();

  const schema = routeSchemaMap[pathname];

  return <SchemaInjector data={schema} />;
};

export default SchemaManager;