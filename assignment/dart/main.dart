import 'package:flutter/material.dart';
import 'responsive_layout.dart';
import 'mobile_screen.dart';
import 'tablet_screen.dart';
import 'web_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Responsive App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: ResponsiveLayout(
        mobileScreen: MobileScreen(),
        tabletScreen: TabletScreen(),
        webScreen: WebScreen(),
      ),
    );
  }
}