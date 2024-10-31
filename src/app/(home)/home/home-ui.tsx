"use client";

import { Button, Card, message } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { isEmployee } from "@/hooks/useAuth";

interface Room {
  room_id: string;
  room_name: string;
  status: string;
  floor: number;
  type_id: string;
  check_in_time: string;
  check_out_time: string;
  cleaning_status: string;
  current_guest: string;
  note: string;
  price_override: number;
}

const roomStatus = ["Available", "Booked"];

export default function HomePage() {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const [RoomsList, setRoomsList] = useState([]);
  const [floor, setFloor] = useState<{ label: string; children: Room[] }[]>([
    { label: "Floor 1", children: [] },
    { label: "Floor 2", children: [] },
  ]);
  const [availableRoomNumber, setAvailableRoomNumber] = useState();
  useEffect(() => {
    async function getRoomsList() {
      const url = "http://localhost:1912/rooms";
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            await signOut();
          }
          throw new Error(`Response status: ${response.status}`);
        }

        const res = await response.json();

        const categorizedFloors = [
          {
            label: "Floor 1",
            children: res.data.filter((room: Room) => room.floor === 1),
          },
          {
            label: "Floor 2",
            children: res.data.filter((room: Room) => room.floor === 2),
          },
        ];
        setFloor(categorizedFloors);

        const availableRoom = res.data.filter(
          (room: Room) => room.status === "available"
        ).length;
        setAvailableRoomNumber(availableRoom);

        setRoomsList(res.data);
      } catch (error) {
        console.log(error);
        message.error("Failed to get rooms list");
      }
    }
    if (accessToken) {
      getRoomsList();
    }
  }, [accessToken]);
  isEmployee();
  return (
    <div className="bg-[#F0F2F5] h-screen px-[20px]">
      <div className="flex w-full justify-between items-center h-[80px]">
        <div className="flex justify-between  items-center">
          {roomStatus.map((status, index) => (
            <div
              className="flex justify-between w-[130px] items-center bg-white p-2 rounded-2xl shadow mr-5"
              key={index}
            >
              <div
                className={`w-4 h-4 ${
                  status === "Booked" ? "bg-[#D9D9D9]" : "bg-[#4DE804]"
                } rounded-full`}
              ></div>
              {status}{" "}
              {availableRoomNumber
                ? status === "Available"
                  ? `(${availableRoomNumber})`
                  : `(${RoomsList.length - availableRoomNumber})`
                : null}
            </div>
          ))}
        </div>

        <Button type="primary" shape="round">
          <PlusOutlined /> Add Room
        </Button>
      </div>

      <div>
        {floor.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex items-end px-[50px] mt-4">
                <h1 className="text-[30px] font-semibold w-[120px]">
                  {item.label}
                </h1>
                <div className="h-[1px] w-full bg-black"></div>
              </div>
              <div className="flex flex-wrap mt-4 px-[50px]">
                {item.children.map((room, index) => {
                  return (
                    <Card
                      key={index}
                      title={room.room_name}
                      className={`w-[15%] mr-4 cursor-pointer ${
                        room.status === "booked"
                          ? "bg-[#D9D9D9]"
                          : "bg-[#4DE804]"
                      }`}
                    >
                      <p>
                        <label className="mr-2 font-medium">Clean:</label>
                        <span className="mr-1">{room.cleaning_status}</span>
                        {room.cleaning_status === "clean" ? (
                          <CheckCircleOutlined />
                        ) : (
                          <CloseCircleOutlined />
                        )}
                      </p>
                      <p className="mr-2">
                        <label className="mr-2 font-medium">Room: </label>
                        <span>{room.status}</span>
                      </p>
                      <p>
                        <label className="mr-2 font-medium">Price:</label>
                        <span className="mr-1">{room.price_override}</span>
                        <MoneyCollectOutlined />
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
