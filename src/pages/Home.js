import { useContext } from "react";
import Banner from "../components/Banner";
import AdminBanner from "../components/AdminBanner";
import UserContext from '../UserContext';

export default function Home() {
  const { user } = useContext(UserContext);

  const data = {
    title: "Arete Supply",
    content: "We have what you need anytime, everywhere.",
    destination: "/products",
    label: "Take a look"
  };

  const adminData = {
    adminTitle: "Arete Supply",
    adminContent: "Welcome back, let's get back to work.",
    adminDestination: "/admin",
    adminLabel: "Go to Dashboard"
  };

  return (
    <>
      {user.isAdmin ? (
        <AdminBanner adminData={adminData} />
      ) : (
        <Banner data={data} />
      )}
    </>
  );
}

