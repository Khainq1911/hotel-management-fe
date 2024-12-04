interface TypeRoom {
  type_id: string;
  type_name: string;
  description: string;
  max_occupancy: number;
  room_size: number;
}

interface Room {
  room_id: string;
  room_name: string;
  floor: number;
  booking_status: boolean;
  price_per_day: number;
  price_per_hour: number;
  discount: number;
  cleaning_status: string;
  check_in_time: string | null;
  check_out_time: string | null;
  current_guest: number | null;
  note: string;
  created_at: string;
  updated_at: string;
  TypeRoom: TypeRoom;
}

interface DataType {
  room_id: string;
  type_id: string;
  room: string;
  floor: number;
  type: string;
  price_per_day: number;
  price_per_hour: number;
  description: string;
  discount: number;
}
