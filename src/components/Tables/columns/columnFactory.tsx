import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";
import type { BaseColumnSchema } from "@src/components/Tables/types";

export function getColumns<TData>(
  config: BaseColumnSchema<TData>[]
): ColumnDef<TData, unknown>[] {
  return config.map((col) => ({
    accessorKey: String(col.key),
    header: col.header,
    cell: ({ row, getValue }) => {
      if (col.render) return col.render(row.original);
      return getValue() as ReactNode;
    },
  }));
}

