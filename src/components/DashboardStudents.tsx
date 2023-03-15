import { useEffect } from "react";
import { client } from "../untypeable/client";

const DashboardStudents = () => {
  const fetchStudents = async () => {
    try {
      const response = await client("/api/v1/user/getUsers", "GET");
      if (response.state) {
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      // TODO handle network error
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div>
      <p>Students</p>
    </div>
  );
};

export default DashboardStudents;
