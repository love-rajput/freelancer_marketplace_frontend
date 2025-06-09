import 'package:flutter/material.dart';

class ResponsiveLayout extends StatelessWidget {
  final Widget mobileScreen;
  final Widget tabletScreen;
  final Widget webScreen;

  const ResponsiveLayout({
    Key? key,
    required this.mobileScreen,
    required this.tabletScreen,
    required this.webScreen,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;

    if (width < 600) {
      return mobileScreen;
    } else if (width < 1200) {
      return tabletScreen;
    } else {
      return webScreen;
    }
  }
}