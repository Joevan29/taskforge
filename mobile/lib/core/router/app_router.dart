import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/login_screen.dart';

final appRouter = GoRouter(
  initialLocation: '/login',
  routes: [
    GoRoute(path: '/login', builder: (ctx, state) => const LoginScreen()),
    GoRoute(path: '/register', builder: (ctx, state) => const Scaffold(body: Center(child: Text('Register - Coming Soon')))),
    GoRoute(path: '/dashboard', builder: (ctx, state) => const Scaffold(body: Center(child: Text('Dashboard - Coming Soon')))),
  ],
);
