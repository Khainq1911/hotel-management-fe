"use client";

import { columns } from "@/utils/constants";
import { Button, message, Table } from "antd";
import { sendRequest } from "@/services/api";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RoomDetailModal from "@/components/roomModal";

export default function RoomListUi() {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<DataType>();

  const ModifyColumns = [
    ...columns,
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (i: number, record: DataType) => (
        <Button
          type="primary"
          ghost
          onClick={() => {
            setSelectedRoom(record);
            setOpenModal(true);
          }}
        >
          Update
        </Button>
      ),
    },
  ];

  const getListRoom = async () => {
    try {
      const res = await sendRequest(
        `${process.env.NEXT_PUBLIC_SERVER}/rooms`,
        "GET",
        null,
        accessToken
      );

      setDataSource(
        res.response.data.map((room: Room, i: number) => ({
          key: i,
          type_id: room.TypeRoom.type_id,
          room_id: room.room_id,
          room: room.room_name,
          floor: room.floor,
          type: room.TypeRoom.type_name,
          description: room.TypeRoom.description,
          price_per_day: room.price_per_day,
          price_per_hour: room.price_per_hour,
          discount: room.discount,
        }))
      );
    } catch (error) {
      message.error("chan qua");
    }
  };

  useEffect(() => {
    if (accessToken) {
      getListRoom();
    }
  }, [accessToken]);

  return (
    <div className="pt-[20px] px-[50px]">
      <Table columns={ModifyColumns} dataSource={dataSource} />
      <RoomDetailModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedRoom={selectedRoom}
        getListRoom={getListRoom}
      />
    </div>
  );
}
