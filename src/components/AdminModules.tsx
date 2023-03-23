import { QuestionMarkCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import ModuleCard from "./ModuleCard";

const AdminModules = () => {
  return (
    <div className="flex flex-row gap-8">
      <ModuleCard
        title="Estudiantes"
        description="Crear, editar o eliminar estudiantes del sistema"
        route="students"
        Icon={UserIcon}
        buttonText="Ir a estudiantes"
      />
      <ModuleCard
        title="Preguntas"
        description="Crear, editar o eliminar preguntas del sistema"
        route="questions"
        Icon={QuestionMarkCircleIcon}
        buttonText="Ir a preguntas"
      />
    </div>
  );
};

export default AdminModules;
