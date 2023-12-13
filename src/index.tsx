import React from "react";
import { ProviderProps } from "./typings";

// Create a context for the treasure records
const TreasureContext = React.createContext({
  setRecord: (_: string, __: any): void => {
    throw new Error('setRecord function called outside of TreasureContext.Provider');
  },
  records: {} as Record<string, any>
});

// Provider component to provide the treasure state
function Provider({ initialRecords, children }: ProviderProps) {
  const [ treasure, setTreasure ] = React.useState({ ...initialRecords });

  const setRecord = (key: string, value: any): void => {
    setTreasure((prevTreasure: object) => ({ ...(prevTreasure || {}), [key]: value }));
  };

  const value = React.useMemo(() => ({
    records: treasure,
    setRecord
  }), [ treasure ]);

  return <TreasureContext.Provider value={value}> {children} </TreasureContext.Provider>;
}

// Custom hook to use the treasure
function useTreasure<T = any>(key: string, initialValue?: T): [ T, (value: T) => void ] {
  const { records, setRecord } = React.useContext(TreasureContext);

  const set = React.useCallback((value: any) => {
    setRecord(key, value);
  }, [ setRecord, key ]);

  return [ records[key] || initialValue, set ];
}

// Function to create a unique treasure with an initial value
function Treasure<T = any>(initialValue: T): {
  uuid: string;
  use: () => [ T, (value: T) => void ];
} {
  const id = React.useId();
  return {
    uuid: id,
    use: () => useTreasure(id, initialValue)
  };
}

export * from './typings';

export {
  useTreasure,
  Treasure,
  Provider
}

