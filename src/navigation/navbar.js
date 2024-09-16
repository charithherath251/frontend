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
    {
      path: [`/workout`],
      title: "Manage Workouts",
      icon: "exercise",
    },
  ];

  if (userContext.role === "admin") {
    nav.push({
      path: [`/admin/users`, `/admin`],
      title: "Admin Dashboard",
      icon: "admin_panel_settings",
    });
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
