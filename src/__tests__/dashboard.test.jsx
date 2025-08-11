import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import * as dashboardApi from '../api/dashboard.js';
import * as recApi from '../api/recommendations.js';
import * as actApi from '../api/activities.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Dashboard', () => {
  it('renders summary', async () => {
    vi.spyOn(dashboardApi, 'getSummary').mockResolvedValue({ joinedGroupsCount: 1, upcomingEventsCount: 2, newConnectionsCount: 3, interestedHobbiesCount: 4 });
    vi.spyOn(recApi, 'getGroupRecommendations').mockResolvedValue([]);
    vi.spyOn(actApi, 'getRecentActivities').mockResolvedValue([]);
    render(
      <AuthContext.Provider value={{ user: { name: 'Alex' } }}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    await screen.findAllByText('Joined Groups');
    const hobbiesLink = screen.getByText('Interested Hobbies').closest('a');
    expect(hobbiesLink).toHaveAttribute('href', '/hobbies');
    const eventsLink = screen.getByText('Upcoming Events').closest('a');
    expect(eventsLink).toHaveAttribute('href', '/events');
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('displays zero counts when summary fetch fails', async () => {
    vi.spyOn(dashboardApi, 'getSummary').mockRejectedValue(new Error('fail'));
    vi.spyOn(recApi, 'getGroupRecommendations').mockRejectedValue(new Error('fail'));
    vi.spyOn(actApi, 'getRecentActivities').mockRejectedValue(new Error('fail'));
    render(
      <AuthContext.Provider value={{ user: { name: 'Alex' } }}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    await screen.findAllByText('Joined Groups');
    expect(screen.getAllByText('0').length).toBe(4);
  });
});
