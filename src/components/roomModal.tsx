"use client";
import { Modal, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { Dispatch, SetStateAction } from "react";

interface RoomModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function RoomModal({
  isModalOpen,
  setIsModalOpen,
}: RoomModalProps) {
  const [form] = useForm();

  const handleOk = () => {
    setIsModalOpen(false);
    form.submit()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} title={"Detail Room"}>
        <Form form={form}>
          <Form.Item>
            
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
