import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <>Service Category</>,
      icon: <TableOutlined />,
      key: `/${role}/manage-category`,

      children: [
        {
          label: (
            <Link href={`/${role}/manage-category`}>
              Manage Service Category
            </Link>
          ),
          key: `/${role}/category`,
        },
      ],
    },
    {
      label: <>Vehicles</>,
      icon: <TableOutlined />,
      key: `/${role}/manage-vehicle`,

      children: [
        {
          label: (
            <Link href={`/${role}/manage-vehicle-type`}>
              Manage Vehicle Types
            </Link>
          ),
          key: `/${role}/manage-vehicle-type`,
        },
        {
          label: <Link href={`/${role}/manage-vehicle`}>Manage Vehicle</Link>,
          key: `/${role}/manage-vehicle`,
        },
      ],
    },
    {
      label: <>Service</>,
      icon: <TableOutlined />,
      key: `/${role}/manage-service`,
      children: [
        {
          label: <Link href={`/${role}/manage-service`}>Manage Service</Link>,
          key: `/${role}/manage-service`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,

    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
        {
          label: <Link href={`/${role}/building`}>Building</Link>,
          key: `/${role}/building`,
        },
        {
          label: <Link href={`/${role}/room`}>Rooms</Link>,
          key: `/${role}/room`,
        },
        {
          label: <Link href={`/${role}/course`}>Course</Link>,
          key: `/${role}/course`,
        },
        {
          label: (
            <Link href={`/${role}/semester-registration`}>
              Semester registration
            </Link>
          ),
          key: `/${role}/semester-registration`,
        },
        {
          label: <Link href={`/${role}/offered-course`}>Offered courses</Link>,
          key: `/${role}/offered-course`,
        },
        {
          label: (
            <Link href={`/${role}/offered-course-section`}>
              Course sections
            </Link>
          ),
          key: `/${role}/offered-course-section`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
      ],
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
