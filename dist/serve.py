#!/usr/bin/env python3
"""
Simple Python server with CORS headers for Pyodide PWA
Run from the dist directory: python serve.py
"""
import http.server
import socketserver
import os
from urllib.parse import unquote

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add required CORS headers for Pyodide
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Resource-Policy', 'cross-origin')
        
        # Cache control for assets
        if self.path.startswith('/assets/'):
            self.send_header('Cache-Control', 'public, max-age=31536000')
        else:
            self.send_header('Cache-Control', 'no-cache')
            
        super().end_headers()
    
    def do_GET(self):
        # Handle SPA routing - serve index.html for unknown routes
        if not os.path.exists(unquote(self.path[1:]) if self.path != '/' else 'index.html'):
            if not self.path.startswith('/assets/') and not self.path.endswith(('.js', '.css', '.json', '.ico', '.svg', '.png', '.wasm')):
                self.path = '/index.html'
        
        super().do_GET()

if __name__ == '__main__':
    PORT = 8080
    
    # Check if we're in the right directory (should have index.html)
    if not os.path.exists('index.html'):
        print("Error: index.html not found. Run this script from the dist directory.")
        print("Usage: cd dist && python serve.py")
        exit(1)
    
    with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
        print(f"Serving PWA at http://localhost:{PORT}")
        print("Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")