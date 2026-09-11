export type ReservationStatus = "new" | "confirmed" | "cancelled" | "completed";

export type Reservation = {
  id: string;
  reference: string;
  vehicle: string;
  from: string;
  to: string;
  service: string;
  price: number;
  paymentMethod: string;
  status: ReservationStatus;
};

export type Contract = {
  id: string;
  reference: string;
  vehicle: string;
  signedAt: string;
  fileSize: string;
};

export type Payment = {
  id: string;
  date: string;
  reference: string;
  amount: number;
  method: string;
  status: "paid" | "pending" | "refunded";
};

export const customer = {
  firstName: "Мартин",
  lastName: "Георгиев",
  phone: "+359 88 412 7730",
  email: "martin.georgiev@gmail.com",
  address: "ул. Христо Белчев 21, ет. 4, София 1000",
  memberSince: "март 2023",
  completedRentals: 7,
  totalPaid: 2184.5,
  loyaltyDiscount: 14,
  referralCode: "MARTIN24",
  invitedFriends: 3,
};

export const initials = `${customer.firstName[0]}${customer.lastName[0]}`;

/** Активна резервация — връщане след ~2 дни от момента на зареждане. */
export const activeRental = {
  reference: "24C-10428",
  vehicle: "Peugeot Boxer 2.2 HDi",
  brand: "Peugeot",
  plate: "CB 4821 MH",
  pickedUpAt: "9 сеп 2026, 09:00",
  returnAt: new Date(Date.now() + 2 * 86400000 + 5 * 3600000 + 42 * 60000).toISOString(),
  includedKm: 300,
  drivenKm: 264,
  extraKmPrice: 0.1,
  /** 0 = E, 1 = F (данни от GPS сензора на буса) */
  fuelLevel: 0.38,
  tankCapacity: 90,
  litersUsed: 47,
  dailyRate: 65,
};

export const upcomingRental = {
  reference: "24C-10517",
  vehicle: "Fiat Ducato L4H2",
  brand: "Fiat",
  startAt: new Date(Date.now() + 11 * 86400000).toISOString(),
  days: 3,
  price: 210,
  pickupPoint: "бул. Цариградско шосе 133, София",
};

export const reservations: Reservation[] = [
  {
    id: "r1",
    reference: "24C-10428",
    vehicle: "Peugeot Boxer 2.2 HDi",
    from: "09.09.2026",
    to: "13.09.2026",
    service: "Бус под наем + шофьор",
    price: 325,
    paymentMethod: "Карта",
    status: "confirmed",
  },
  {
    id: "r2",
    reference: "24C-10517",
    vehicle: "Fiat Ducato L4H2",
    from: "22.09.2026",
    to: "25.09.2026",
    service: "Бус под наем",
    price: 210,
    paymentMethod: "Банков превод",
    status: "new",
  },
  {
    id: "r3",
    reference: "24C-09980",
    vehicle: "Citroën Jumper 2.0 BlueHDi",
    from: "14.07.2026",
    to: "16.07.2026",
    service: "Бус под наем",
    price: 168,
    paymentMethod: "Карта",
    status: "completed",
  },
  {
    id: "r4",
    reference: "24C-09641",
    vehicle: "Renault Master L3H2",
    from: "02.05.2026",
    to: "04.05.2026",
    service: "Преместване + хамали",
    price: 395,
    paymentMethod: "В брой",
    status: "completed",
  },
  {
    id: "r5",
    reference: "24C-09220",
    vehicle: "VW Crafter 2.0 TDI",
    from: "18.02.2026",
    to: "18.02.2026",
    service: "Бус под наем",
    price: 89,
    paymentMethod: "Карта",
    status: "cancelled",
  },
  {
    id: "r6",
    reference: "24C-08874",
    vehicle: "Peugeot Boxer 2.2 HDi",
    from: "05.12.2025",
    to: "08.12.2025",
    service: "Бус под наем",
    price: 245,
    paymentMethod: "Карта",
    status: "completed",
  },
];

export const contracts: Contract[] = [
  {
    id: "c1",
    reference: "Договор 24C-10428",
    vehicle: "Peugeot Boxer 2.2 HDi",
    signedAt: "09.09.2026",
    fileSize: "180 KB",
  },
  {
    id: "c2",
    reference: "Договор 24C-09980",
    vehicle: "Citroën Jumper 2.0 BlueHDi",
    signedAt: "14.07.2026",
    fileSize: "174 KB",
  },
  {
    id: "c3",
    reference: "Договор 24C-09641",
    vehicle: "Renault Master L3H2",
    signedAt: "02.05.2026",
    fileSize: "192 KB",
  },
];

export const payments: Payment[] = [
  { id: "p1", date: "09.09.2026", reference: "24C-10428", amount: 325, method: "Карта •••• 4417", status: "paid" },
  { id: "p2", date: "14.07.2026", reference: "24C-09980", amount: 168, method: "Карта •••• 4417", status: "paid" },
  { id: "p3", date: "02.05.2026", reference: "24C-09641", amount: 395, method: "В брой", status: "paid" },
  { id: "p4", date: "18.02.2026", reference: "24C-09220", amount: 89, method: "Карта •••• 4417", status: "refunded" },
  { id: "p5", date: "05.12.2025", reference: "24C-08874", amount: 245, method: "Карта •••• 4417", status: "paid" },
];

export const statusLabels: Record<ReservationStatus, string> = {
  new: "нова",
  confirmed: "потвърдена",
  cancelled: "отменена",
  completed: "завършена",
};

export function eur(value: number) {
  return `${value.toLocaleString("bg-BG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR`;
}

/** Разпознава марката по името на модела. */
export function brandOf(vehicle: string) {
  const brands = ["Peugeot", "Fiat", "Citroën", "Citroen", "Renault", "VW", "Volkswagen", "Mercedes", "Ford", "Iveco"];
  return brands.find((b) => vehicle.toLowerCase().includes(b.toLowerCase())) ?? "24Cargo";
}
