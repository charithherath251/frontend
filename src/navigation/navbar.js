// NavBarLinks.js
import React from "react";

function userProfileNav(userContext) {
  let nav = [];

  if (userContext.role === "user") {
    // nav.push(
    //   {
    //     path: [`/`],
    //     title: "Quiz",
    //     icon: "",
    //     // active: true,
    //   });

    nav.push(
      {
        path: [`/profile`],
        title: "Profile",
        icon: "passkey",
        active: true,
      });

      nav.push(
        {
          path: [`/quiz`],
          title: "Quiz",
          icon: "quiz",
          active: true,
        });

      nav.push(
        {
          path: [`/policies`],
          title: "Policies",
          icon: "quiz",
          active: true,
        });
  }

  if (userContext.role === "admin") {
    nav.push(
      // {
      //   path: [`/admin`, `/admin/dashboard`],
      //   title: "Admin Dashboard",
      //   icon: "admin_panel_settings",
      // },
      {
        path: [`/admin/logins`],
        title: "Employees",
        icon: "passkey",
      },
      {
        path: [`/admin/policies`],
        title: "Policies",
        icon: "local_police",
      },
      {
        path: [`/admin/mcqs`],
        title: "MCQs",
        icon: "quiz",
      },
    );
  }

  return nav;
}

export { userProfileNav };
