class LoginRequest {
  final String email;
  final String password;
  const LoginRequest({required this.email, required this.password});
  Map<String, dynamic> toJson() => {'email': email, 'password': password};
}

class RegisterRequest {
  final String email;
  final String password;
  final String fullName;
  const RegisterRequest({required this.email, required this.password, required this.fullName});
  Map<String, dynamic> toJson() => {'email': email, 'password': password, 'fullName': fullName};
}

class AuthResponse {
  final String accessToken;
  final String refreshToken;
  final UserDto user;
  AuthResponse({required this.accessToken, required this.refreshToken, required this.user});
  factory AuthResponse.fromJson(Map<String, dynamic> json) => AuthResponse(
    accessToken: json['accessToken'],
    refreshToken: json['refreshToken'],
    user: UserDto.fromJson(json['user']),
  );
}

class UserDto {
  final String id;
  final String email;
  final String fullName;
  final String? avatarUrl;
  final String role;
  UserDto({required this.id, required this.email, required this.fullName, this.avatarUrl, required this.role});
  factory UserDto.fromJson(Map<String, dynamic> json) => UserDto(
    id: json['id'],
    email: json['email'],
    fullName: json['fullName'],
    avatarUrl: json['avatarUrl'],
    role: json['role'] ?? 'Member',
  );
}
