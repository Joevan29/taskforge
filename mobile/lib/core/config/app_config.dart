class AppConfig {
  static const String baseUrl = 'http://localhost:5001/api';
  static const String signalRHub = 'http://localhost:5001/hubs/workspace';
  static const String appName = 'TaskForge';
  static const int accessTokenExpiry = 15; // minutes
  static const int refreshTokenExpiry = 7; // days
}
