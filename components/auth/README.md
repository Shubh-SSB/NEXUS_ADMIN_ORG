# Auth System Documentation

This auth system provides fast, client-side authentication for your Next.js admin application. It checks for an `admintoken` in localStorage and redirects to login if not found, with no API calls required for route protection.

## Features

- **Fast Client-Side Auth**: No API calls for route protection
- **Automatic Redirects**: Redirects to login page when unauthorized
- **Snackbar Notifications**: Shows "Unauthorized! Please login first" message
- **Multiple Protection Methods**: Context-based and component-based protection
- **SSR Safe**: Handles server-side rendering gracefully

## Components

### 1. AuthProvider

Provides authentication context to your entire app.

```tsx
// Already integrated in app/layout.tsx
<AuthProvider>{children}</AuthProvider>
```

### 2. AuthGuard

Protects routes and shows fallback while checking auth.

```tsx
import { AuthGuard } from "@/components/auth";

<AuthGuard
  fallback={<div>Loading...</div>}
  redirectTo="/login"
  notificationMessage="Please login to continue"
>
  <ProtectedContent />
</AuthGuard>;
```

### 3. ProtectedRoute

Lightweight route protection with immediate checks.

```tsx
import { ProtectedRoute } from "@/components/auth";

<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>;
```

### 4. LogoutButton

Ready-to-use logout button.

```tsx
import { LogoutButton } from "@/components/auth";

<LogoutButton variant="outline" showConfirmation={true}>
  Sign Out
</LogoutButton>;
```

## Hooks

### useAuth()

Access authentication state and methods.

```tsx
import { useAuth } from "@/components/auth";

function MyComponent() {
  const { isLoggedIn, token, login, logout, checkAuth } = useAuth();

  return <div>{isLoggedIn ? "Welcome!" : "Please login"}</div>;
}
```

### useAuthCheck()

Programmatic auth checks with redirects.

```tsx
import { useAuthCheck } from "@/components/auth";

function MyComponent() {
  const { requireAuth, isAuthenticated } = useAuthCheck();

  const handleProtectedAction = () => {
    if (requireAuth()) {
      // User is authenticated, proceed
      console.log("Performing protected action");
    }
    // User will be redirected to login if not authenticated
  };
}
```

## Utility Functions

```tsx
import {
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  clearAuthData,
} from "@/lib/auth";

// Check if user is authenticated
const isAuth = isAuthenticated();

// Get current token
const token = getAuthToken();

// Set token (usually after login)
setAuthToken("your-admin-token");

// Remove token
removeAuthToken();

// Clear all auth data
clearAuthData();
```

## Usage Examples

### Protecting Individual Pages

```tsx
// app/dashboard/page.tsx
import { ProtectedRoute } from "@/components/auth";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Dashboard content here</div>
    </ProtectedRoute>
  );
}
```

### Protecting Entire Layouts (Current Implementation)

```tsx
// app/(admin)/layout.tsx - Already implemented
import { AuthGuard } from "@/components/auth";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard fallback={<div>Checking authentication...</div>}>
      {/* Your admin layout */}
      {children}
    </AuthGuard>
  );
}
```

### Login Page Implementation

```tsx
// app/login/page.tsx - Already implemented
import { useAuth } from "@/components/auth";

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async (credentials) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.admintoken) {
      login(data.admintoken); // Stores token and updates state
      router.replace("/dashboard");
    }
  };
}
```

### Conditional Rendering Based on Auth

```tsx
import { useAuth } from "@/components/auth";

function MyComponent() {
  const { isLoggedIn } = useAuth();

  return <div>{isLoggedIn ? <AdminPanel /> : <LoginPrompt />}</div>;
}
```

### Higher-Order Component (HOC) Usage

```tsx
import { withAuthGuard } from "@/components/auth";

const ProtectedComponent = () => <div>Protected content</div>;

export default withAuthGuard(ProtectedComponent, {
  redirectTo: "/login",
  notificationMessage: "Access denied",
});
```

## API Integration

When your login API returns the `admintoken`, use the auth system like this:

```tsx
const handleLoginSubmit = async (formData) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success && result.admintoken) {
      // Store token and update auth state
      login(result.admintoken);

      // Redirect to intended page
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

## Benefits

1. **No API Calls for Protection**: Fast localStorage checks only
2. **Immediate Redirects**: Users see login page instantly if unauthorized
3. **User-Friendly**: Clear notifications about auth requirements
4. **Flexible**: Multiple ways to protect routes and components
5. **Performance**: Minimal overhead, client-side only checks
6. **SEO Safe**: Handles SSR without issues

## Important Notes

- The system assumes your login API returns an `admintoken` field
- Tokens are stored in localStorage with the key `admintoken`
- All auth checks are client-side - no server validation
- The system is designed for admin dashboards where immediate protection is preferred over SEO optimization
- For public pages, don't wrap them with auth components
