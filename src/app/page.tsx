'use client';

import { useRouter } from 'next/navigation';
import { LogIn, ShoppingCart, BarChart3, Users } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CGS Vendas</h1>
          <p className="text-gray-600">Sistema de Gestão de Vendas</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <LogIn className="h-5 w-5" />
            <span>Fazer Login</span>
          </button>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Acesso rápido para teste:</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => router.push('/vender-titulo')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Vender</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
