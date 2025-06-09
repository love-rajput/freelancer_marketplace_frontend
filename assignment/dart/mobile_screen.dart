import 'package:flutter/material.dart';

class MobileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Mobile View")),
      body: Center(child: Text("This is Mobile Layout")),
    );
  }
}