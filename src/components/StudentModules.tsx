import ModuleCard from "./ModuleCard";
import { ListBulletIcon } from "@heroicons/react/24/solid";

const StudentModules = () => {
  return (
    <ModuleCard
      title="Cuestionario"
      description="Realizar el cuestionario disponible"
      route="questionare"
      Icon={ListBulletIcon}
      buttonText="Ir al cuestionario"
    />
  );
};

export default StudentModules;
