import { alerts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const severityTone = {
  Critical: "danger",
  Major: "warning",
  Normal: "success"
} as const;

export function AlertsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-slate-50/50 text-[11px] uppercase tracking-[0.1em] text-slate-400 font-bold border-y border-slate-100">
          <tr>
            {["ID", "Severity", "Device", "Issue", "Status", "Time"].map((header) => (
              <th key={header} className="px-6 py-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {alerts.map((alert) => (
            <tr key={alert.id} className="transition-all duration-200 hover:bg-slate-50/50 group">
              <td className="px-6 py-4 font-bold text-[#1F2C30]">{alert.id}</td>
              <td className="px-6 py-4">
                <Badge tone={severityTone[alert.severity as keyof typeof severityTone]}>
                  {alert.severity}
                </Badge>
              </td>
              <td className="px-6 py-4 font-bold text-[#1F2C30]">{alert.device}</td>
              <td className="px-6 py-4 font-semibold text-slate-600 group-hover:text-[#1F2C30] transition-colors">{alert.issue}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="font-bold text-slate-600">{alert.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-slate-400 text-xs">{alert.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
