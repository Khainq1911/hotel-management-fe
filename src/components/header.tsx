"use client";

import { signOut, useSession } from "next-auth/react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import "@/css/globals.css";

const items: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "0",
  },
  {
    label: "2nd menu item",
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <span onClick={() => signOut()}>Logout</span>,
    key: "3",
    danger: true,
  },
];

let header: { icon: JSX.Element; route: string; checked: boolean }[] = [
  {
    icon: <HomeOutlined />,
    route: "/home",
    checked: false,
  },
  {
    icon: <UserOutlined />,
    route: "/",
    checked: false,
  },
  {
    icon: <UserOutlined />,
    route: "#",
    checked: false,
  },
  {
    icon: <UserOutlined />,
    route: "#",
    checked: false,
  },
];

export default function Header() {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const route = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownVisibleChange = (visible: boolean) => {
    setIsDropdownOpen(visible);
  };

  useEffect(() => {
    header = header.map((item) => ({
      ...item,
      checked: item.route === pathname,
    }));
  }, [pathname]);

  return (
    <nav className="flex justify-between items-center h-[60px] w-full shadow px-5 fixed top-0 left-0 z-30 bg-white">
      <ul className="flex">
        {header.map((item, index) => (
          <div key={index}>
            <li
              onClick={() => route.push(item.route)}
              className={`h-[57px] w-[120px] flex justify-center items-center ${
                item.checked
                  ? "text-[#0866FF]"
                  : "text-[#606266] hover:bg-[#F2F2F2] rounded-lg"
              } text-[24px]`}
            >
              {item.icon}
            </li>
            {item.checked ? (
              <div className="w-[120px] h-[3px] bg-[#0866FF]"></div>
            ) : (
              ""
            )}
          </div>
        ))}
      </ul>
      <Dropdown
        className="cursor-pointer"
        menu={{ items }}
        trigger={["click"]}
        onOpenChange={handleDropdownVisibleChange}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {name}
            <DownOutlined
              className={`transform transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </Space>
        </a>
      </Dropdown>
    </nav>
  );
}
