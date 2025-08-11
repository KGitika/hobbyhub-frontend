import React from 'react';
import { Link, useInRouterContext } from 'react-router-dom';

// Simple chip-like card used on the dashboard to display a recommended group.
// Clicking the card navigates to the group page. We use `<Link>` instead of
// imperatively calling `useNavigate` so that the component can render outside
// of a router context during tests without throwing.
export default function RecommendationCard({ name, matchPct, groupId }) {
  const inRouter = useInRouterContext();
  const content = (
    <>
      <div className="recommendation-name">{name}</div>
      <div className="recommendation-match">{matchPct}% match</div>
    </>
  );
  // When rendered within a router, use a real link so clicking navigates to
  // the group page. In tests (which may render without a router) fall back to a
  // simple div so React Router doesn't throw.
  return inRouter ? (
    <Link to={`/groups/${groupId}`} className="recommendation-card">
      {content}
    </Link>
  ) : (
    <div className="recommendation-card">{content}</div>
  );
}
