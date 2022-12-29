import React from "react";

declare const TreasureContext: React.Context<TreasureContext>;

export type TreasureContext = {
   records: Record<string, any>;
   setRecord: (key: string, value: any) => void;
};

export type TreasureProviderProps = React.PropsWithChildren<{
   initialRecords?: Record<string, any>;
}>;

export declare function TreasureProvider(props: TreasureProviderProps): React.ReactElement;

export declare function useTreasure<T = any>(key: string, initialValue?: T): [ T, (value: T) => void ];

export default TreasureContext;
