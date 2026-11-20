export const ROUTES = {
  DASHBOARD: "/dashboard",
  WISHLIST: "/wishlist",
  ORDERS: "/order-management",
  PRODUCT_DETAILS: (id: string) => `/shop/${id}`,
  SHOP: "/shop",
  EVENTS: "/events",
  REGISTER: "/register",
  LOGIN: "/login",
  CART: "/cart",
  CHECKOUT: "/checkout",
  DEALS: "/my-deals",
  FORGOT_PASSWORD: "/forgot-password",
  SETTINGS: "/user-settings",
  LOGOUT: "/",
} as const;

export const GATED_ROUTE_PREFIXES = [
  ROUTES.DASHBOARD,
  ROUTES.ORDERS,
  ROUTES.DEALS,
  ROUTES.WISHLIST,
  ROUTES.SETTINGS,
] as const;

export function isGatedDashboardRoute(pathname: string): boolean {
  return GATED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function isStandaloneShellRoute(pathname: string): boolean {
  return (
    isGatedDashboardRoute(pathname) || pathname.startsWith("/tickets/verify")
  );
}

