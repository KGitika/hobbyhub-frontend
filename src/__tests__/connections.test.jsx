import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Connections from '../pages/Connections.jsx';

describe('Connections', () => {
  it('redirects to dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/connections']}>
        <Routes>
          <Route path="/connections" element={<Connections />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
