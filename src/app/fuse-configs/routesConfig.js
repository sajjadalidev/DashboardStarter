import { Redirect } from "react-router-dom";
import FuseUtils from "@fuse/utils";
import ExampleConfig from "app/main/example/ExampleConfig";
import FuseLoading from "@fuse/core/FuseLoading";
import Error404Page from "app/main/404/Error404Page";

import RegisterConfig from "app/main/register/RegisterConfig";
import LoginConfig from "./../main/login/LoginConfig";
const routeConfigs = [ExampleConfig, RegisterConfig, LoginConfig];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),

  {
    exact: true,
    path: "/",
    component: () => <Redirect to="/admin/home" />,
  },
  {
    path: "/loading",
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: "/404",
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
