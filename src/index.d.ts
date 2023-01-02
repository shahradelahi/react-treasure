import React from "react";

declare const TreasureContext: React.Context<TreasureContext>;

export type TreasureContext = {
   records: Record<string, any>;
   setRecord: (key: string, value: any) => void;
};

export type ProviderProps = React.PropsWithChildren<{
   initialRecords?: Record<string, any>;
}>;

export declare function Provider(props: ProviderProps): React.ReactElement;

export declare function useTreasure<T = any>(key: string, initialValue?: T): [ T, (value: T) => void ];

export declare function Treasure<T = any>(initialValue?: T): Treasure<T>;

type Treasure<T> = {
   uuid: string;
   use: () => [ T, (value: T) => void ];
   Provider: React.FC<ProviderProps>;
};
