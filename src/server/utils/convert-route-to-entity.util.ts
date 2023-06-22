const mapping: Record<string, string> = {
  comments: 'comment',
  organizations: 'organization',
  reactions: 'reaction',
  users: 'user',
  videos: 'video',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
