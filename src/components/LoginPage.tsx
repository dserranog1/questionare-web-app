import { Card } from "antd";
import { useFormik } from "formik";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      //handle submit
    },
  });
  return (
    <div className="flex h-full flex-row items-center justify-center text-3xl">
      {" "}
      <div className="flex flex-col gap-8">
        <Card
          title="Por favor ingresa tus credenciales"
          className="w-80"
          bordered={false}
          actions={[
            <button
              key="submitButton"
              form="loginForm"
              onClick={() => console.log("loging by hand")}
            >
              Entrar
            </button>,
          ]}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3"
            id="loginForm"
          >
            <div className="flex flex-row justify-between">
              <label htmlFor="email">Email</label>
              <input
                onChange={formik.handleChange}
                value={formik.values.email} //TODO validation
                id="email"
                name="email"
                type="email"
                className="rounded-md border-2 border-blue-200 focus:border-blue-600 focus:bg-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-row justify-between">
              <label htmlFor="password" className="">
                Password
              </label>
              <input //TODO validation
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
                name="password"
                type="password"
                className="rounded-md border-2 border-blue-200 focus:border-blue-600 focus:bg-blue-300 focus:outline-none"
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
