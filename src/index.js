const React = require('react');

const TreasureContext = React.createContext({
   setRecord: (key, value) => {
      throw new Error('TreasureContext not initialized');
   },
   records: {}
});

function TreasureProvider(props) {
   const [treasure, setTreasure] = React.useState(Object.assign({}, props.initialRecords));
   const setRecord = (key, value) => {
      setTreasure(Object.assign(Object.assign({}, treasure), {[key]: value}));
   };
   const value = {
      records: treasure,
      setRecord
   };
   return (React.createElement(TreasureContext.Provider, {value: value}, props.children));
}

function useTreasure(key, initialValue) {
   const treasure = React.useContext(TreasureContext);
   const set = React.useCallback((value) => {
      treasure.setRecord(key, value);
   }, [treasure, key]);
   const value = treasure.records[key] || initialValue;
   return [value, set];
}

module.exports = {
   default: TreasureContext,
   TreasureProvider,
   useTreasure
};
