import React from "react";

const defaultValueSymbol = Symbol();

export const createContext = <T>(): [
  Provider: React.NamedExoticComponent<React.ProviderProps<T>>,
  useContext: () => T
] => {
  const context = React.createContext<T | typeof defaultValueSymbol>(
    defaultValueSymbol
  );

  const useContext = () => {
    const value = React.useContext(context);
    if (value === defaultValueSymbol) throw new Error("value is not provided.");
    return value;
  };

  return [context.Provider, useContext];
};
