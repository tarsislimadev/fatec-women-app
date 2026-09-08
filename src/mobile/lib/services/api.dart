import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';

import '../services/storage_service.dart';
import '../config/environment.dart';

class Api {
  final http.Client _client;

  Api([http.Client? client]) : _client = client ?? http.Client();

  Future<http.Response> get(
    String endpoint, 
    Map<String, String>? queryParams
  ) async {
    String uri = '${Environment.baseUrl}$endpoint';
    if (queryParams != null && queryParams.isNotEmpty) {
      uri +=
          '?${queryParams.entries.map((e) => '${Uri.encodeComponent(e.key)}=${Uri.encodeComponent(e.value)}').join('&')}';
    }
    final headers = await getHeaders();
    return await _client.get(Uri.parse(uri), headers: headers);
  }

  Future<http.StreamedResponse> multipartPost(
    String endpoint,
    XFile file,
  ) async {
    Uri uri = Uri.parse('${Environment.baseUrl}$endpoint');
    http.MultipartRequest request = http.MultipartRequest('POST', uri);

    final headers = await getHeaders();
    request.headers.addAll(headers);

    print('file.mimeType: ${file.mimeType}; file.path: ${file.path}; file.name: ${file.name}');
    final contentType = http.MediaType.parse(file.mimeType ?? 'image/jpeg');
    final multipartFile = await http.MultipartFile.fromPath('photo', file.path, contentType: contentType, filename: file.name);
    request.files.add(multipartFile);

    return await request.send();
  }

  Future<http.Response> post(
    String endpoint, 
    Map<String, dynamic> body
  ) async {
    final headers = await getHeaders();
    return await _client.post(Uri.parse('${Environment.baseUrl}$endpoint'),
        headers: headers, body: jsonEncode(body));
  }

  Future<http.Response> put(
    String endpoint, 
    Map<String, dynamic> body
  ) async {
    final headers = await getHeaders();
    return await _client.put(Uri.parse('${Environment.baseUrl}$endpoint'),
        headers: headers, body: jsonEncode(body));
  }

  Future<http.Response> delete(
    String endpoint
  ) async {
    final headers = await getHeaders();
    return await _client.delete(Uri.parse('${Environment.baseUrl}$endpoint'),
        headers: headers);
  }

  Future<Map<String, String>> getHeaders(
  ) async {
    String? token = await StorageService().getToken();
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ${token ?? ''}',
    };
  }

  void dispose(
  ) {
    _client.close();
  }
}

class ApplicationAPI extends Api {
  ApplicationAPI([super.client]);

  Future<http.Response> check({
    required String email,
  }) {
    return post('/check', {
      'email': email,
    });
  }

  Future<http.Response> signIn({
    required String email,
    required String password,
  }) {
    return post('/signin', {
      'email': email,
      'password': password,
    });
  }

  Future<http.Response> signUp({
    required String name,
    required String email,
    required String phone,
    required String password,
    required String confirm,
  }) {
    return post('/signup', {
      'name': name,
      'email': email,
      'phone': phone,
      'password': password,
      'confirm': confirm,
    });
  }

  Future<http.Response> getUserPhotos(
    String userId
  ) {
    return get('/users/$userId/photos', null);
  }

  Future<http.Response> getUser(
    String userId
  ) {
    return get('/users/$userId', null);
  }

  Future<http.Response> deleteMe(
  ) {
    return delete('/users/me');
  }

  Future<http.Response> updateUser(
    String userId,
    Map<String, dynamic> userData,
  ) {
    return put('/users/$userId', userData);
  }

  Future<http.Response> getDashboardData({
    required String period
  }) {
    return get('/dashboard', {'period': period});
  }

  Future<http.StreamedResponse> upload({
    required XFile file
  }) {
    return multipartPost('/upload', file);
  }

  Future<http.Response> markConversationAsRead({
    required String conversationId
  }) {
    return post('/conversations/$conversationId/mark-as-read', {
    });
  }

  Future<http.Response> sendMessage({
    required String conversationId, 
    required String content
  }) {
    return post('/conversations/$conversationId/messages', {
      'content': content
    });
  }

  Future<http.Response> startConversation({
    required String participantId,
    required String participantName,
    required String initialMessage,
  }) {
    return post('/conversations', {
      'participantId': participantId,
      'participantName': participantName,
      'initialMessage': initialMessage,
    });
  }

  Future<http.Response> getChatConversations(
  ) {
    return get('/chat/conversations', null);
  }

  Future<http.Response> startChat({
    required String participantId,
    required String participantName,
    required String initialMessage,
  }) {
    return post('/chats', {
      'participantId': participantId,
      'participantName': participantName,
      'initialMessage': initialMessage,
    });
  }
}
