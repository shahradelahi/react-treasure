const React = require('react');
const Crypto = require('crypto');

// Create a context for the treasure records
const TreasureContext = React.createContext({
   setRecord: () => {
      throw new Error('setRecord function called outside of TreasureContext.Provider');
   },
   records: {}
});

// Provider component to provide the treasure state
function Provider({ initialRecords, children }) {
   const [treasure, setTreasure] = React.useState({ ...initialRecords });

   const setRecord = (key, value) => {
      setTreasure(prevTreasure => ({ ...prevTreasure, [key]: value }));
   };

   const value = React.useMemo(() => ({
      records: treasure,
      setRecord
   }), [treasure]);

   return <TreasureContext.Provider value={value}>{children}</TreasureContext.Provider>;
}

// Custom hook to use the treasure
function useTreasure(key, initialValue) {
   const { records, setRecord } = React.useContext(TreasureContext);

   const set = React.useCallback(value => {
      setRecord(key, value);
   }, [setRecord, key]);

   return [records[key] || initialValue, set];
}

// Function to create a unique treasure with an initial value
function Treasure(initialValue) {
   const uuid = Crypto.randomBytes(16).toString('hex');
   return {
      uuid,
      use: () => useTreasure(uuid, initialValue)
   };
}

module.exports = {
   useTreasure,
   Treasure,
   Provider
};
