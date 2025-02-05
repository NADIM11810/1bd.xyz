import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoutes";
import Pdf from "../Pages/Pdf/Pdf";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import ServerCopy from "../Pages/ServerCopy/ServerCopy";
import ServerCopyPrint from "../Pages/ServerCopyPrint/ServerCopyPrint";
import Recharge from "../Pages/Recharge/Recharge";
import NidOrder from "../Pages/NidOrder/NidOrder";
import AllOrder from "../Pages/AllOrder/AllOrder";
import MyOrder from "../Pages/MyOrder/MyOrder";
import UpdatePassword from "../Pages/UpdatePassword/UpdatePassword";
import MyProfile from "../Pages/MyProfile/MyProfile";
import NoticeForm from "../Pages/NoticeForm/NoticeForm";
import AdminRoutes from "./AdminRoutes";
import AllUser from "../Pages/AllUser/AllUser";
import BalanceForm from "../Pages/BalanceForm/BalanceForm";
import ServerCopyV2 from "../Pages/ServerCopyV2/ServerCopyV2";
import Roshid from "../Pages/Roshid/Roshid";
import BirthRegistrationForm from "../Pages/BirthRegistrationForm/BirthRegistrationForm";
import Tin from "../Pages/Tin/Tin";
import Bio from "../Pages/Bio/Bio";
import ServerCopyPrintBackup from "../Pages/ServerCopyBackup/ServerCopyPrintBackup";
import ServerCopyV2Backup from "../Pages/ServerCopyBackup/ServerCopyV2Backup";
import ServerCopyBackup from "../Pages/ServerCopyBackup/ServerCopyBackup";
import MyRoshid from "../Pages/MyRoshid/MyRoshid";
import ToggleOrder from "../Pages/ToggleOrder/ToggleOrder";
import BirthCertificate from "../Pages/BirthCertificate/BirthCertificate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/pdf",
        element: <Pdf />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/server-copy",
        element: <ServerCopy />,
      },
      {
        path: "/server-copy-backup",
        element: <ServerCopyBackup />,
      },
      {
        path: "/server-copy-print/:nid/:dob",
        element: <ServerCopyPrint />,
      },
      {
        path: "/server-copy-print-backup/:nid/:dob",
        element: <ServerCopyPrintBackup />,
      },
      {
        path: "/recharge",
        element: <Recharge />,
      },
      {
        path: "/nid-order",
        element: <NidOrder />,
      },
      {
        path: "/all-order",
        element: (
          <AdminRoutes>
            <AllOrder />
          </AdminRoutes>
        ),
      },
      {
        path: "/my-order",
        element: <MyOrder />,
      },
      {
        path: "/my-roshid",
        element: <MyRoshid />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
      {
        path: "/notice",
        element: (
          <AdminRoutes>
            <NoticeForm />
          </AdminRoutes>
        ),
      },
      {
        path: "/all-user",
        element: (
          <AdminRoutes>
            <AllUser />
          </AdminRoutes>
        ),
      },
      {
        path: "/update-balance",
        element: (
          <AdminRoutes>
            <BalanceForm />{" "}
          </AdminRoutes>
        ),
      },
      {
        path: "/toggle-order",
        element: (
          <AdminRoutes>
            <ToggleOrder />
          </AdminRoutes>
        ),
      },
      {
        path: "/server-copy-v2/:nid/:dob",
        element: <ServerCopyV2 />,
      },
      {
        path: "/server-copy-v2-backup/:nid/:dob",
        element: <ServerCopyV2Backup />,
      },
      {
        path: "/roshid",
        element: <Roshid />,
      },
      {
        path: "/roshid/edit/:id",
        element: <Roshid />,
      },
      {
        path: "/birthday-registration",
        element: <BirthRegistrationForm />,
      },
      {
        path: "/tin",
        element: <Tin />,
      },
      {
        path: "/bio",
        element: <Bio />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/birth-certificate/:id",
    element: <BirthCertificate />,
  },
  // {
  //   path: "/dakhila-print/:id",
  //   element: <DakhilaPrint />,
  // },
]);
