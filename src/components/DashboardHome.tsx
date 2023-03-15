import AdminCard from "./AdminCard";

const DashboardHome = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-40">
      <h1 className="text-5xl font-bold text-slate-700">Dashboard</h1>
      <div className="m-auto flex w-fit flex-col gap-20">
        <AdminCard />
      </div>
    </div>
  );
};

export default DashboardHome;
