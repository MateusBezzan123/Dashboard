import React, { useState } from 'react';
import styled from 'styled-components';


interface FilterBarProps {
  filters: {
    dateRange: { start: string | null; end: string | null } | null;
    account: string;
    industry: string;
    state: string;
  };
  setFilters: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    const newDateRange = {
      ...localFilters.dateRange,
      [type]: e.target.value || null, // Garantir que o valor nunca seja undefined
    };

    setLocalFilters({
      ...localFilters,
      dateRange: newDateRange as { start: string | null; end: string | null },
    });

    setFilters({
      ...localFilters,
      dateRange: newDateRange as { start: string | null; end: string | null },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
    setFilters({
      ...localFilters,
      [name]: value,
    });
  };

  return (
    <FilterBarContainer>
      <FilterGroup>
        <Label>Data Início</Label>
        <Input
          type="date"
          value={localFilters.dateRange?.start || ''}
          onChange={(e) => handleDateChange(e, 'start')}
        />
      </FilterGroup>

      <FilterGroup>
        <Label>Data Fim</Label>
        <Input
          type="date"
          value={localFilters.dateRange?.end || ''} 
          onChange={(e) => handleDateChange(e, 'end')}
        />
      </FilterGroup>

      <FilterGroup>
        <Label>Conta</Label>
        <Select
          name="account"
          value={localFilters.account}
          onChange={handleInputChange}
        >
          <option value="">Todas as Contas</option>
          <option value="Empresa A">Empresa A</option>
          <option value="Empresa B">Empresa B</option>
          <option value="Empresa C">Empresa C</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label>Indústria</Label>
        <Select
          name="industry"
          value={localFilters.industry}
          onChange={handleInputChange}
        >
          <option value="">Todas as Indústrias</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Finanças">Finanças</option>
          <option value="Saúde">Saúde</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label>Estado</Label>
        <Select
          name="state"
          value={localFilters.state}
          onChange={handleInputChange}
        >
          <option value="">Todos os Estados</option>
          <option value="SP">SP</option>
          <option value="RJ">RJ</option>
          <option value="MG">MG</option>
        </Select>
      </FilterGroup>
    </FilterBarContainer>
  );
};

export default FilterBar;

const FilterBarContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
