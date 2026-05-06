import type { KpiIconName } from "@/components/KpiCard";

interface Kpi {
  title: string;
  value: string;
  icon: KpiIconName;
  color?: string;
  data: Array<{ value: number }>;
}

export const kpis: Kpi[] = [
  {
    title: "Request Web Sites",
    value: "23",
    icon: "activity",
    data: [{ value: 18 }, { value: 22 }, { value: 19 }, { value: 28 }, { value: 23 }]
  },
  {
    title: "Request Media",
    value: "17",
    icon: "shieldAlert",
    data: [{ value: 3 }, { value: 2 }, { value: 2 }, { value: 1 }, { value: 17 }]
  },
  {
    title: "Devices",
    value: "45",
    icon: "network",
    data: [{ value: 87 }, { value: 90 }, { value: 88 }, { value: 93 }, { value: 45 }]
  },
  {
    title: "Device Alerts",
    value: "27",
    icon: "alertTriangle",
    data: [{ value: 2.2 }, { value: 1.9 }, { value: 1.7 }, { value: 1.8 }, { value: 27 }]
  },
  {
    title: "Fraud Alerts",
    value: "5",
    icon: "bot",
    data: [{ value: 2 }, { value: 4 }, { value: 3 }, { value: 5 }, { value: 5 }]
  },
  {
    title: "Fiber Risk Nodes",
    value: "3",
    icon: "activity",
    data: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 2 }, { value: 3 }]
  }
];

export const alerts = [
  {
    id: "TR-4102",
    severity: "Critical",
    device: "Core-RTR-01",
    issue: "Packet loss spike",
    status: "Investigating",
    time: "2 min ago"
  },
  {
    id: "TR-4098",
    severity: "Major",
    device: "OLT-Mumbai-7",
    issue: "Fiber attenuation drift",
    status: "Queued",
    time: "9 min ago"
  },
  {
    id: "TR-4087",
    severity: "Normal",
    device: "BNG-Edge-14",
    issue: "CPU threshold recovered",
    status: "Resolved",
    time: "18 min ago"
  },
  {
    id: "TR-4079",
    severity: "Major",
    device: "Fraud-GW-03",
    issue: "SIM box pattern detected",
    status: "Open",
    time: "31 min ago"
  }
];

export const trafficMetrics = [
  { time: "00:00", network: 560, inbound: 310, outbound: 190 },
  { time: "01:00", network: 510, inbound: 270, outbound: 170 },
  { time: "02:00", network: 450, inbound: 290, outbound: 210 },
  { time: "03:00", network: 520, inbound: 340, outbound: 240 },
  { time: "04:00", network: 610, inbound: 410, outbound: 290 },
  { time: "05:00", network: 720, inbound: 470, outbound: 330 },
  { time: "06:00", network: 780, inbound: 520, outbound: 370 },
  { time: "07:00", network: 690, inbound: 460, outbound: 310 },
  { time: "08:00", network: 570, inbound: 390, outbound: 260 },
  { time: "09:00", network: 630, inbound: 430, outbound: 280 },
  { time: "10:00", network: 710, inbound: 510, outbound: 350 },
  { time: "11:00", network: 930, inbound: 650, outbound: 420 },
  { time: "12:00", network: 820, inbound: 570, outbound: 360 },
  { time: "13:00", network: 910, inbound: 610, outbound: 410 },
  { time: "14:00", network: 740, inbound: 520, outbound: 340 },
  { time: "15:00", network: 650, inbound: 470, outbound: 300 },
  { time: "16:00", network: 720, inbound: 540, outbound: 360 },
  { time: "17:00", network: 880, inbound: 610, outbound: 430 },
  { time: "18:00", network: 820, inbound: 590, outbound: 470 },
  { time: "19:00", network: 1050, inbound: 720, outbound: 520 },
  { time: "20:00", network: 820, inbound: 640, outbound: 490 },
  { time: "21:00", network: 740, inbound: 580, outbound: 420 },
  { time: "22:00", network: 690, inbound: 510, outbound: 350 },
  { time: "23:00", network: 660, inbound: 470, outbound: 310 },
  { time: "24:00", network: 620, inbound: 430, outbound: 280 }
];

export const playbooks = [
  {
    title: "Restart BGP Peer",
    action: "Core-RTR-01",
    status: "Ready",
    enabled: true
  },
  {
    title: "Reroute Fiber Segment",
    action: "Metro Ring West",
    status: "Pending",
    enabled: false
  },
  {
    title: "Block Fraud Signature",
    action: "Fraud-GW-03",
    status: "Ready",
    enabled: true
  }
];

export const fraudAlerts = [
  { label: "SIM box cluster - Andheri", status: "danger" },
  { label: "IMEI velocity anomaly", status: "warning" },
  { label: "Suspicious roaming burst", status: "success" }
];

export const fiberRiskNodes = [
  { label: "OLT-Mumbai-7", status: "warning" },
  { label: "Splice Hub W-18", status: "danger" },
  { label: "Metro Ring South", status: "success" }
];
