"use client";
import { sendRequest } from "@/services/api";
import { Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ExclamationCircleFilled } from "@ant-design/icons";
interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  selectedRoom: DataType | undefined;
  getListRoom: () => Promise<void>;
}

interface options {
  label: string;
  value: string;
}

interface data {
  room_name: string;
  type_id: string | { value: string };
  discount: number;
  price_per_day: number;
  price_per_hour: number;
}

export default function RoomDetailModal({
  openModal,
  setOpenModal,
  selectedRoom,
  getListRoom,
}: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const [form] = Form.useForm();
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "Confirm Room Update",
      icon: <ExclamationCircleFilled />,
      content:
        "Are you sure you want to update the room details? Changes will be saved.",
      onOk() {
        handleOk();
      },
    });
  };

  const listTypeRoom = async () => {
    try {
      const res = await sendRequest(
        `${process.env.NEXT_PUBLIC_SERVER}/typeRoom`,
        "GET",
        null,
        accessToken
      );
      setOptions(
        res.response.data.map((type: any) => {
          return { label: type.type_name, value: type.type_id };
        })
      );
    } catch {
      message.error("Failed to get list type of room. Please try again.");
    }
  };

  const onFinish = async (value: data) => {
    if (typeof value.type_id === "object" && value.type_id?.value) {
      value.type_id = value.type_id.value;
    }
    try {
      await sendRequest(
        `${process.env.NEXT_PUBLIC_SERVER}/admin/rooms/${selectedRoom?.room_id}`,
        "PUT",
        value,
        accessToken
      );
      getListRoom();
      message.success("Room details updated successfully.");
    } catch {
      message.error("Failed to update room details. Please try again.");
    }
  };

  const handleOk = () => {
    form.submit();
    setOpenModal(false);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    listTypeRoom();
  }, []);
  useEffect(() => {
    if (selectedRoom) {
      const selectedOption = options.find((item) => {
        return item.value === selectedRoom.type_id;
      });

      form.setFieldsValue({
        room_name: selectedRoom.room,
        description: selectedRoom.description,
        price_per_day: selectedRoom.price_per_day,
        price_per_hour: selectedRoom.price_per_hour,
        discount: selectedRoom.discount,
        type_id: selectedOption,
      });
    }
  }, [form, selectedRoom]);

  return (
    <Modal
      title={<h1 className="text-center text-[25px]">Room Detail</h1>}
      open={openModal}
      onCancel={handleCancel}
      onOk={showConfirm}
    >
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label={<p className="">Room Name</p>} name={"room_name"}>
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="">Daily Price</p>}
          name={"price_per_day"}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={<p className="">Hourly Price</p>}
          name={"price_per_hour"}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label={<p className="">Discount</p>} name={"discount"}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label={<p className="">Room Type</p>} name={"type_id"}>
          <Select options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
