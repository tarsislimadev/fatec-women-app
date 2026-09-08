import 'package:app/services/storage_service.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../router/app_router.dart';
import '../utils/nav_items.dart';

class AppScaffold extends StatefulWidget {
  const AppScaffold({super.key, required this.child, this.tab});

  final Widget child;
  final String? tab;

  @override
  State<AppScaffold> createState() => _AppScaffoldState();
}

class _AppScaffoldState extends State<AppScaffold> {
  List<NavItem> getNavItemsByPlanId() {
    return [HomeNavItem(), ChatNavItem(), ProfileNavItem()];
  }

  @override
  Widget build(BuildContext context) {
    signOut() {
      StorageService().deleteAll();
      context.go(AppRoutes.landing);
    }

    return FutureBuilder(
      future: StorageService().readAll(),
      builder: (context, snapshot) {
        final List<NavItem> navItems = getNavItemsByPlanId();

        return Scaffold(
          appBar: AppBar(
            title: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Fatec Register'),
                if (widget.tab != null) ...[
                  InkWell(
                    onTap: signOut,
                    child: const Icon(Icons.logout_outlined, size: 20),
                  ),
                ],
              ],
            ),
          ),
          body: SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
              child: widget.child,
            ),
          ),
          bottomNavigationBar: widget.tab == null
              ? null
              : NavigationBar(
                  selectedIndex: navItems.indexWhere(
                    (item) => item.label.compareTo(widget.tab!) == 0,
                  ),
                  onDestinationSelected: (index) {
                    context.go(navItems[index].route);
                  },
                  destinations: [
                    for (final item in navItems)
                      NavigationDestination(
                        icon: Icon(item.icon),
                        label: item.label,
                      ),
                  ],
                ),
        );
      },
    );
  }
}
