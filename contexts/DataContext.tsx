import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shipment, Company, HsCode, CountryStats } from '../types';
import { mockShipments, mockCompanies, mockHsCodes, mockCountryStats } from '../data/mockData';

interface DataContextType {
  shipments: Shipment[];
  companies: Company[];
  hsCodes: HsCode[];
  countryStats: CountryStats[];
  addShipment: (shipment: Shipment) => void;
  deleteShipment: (id: string) => void;
  updateShipment: (shipment: Shipment) => void;
  addCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
  updateCompany: (company: Company) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [hsCodes, setHsCodes] = useState<HsCode[]>([]);
  const [countryStats, setCountryStats] = useState<CountryStats[]>([]);

  useEffect(() => {
    // Initialize data from mock source
    setShipments(mockShipments);
    setCompanies(mockCompanies);
    setHsCodes(mockHsCodes);
    setCountryStats(mockCountryStats);
  }, []);

  const resetData = () => {
    setShipments(mockShipments);
    setCompanies(mockCompanies);
    setHsCodes(mockHsCodes);
    setCountryStats(mockCountryStats);
  };

  const addShipment = (shipment: Shipment) => setShipments(prev => [shipment, ...prev]);
  const deleteShipment = (id: string) => setShipments(prev => prev.filter(s => s.id !== id));
  const updateShipment = (shipment: Shipment) => setShipments(prev => prev.map(s => s.id === shipment.id ? shipment : s));

  const addCompany = (company: Company) => setCompanies(prev => [company, ...prev]);
  const deleteCompany = (id: string) => setCompanies(prev => prev.filter(c => c.id !== id));
  const updateCompany = (company: Company) => setCompanies(prev => prev.map(c => c.id === company.id ? company : c));

  return (
    <DataContext.Provider value={{
      shipments,
      companies,
      hsCodes,
      countryStats,
      addShipment,
      deleteShipment,
      updateShipment,
      addCompany,
      deleteCompany,
      updateCompany,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};