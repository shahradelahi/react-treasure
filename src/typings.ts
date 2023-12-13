import React from "react";

export type TreasureContext<T = any> = {
  records: Record<string, T>;
  setRecord: (key: string, value: T) => void;
};

export type ProviderProps<T = any> = React.PropsWithChildren<{
  initialRecords?: Record<string, T>;
}>;



