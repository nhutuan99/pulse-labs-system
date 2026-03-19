// ============================================
// Service List — API endpoint registry
// ============================================
// Format: 'serviceName': 'HTTP_METHOD /path/:param'
// The :param segments are replaced at runtime by ClientRestBase.getService()

const ServiceList: Record<string, string> = {
  base_url: process.env.NEXT_PUBLIC_API_URL || '',

  // Example entries — replace with your actual API endpoints:
  // 'getUser':    'GET /users/:id',
  // 'listUsers':  'GET /users',
  // 'createUser': 'POST /users',
  // 'updateUser': 'PUT /users/:id',
  // 'deleteUser': 'DELETE /users/:id',
};

export default ServiceList;
