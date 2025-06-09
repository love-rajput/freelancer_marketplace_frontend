import 'package:flutter/material.dart';

class TabletScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Tablet View")),
      body: Center(child: Text("This is Tablet Layout")),
    );
  }
}