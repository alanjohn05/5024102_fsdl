#!/usr/bin/env python3
import http.server, socketserver, os
PORT = 8001
os.chdir(os.path.dirname(os.path.abspath(__file__)))
class H(http.server.SimpleHTTPRequestHandler):
 def end_headers(self):
 self.send_header('Access-Control-Allow-Origin', '*')
 super().end_headers()
 def log_message(self, fmt, *args):
 print(f" {fmt % args}")
print(f"\n Experiment 10 running at http://localhost:{PORT}\n Ctrl+C to stop\n")
with socketserver.TCPServer(("", PORT), H) as s:
 try: s.serve_forever()
 except KeyboardInterrupt: print("\n Server stopped.")
