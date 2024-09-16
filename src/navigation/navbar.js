// NavBarLinks.js
import React from "react";

function userProfileNav(userContext) {
  let nav = [
    {
      path: [`/user/profile/${userContext._id}`, `/user/${userContext._id}`],
      title: "Profile",
      icon: "person",
      active: true,
    },
  ];

  if (userContext.role === "admin") {
    nav.push(
      {
        path: [`/admin`, `/admin/dashboard`],
        title: "Admin Dashboard",
        icon: "admin_panel_settings",
      },
      {
        path: [`/admin/logins`],
        title: "User Logins",
        icon: "passkey",
      },
      {
        path: [`/admin/policies`],
        title: "Policies",
        icon: "local_police",
      },
      {
        path: [`/admin/quizes`],
        title: "Quizes",
        icon: "quiz",
      },
    );
  }

  return nav;
}

function adminDashboardNav(userContext) {
  return [
    {
      path: [`/user/profile/${userContext._id}`, `/user/${userContext._id}`],
      title: "Profile",
      icon: "person",
      active: true,
    },
    {
      path: [`/admin/users`, `/admin`],
      title: "Profile",
      icon: "groups",
    },
    {
      path: ["/equipmentdashboard"],
      title: "Equipment Dashboard",
      icon: "dashboard",
    },
  ];
}

export { userProfileNav, adminDashboardNav };
