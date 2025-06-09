import 'package:flutter/material.dart';

class WebScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Web View")),
      body: Center(child: Text("This is Web Layout")),
    );
  }
}